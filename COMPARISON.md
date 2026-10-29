# Legacy Rents homepage: section comparison

The live homepage at legacyhomesrent.com has eleven sections. This table shows where each one went in the new Legacy Rents design. Nothing on the live site has changed. The table only matters if this design is ever merged.

| # | Current section (live) | Status | Where it is now / what is needed |
|---|---|---|---|
| 1 | **Premium Homes for Rent in NC & TX** (hero + search) | Covered | New hero "Rent Better. Live Better." with the search card (Location, Bedrooms, Monthly Budget). The search sends people to `/find-a-home?city=…&beds=…&price=…`, the same filters the live page uses. **SEO note:** the H1 changes from the keyword phrase to the tagline. Keep "Homes for Rent in NC & TX" in the title tag (the preview does) or work it into the subtitle. |
| 2 | **What our residents say** | Covered | Reviews carousel with 6 of the 12 real Google reviews. |
| 3 | **Enjoy modern living at Legacy Signature Rentals** (about) | Deliberately gone | The brand story is not on the new homepage. It still lives at `/about`. |
| 4 | **Houses for rent in NC & TX** (where we lease) | Covered | "Find your place." has the Hickory, Conover and Newton cards, a Texas line linking Waco, Temple and Belton, and **View all locations** linking to `/our-properties`. |
| 5 | **Why tenants choose Legacy Signature Rentals** | Covered | "A better way to rent." has the five features: Brand-New Homes, Smart Locks, Lawn Care Included, Flexible Rent Payments, Deposit Alternatives. The small print is beneath them. |
| 6 | ⚠️ **Resident Benefits Package** | **Needs a new home** | Only a one-line "Resident Benefits" card in the Resident Portal section, linking to `/resident-portal`. The two plans, their prices ($39.45 / $50.45) and what each includes are no longer on the homepage. `/resident-portal` already mentions the Essential package. **If this merges, `/resident-portal` should carry the full Essential vs Premium comparison.** |
| 7 | **Renting with us is simple** (how it works) | Partly covered | The tours block has 3 steps: pick a home, book a time, walk through. The full rental process (apply, approval, move-in) has nowhere to go. It could go on `/find-a-home` or `/about`. |
| 8 | **Our newest rental properties** (live listings) | Deliberately gone | The homepage no longer shows listings. They stay on `/find-a-home`, which is reached through the search card and **Find Your Home**. Trade-off: fresh listings on the homepage keep it changing for Google. |
| 9 | **Everything you need in one place** (services) | Covered | Resident Portal section: Pay Rent, Maintenance Requests, Communications, Resident Benefits, and **Log in to the portal**. |
| 10 | **Talk to a leasing agent** (lead form) | **Needs a decision** | There is no form on the new homepage. **Schedule a Tour** and **Contact Us** go to `/contact`, which has the form. Every lead now takes one more click, so watch form submissions if this merges. |
| 11 | ⚠️ **Frequently asked questions** (7 questions) | **Needs a new home** | No place for it in the mockup. Options: (a) a short FAQ accordion above the footer, keeping the design; (b) a `/faq` page linked from the footer. The FAQ is real ranking content and should not simply disappear. |

**Added (not on the live homepage):** "Live Here Today. Own Tomorrow." (up to $5,000 toward closing costs, eligibility applies), the self-guided tours block, the Legacy Rents logo and tagline.

## Other differences from the live page

- **Brand name:** Legacy Rents (live: Legacy Signature Rentals). Logo redrawn as SVG from the board.
- **Phone:** **(828) 540-6940**, the number the live site shows today. The board's (828) 610-8116 has not been checked against call tracking, so it is not used yet. The number appears in 4 places in `index.html` (`tel:+18285406940`).
- **Tracking:** the preview has no GTM or CallTrackingMetrics. The call links carry `data-call-location` and push `click_to_call` to `dataLayer`, so they are ready for GTM.
- **Forms:** none on this page (see row 10).
- **Links:** everything points at the real pages on legacyhomesrent.com. No pages were duplicated.
- **Indexing:** `<meta name="robots" content="noindex, nofollow">` on the page, and `X-Robots-Tag: noindex, nofollow` in `_headers` and `netlify.toml` for Netlify hosting.
