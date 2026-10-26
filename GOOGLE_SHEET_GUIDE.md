# Change Deals & Offers prices from Google Sheets

## 1. Create the Google Sheet
1. Open https://sheets.google.com and create a blank sheet. Rename the tab (bottom left) to `Deals`.
2. Menu: File > Import > Upload > choose `viora-deals-sample.csv` > "Replace current sheet" > Import data.
   (Or type the 8 column names yourself in row 1: id, title, original_price, offer_price, discount, description, image_url, is_active)
3. Replace the sample rows with the clinic's real deals. The sample prices are DUMMY.

Columns:
| Column | Meaning |
|---|---|
| id | short name, no spaces (hydrafacial) |
| title | name shown on the card |
| original_price | old price, numbers only (8000). Leave empty if none |
| offer_price | price shown big, numbers only (4999). Required |
| discount | text on the badge (37% OFF). Leave empty and the site calculates it |
| description | one or two short sentences |
| image_url | optional. /static/images/name.jpg for a photo on the site, or a full https:// link |
| is_active | TRUE shows the deal, FALSE hides it |

## 2. Publish the sheet and copy the CSV link
1. File > Share > Publish to web.
2. First dropdown: choose the `Deals` sheet (not "Entire document").
3. Second dropdown: choose "Comma-separated values (.csv)".
4. Click Publish, confirm, and copy the link. It looks like
   https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv

## 3. Paste the link (ONE place only)
- Flask (this project): open app.py and replace PASTE HERE in
  GOOGLE_SHEET_CSV_URL = "PASTE HERE"
- No Flask (plain HTML site): open templates/deals.html, find
  const GOOGLE_SHEET_CSV_URL = "PASTE HERE"  and paste the link there.

Restart the app (python app.py). The Deals page now shows your sheet.

## 4. Updating prices later
Edit the sheet. Changes appear on the website within about 5 minutes (the site keeps
a 5 minute copy so Google is not called on every visit). Published sheets update automatically.

## If something does not show
- Open http://127.0.0.1:5000/api/prices : you should see your deals as JSON.
  503 means the link is wrong or not published.
- Make sure the first row has the exact column names and is_active says TRUE.
- If the sheet cannot be reached the site shows the last saved prices, or the fallback deals
  in templates/deals.html (FALLBACK_DEALS).
