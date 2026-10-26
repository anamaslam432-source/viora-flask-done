# VIORA Aesthetics - Flask project (multi-page)

## Run
    pip install -r requirements.txt
    python app.py
Open http://127.0.0.1:5000

## Pages
    /          Home                 templates/index.html   (original homepage, unchanged)
    /services  Services             templates/services.html
    /about     About Us             templates/about.html
    /deals     Deals & Offers       templates/deals.html
    /gallery   Gallery              templates/gallery.html
    /team      Our Specialist Team  templates/team.html

The "Book a Consultation" buttons on every page go to the booking form at the bottom of the homepage (/#book).

## Structure
    app.py                  Flask app, one route per page
    templates/base.html     shared header, "Back to Home" bar (inner pages), CTA band, footer, photo viewer, WhatsApp button
    templates/*.html        page content only (each extends base.html)
    static/css/style.css    all styles (original rules untouched; a few lines added at the end for the inner pages)
    static/js/main.js       all JavaScript (service cards, filters, booking form, gallery lightbox)
    static/images/          all photos and the logo

## Things to edit
- Menu items, header and footer: templates/base.html (edit once, applies to every page).
- Homepage content: templates/index.html.
- WhatsApp number: static/js/main.js, `const WA="923038922114"` (country code + number, digits only), and the fallback link at the bottom of templates/base.html.
- Service photos/text: static/js/main.js (`S` = service names and descriptions, `PH` = service photos).
- Deals: static/js/main.js (`dg`). Team placeholders: static/js/main.js (`tgd`).
- Phone/address: templates/base.html (footer) and templates/index.html (Book a Consultation section).


## Deals & Offers from Google Sheets
See GOOGLE_SHEET_GUIDE.md. Paste the published CSV link in app.py (GOOGLE_SHEET_CSV_URL). Run `pip install -r requirements.txt` first.
