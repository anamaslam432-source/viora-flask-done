"""VIORA Aesthetics - Flask app (multi-page) with live prices from Google Sheets."""
import csv
import io
import os
import re
import threading
import time

import requests
from flask import Flask, jsonify, render_template

app = Flask(__name__)
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0     # static files are never served from a long browser cache

# Bump this number whenever you replace a photo, the CSS or the JS: every image / css / js link
# gets "?v=<number>", so browsers are forced to download the new file instead of an old cached copy.
ASSET_VERSION = "5"

# ======================================================================
#  GALLERY  <-- the ONLY place the gallery photos and their order are set
#  The home page gallery and the /gallery page both use this same list
#  (templates/_gallery.html). 3 rows x 3 photos on desktop. Files live in static/images/gallery/.
#  Row 1: reception desk | waiting wall quote | lounge
#  Row 2: entrance signboard | treatment room | reception logo
#  Row 3: whitening drip | light therapy | treatment in progress
# ======================================================================
GALLERY = [
    {"key": "g5", "file": "gallery/05-reception-desk.jpg", "alt": "VIORA Aesthetics reception desk under the gold striped logo wall"},
    {"key": "g1", "file": "gallery/01-waiting-wall-quote.jpg", "alt": "Waiting area wall with the message Skincare is a journey, enjoy the process"},
    {"key": "g2", "file": "gallery/02-waiting-lounge.jpg", "alt": "VIORA Aesthetics lounge with sofa and gold wall details"},
    {"key": "g3", "file": "gallery/03-entrance-signboard.jpg", "alt": "VIORA Aesthetics entrance signboard listing laser hair removal, hydra facial, botox and fillers, micro needling, skin rejuvenation and thread lifting"},
    {"key": "g4", "file": "gallery/04-treatment-room.jpg", "alt": "Treatment room with a treatment bed, hydra facial machine and gold wall lighting"},
    {"key": "g8", "file": "gallery/08-reception-logo.jpg", "alt": "Reception area with the VIORA logo and patterned gold wall"},
    {"key": "g6", "file": "gallery/06-whitening-drip.jpg", "alt": "Whitening drip in the VIORA treatment room"},
    {"key": "g7", "file": "gallery/07-light-therapy.jpg", "alt": "LED light therapy mask treatment at VIORA Aesthetics"},
    {"key": "g9", "file": "gallery/09-treatment-in-progress.jpg", "alt": "Aesthetic treatment in progress with a VIORA specialist"},
]


@app.context_processor
def shared_template_values():
    return {"gallery_items": GALLERY, "asset_v": ASSET_VERSION}


@app.after_request
def no_cache_for_pages(resp):
    """HTML pages are always re-checked with the server. (/api/prices keeps its own short cache header.)"""
    if resp.mimetype == "text/html":
        resp.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        resp.headers["Pragma"] = "no-cache"
        resp.headers["Expires"] = "0"
    return resp

# ======================================================================
#  GOOGLE SHEET SETTINGS  <-- PASTE YOUR SHEET LINK HERE
# ----------------------------------------------------------------------
#  Google Sheet > File > Share > Publish to web > choose the "Deals"
#  sheet and "Comma-separated values (.csv)" > Publish > copy the link.
#  It looks like:
#    https://docs.google.com/spreadsheets/d/e/2PACX-xxxxxxxx/pub?output=csv
#  You can also set it without editing code:  set GOOGLE_SHEET_CSV_URL=...
# ======================================================================
GOOGLE_SHEET_CSV_URL = os.environ.get("GOOGLE_SHEET_CSV_URL", "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfiyiUvKgaR9BWub5m3G9bGxxEeoM3j9LlJxSd0uwTadVj78WYXF3DW4h82CKZcOVzQZwh8H_IQ4p8/pub?gid=1644211434&single=true&output=csv")

CACHE_SECONDS = 30      # the sheet is read at most once every 5 minutes
REQUEST_TIMEOUT = 8      # seconds to wait for Google

_cache = {"time": 0.0, "deals": None}
_lock = threading.Lock()


# ---------------------------------------------------------------- pages
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/services")
def services():
    return render_template("services.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/deals")
def deals():
    return render_template("deals.html")


@app.route("/gallery")
def gallery():
    return render_template("gallery.html")


@app.route("/team")
def team():
    return render_template("team.html")


# ------------------------------------------------------- Google Sheets
def _number(value):
    """'Rs. 4,999' -> 4999 ; '' -> None"""
    digits = re.sub(r"[^\d]", "", str(value or ""))
    return int(digits) if digits else None


def _is_true(value):
    return str(value or "").strip().upper() in ("TRUE", "YES", "Y", "1")


def _safe_image(url):
    url = str(url or "").strip()
    return url if re.match(r"^(https?://|/)", url, re.I) else ""


def parse_sheet(csv_text):
    """Turn the sheet's CSV into a clean list of active deals."""
    reader = csv.DictReader(io.StringIO(csv_text))
    deals = []
    for raw in reader:
        row = {(k or "").strip().lower(): (v or "").strip() for k, v in raw.items()}
        offer = _number(row.get("offer_price"))
        if not _is_true(row.get("is_active")) or not row.get("title") or offer is None:
            continue                                   # hidden or incomplete row
        original = _number(row.get("original_price"))
        discount = row.get("discount", "")
        if not discount and original and original > offer:
            discount = "%d%% OFF" % ((original - offer) * 100 // original)
        deals.append({
            "id": row.get("id", ""),
            "title": row["title"],
            "original_price": original,
            "offer_price": offer,
            "discount": discount,
            "description": row.get("description", ""),
            "image_url": _safe_image(row.get("image_url")),
        })
    return deals


def load_deals():
    """Return (deals, from_cache). Uses a 5 minute cache; falls back to the
    last good copy if Google is unreachable."""
    now = time.time()
    with _lock:
        if _cache["deals"] is not None and now - _cache["time"] < CACHE_SECONDS:
            return _cache["deals"], True
    if not GOOGLE_SHEET_CSV_URL.startswith("http"):
        raise RuntimeError("GOOGLE_SHEET_CSV_URL is not set in app.py")
    try:
        resp = requests.get(GOOGLE_SHEET_CSV_URL, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        deals = parse_sheet(resp.content.decode("utf-8-sig"))
    except Exception:
        with _lock:
            if _cache["deals"] is not None:             # serve the old copy
                return _cache["deals"], True
        raise
    with _lock:
        _cache.update(time=now, deals=deals)
    return deals, False


@app.route("/api/prices")
def api_prices():
    try:
        deals, cached = load_deals()
    except Exception as exc:                            # website shows fallback prices
        app.logger.warning("Google Sheet could not be loaded: %s", exc)
        return jsonify({"error": "prices unavailable", "deals": []}), 503
    resp = jsonify({"deals": deals, "cached": cached})
    resp.headers["Cache-Control"] = "public, max-age=60"
    return resp


if __name__ == "__main__":
    app.run(debug=True)
