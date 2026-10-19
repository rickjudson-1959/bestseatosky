"""Copy for the Sea to Sky Trip Planner, 2026-27 edition (v3).

Every business named in this file is referenced by its Best Sea to Sky
listing slug. The builder looks each slug up in data/listings-snapshot.json
(exported from Supabase) and takes the display name, category and link from
there. Do not type business names here directly; add the listing slug.

House rules for this copy:
  * No em dashes or en dashes. Use a colon, comma or hyphen instead.
  * No unverifiable claims (rankings, superlatives, years in business).
  * No prices, phone numbers, hours or ratings for named businesses.
"""

EDITION = "2026-27"
TITLE = "Sea to Sky Trip Planner " + EDITION
SITE = "https://bestseatosky.com"

# Listings that must stay in the planner even if they are ever unpublished.
# The builder warns (does not drop) if either is missing or not published.
MUST_KEEP = ["the-locavore-bar-and-grill-squamish", "sunwolf-riverside-resort-squamish"]

CANADIAN_COASTAL_SLUG = "canadian-coastal-sailing-squamish"
CANADIAN_COASTAL_LINE = (
    "Canadian Coastal Sailing: Small-group afternoon and sunset sails on Howe Sound, "
    "plus private charters."
)


def guide(slug):
    return SITE + "/guide/" + slug


def blog(slug):
    return SITE + "/blog/" + slug


COVER = {
    "kicker": "Free planning guide",
    "title_1": "Sea to Sky",
    "title_2": "Trip Planner " + EDITION,
    "towns": "Vancouver \u2022 Squamish \u2022 Whistler \u2022 Pemberton",
    "tagline": "Where to eat, stay, hike, and explore, with typical costs, trail ratings, and seasonal tips.",
    "edition": EDITION + " Edition \u2022 Free Download",
}

TOC = [
    "1. At a Glance: Quick facts and planning essentials",
    "2. Budget Breakdown: Typical costs",
    "3. Seasonal Guide: Summer vs. Winter",
    "4. Highway Stops: Vancouver to Pemberton",
    "5. Squamish: Restaurants, Hotels & Activities",
    "6. Squamish Trail Guide: Popular hikes rated",
    "7. Whistler: Restaurants & Hotels",
    "8. Whistler Trail Guide: Popular hikes rated",
    "9. Pemberton: Restaurants & Hotels",
    "10. Pemberton Trail Guide: Popular hikes rated",
    "11. Packing Checklist",
    "12. Planning Resources",
]

# Cells may be plain strings or ("listing", slug) for a linked listing name.
AT_A_GLANCE = [
    ("Total Distance", "Vancouver to Pemberton: about 150 km (2.5 hrs non-stop)"),
    ("Main Towns", "Squamish (pop. about 25,000) \u2022 Whistler (pop. about 13,000) \u2022 Pemberton (pop. about 3,000)"),
    ("Good For", "Hiking, skiing, climbing, craft beer, waterfalls, scenic drives"),
    ("Peak Season", "June to September (summer) and December to March (ski)"),
    ("Getting There", "Drive from Vancouver on Highway 99, the Sea to Sky Highway"),
    ("Fuel", "Fill up in Squamish or Whistler; stations get sparse heading north"),
    ("Cell Service", "Good in towns, spotty on trails and between Whistler and Pemberton"),
    ("Parking", ["Free at most trailheads; paid parking at ", ("listing", "sea-to-sky-gondola-squamish")]),
]

BUDGET_INTRO = "Typical costs in the Sea to Sky corridor, in CAD. Prices change by season, so check before you book."

ACCOMMODATION = {
    "header": ["", "Squamish", "Whistler", "Pemberton"],
    "rows": [
        ["Budget (hostel/camping)", "$25-45", "$30-60", "$20-40"],
        ["Mid-range (hotel/Airbnb)", "$150-250", "$250-450", "$120-200"],
        ["Luxury (resort/chalet)", "$250-400", "$450-900+", "$200-350"],
    ],
}

FOOD_DRINK = [
    ("Coffee", "$4-6"),
    ("Casual lunch", "$15-22"),
    ("Dinner for two (mid-range)", "$80-140"),
    ("Dinner for two (upscale, Whistler)", "$150-250+"),
    ("Pint of craft beer", "$7-9"),
    ("Flight of beer (4 tasters)", "$12-16"),
    ("Groceries for a day (self-catering)", "$40-60"),
]

ACTIVITIES_COSTS = [
    ([("listing", "sea-to-sky-gondola-squamish"), " (adult)"], "Check current rates"),
    ([("listing", "whistler-blackcomb-whistler"), " lift tickets and bike park passes"], "Varies by date; check current rates"),
    ([("listing", "scandinave-spa-whistler-whistler"), " entry"], "Check current rates"),
    ("Guided rock climbing (half day)", "$150-200 pp"),
    ("Kayak rental (2 hours)", "$40-60"),
    ("Mountain bike rental (full day)", "$80-130"),
    ([("listing", "joffre-lakes-park-pemberton"), " day-use pass"], "Check bcparks.ca for current rules"),
    ("Most hiking trails", "Free"),
    ("Shannon Falls / Brandywine Falls", "Free day use"),
]

BUDGET_TIP = ("Budget Tip: Squamish is usually cheaper than Whistler for accommodation and dining. "
              "Base yourself in Squamish and day-trip to Whistler to save money.")

DAILY_BUDGETS = [
    ("Backpacker", "$60-100", "Camping, self-catering, free hikes, one beer"),
    ("Comfortable", "$150-250", "Mid-range hotel, lunch + dinner out, one activity"),
    ("Luxury", "$400-700", "Resort stay, fine dining, gondola + spa"),
]

SUMMER_INTRO = ("Peak season. All trails accessible, waterfalls flowing, patios open, days are long "
                "(sunset after 9pm in July).")
SUMMER = [
    ("Hiking", "All trails open including alpine. Check bcparks.ca for Joffre Lakes day-use pass rules."),
    ("Mountain biking", "Whistler Bike Park open. Squamish trails in prime condition."),
    ("Water sports", "Kayaking, paddleboarding, kiteboarding on the Squamish Spit."),
    ("Climbing", "Peak season. Long days mean more time on the wall."),
    ("Weather", "20-30\u00b0C in valleys. 10-20\u00b0C on summits. Rain is rare but pack layers."),
    ("Crowds", "Busy weekends. Book accommodation 2-4 weeks ahead. Hike early."),
]
SUMMER_TIP = ("Summer Tip: The Squamish Spit gets thermal winds most afternoons from May to September. "
              "Even if you don't kiteboard, watching from the estuary at sunset is worth it.")

WINTER_INTRO = ("Ski season transforms the corridor. Whistler Blackcomb is the main draw, plus eagle watching, "
                "snowshoeing, and spas.")
WINTER = [
    ("Skiing/Snowboarding", [("listing", "whistler-blackcomb-whistler"), ": 8,000+ acres, 200+ runs. Buy tickets online."]),
    ("Cross-country", "Lost Lake trails (Whistler). Callaghan Country (backcountry)."),
    ("Snowshoeing", "Whistler Olympic Park and Elfin Lakes area."),
    ("Eagle watching", "Brackendale (Dec-Feb). Bald eagles gather along the Squamish River."),
    ("Spas", [("listing", "scandinave-spa-whistler-whistler"), ". Hot pools surrounded by snow-covered trees."]),
    ("Weather", "-5 to 5\u00b0C in valleys. -15 to -5\u00b0C on mountains. Heavy snow above 800m."),
    ("Crowds", "Christmas and spring break are peak. Midweek is noticeably quieter."),
]
WINTER_TIP = ("Winter Tip: Start at Creekside Gondola instead of Whistler Village for often shorter lines on "
              "the same mountain. Midweek skiing is a completely different experience.")

SHOULDER = [
    ("Spring (April-May):", "Waterfalls at peak flow. Lower trails open, alpine still snowy. Fewer crowds, lower prices."),
    ("Fall (October-November):", "Autumn colours and mushroom foraging. A quiet time to visit."),
]

HIGHWAY_INTRO = "Worthwhile stops along the Sea to Sky Highway, in order from south to north."
HIGHWAY_STOPS = [
    ("porteau-cove-provincial-park-squamish", "25 min from Horseshoe Bay",
     "Waterfront park with Howe Sound views. Popular for scuba diving. Rocky beach, mountain backdrop, campground.",
     "Free day use (camping fees apply)"),
    ("britannia-mine-museum-britannia-beach", "Britannia Beach",
     "Underground train tour, gold panning, mining history. Good for kids. Budget 90 minutes.",
     "Paid admission; check current rates"),
    ("shannon-falls-provincial-park-squamish", "10 min south of Squamish",
     "335 m waterfall, a short walk from parking. Most impressive in spring.",
     "Free"),
    ("sea-to-sky-gondola-squamish", "Next to Shannon Falls",
     "Gondola ride to an 885 m summit. Suspension bridge, hiking trails, restaurant.",
     "Paid; check current rates"),
    ("tantalus-lookout-squamish", "Highway pullout north of Squamish",
     "Head-on view of the Tantalus Range and its glaciers.",
     "Free"),
    ("brandywine-falls-provincial-park-whistler", "South of Whistler",
     "70 m waterfall into a volcanic canyon. Easy 10-minute walk. Continue to Swim Lake in summer.",
     "Free"),
    ("nairn-falls-provincial-park-whistler", "South of Pemberton",
     "1.5 km trail through old-growth forest to a powerful cascade. Usually less crowded than Shannon Falls.",
     "Free day use (camping fees apply)"),
]
HIGHWAY_MORE = ("Full road trip guide: ", blog("sea-to-sky-highway-road-trip-itinerary"))

SQUAMISH = {
    "title": "5. Squamish",
    "intro": "Climbing, mountain biking, hiking, and a busy craft beer scene, all at the head of Howe Sound.",
    "eat": [
        ("howe-sound-inn-and-brewing-squamish", "Brewpub, house-brewed beer, inn"),
        ("the-locavore-bar-and-grill-squamish", "Farm-to-table, seasonal menu"),
        ("fergies-cafe-squamish", "Brunch cafe in Brackendale"),
        ("mags99-fried-chicken-and-mexican-cantina-squamish", "Fried chicken, Mexican cantina"),
        ("backcountry-brewing-squamish", "Brewery taproom, wood-fired pizza"),
        ("a-frame-brewing-co-squamish", "Craft brewery taproom"),
        ("the-crabapple-cafe-squamish", "Breakfast, brunch, lunch in Brackendale"),
    ],
    "eat_more": guide("best-restaurants-squamish"),
    "stay": [
        ("sandman-hotel-and-suites-squamish-squamish", "Hotel, Discovery Way"),
        ("executive-suites-hotel-and-resort-squamish-squamish", "Resort hotel"),
        ("sunwolf-riverside-resort-squamish", "Riverside cabins, Brackendale"),
        ("alice-lake-campgrounds-squamish", "Provincial park campground"),
        ("squamish-adventure-inn-and-hostel-squamish", "Hostel and inn, budget"),
    ],
    "stay_more": guide("best-hotels-squamish"),
    "do_more": guide("things-to-do-squamish"),
}

WHISTLER = {
    "title": "7. Whistler",
    "intro": ("Two mountains, 8,000+ acres of ski and bike terrain, and a pedestrian village with dining, "
              "shopping, and nightlife."),
    "eat": [
        ("rimrock-cafe-whistler", "Seafood restaurant"),
        ("araxi-restaurant-and-oyster-bar-whistler", "Pacific Northwest dining, oysters"),
        ("purebread-bakery-coffee-whistler", "Bakery and coffee, Whistler Village"),
        ("sushi-village-japanese-restaurant-whistler", "Japanese, sushi"),
        ("el-furniture-warehouse-whistler", "Burgers, bar, breakfast"),
        ("hunter-gather-whistler", "Gastropub, breakfast, lunch"),
        ("the-longhorn-saloon-whistler", "Bar and grill"),
        ("whistler-brewing-company-taphouse-whistler", "Brewery taphouse, pub food"),
    ],
    "eat_more": guide("best-restaurants-whistler"),
    "stay": [
        ("fairmont-chateau-whistler-whistler", "Resort hotel, ski-in/ski-out"),
        ("the-westin-resort-and-spa-whistler-whistler", "Resort and spa, base of Whistler Mountain"),
        ("pangea-pod-hotel-whistler", "Pod hotel, Whistler Village"),
        ("nita-lake-lodge-whistler", "Lakeside lodge, Creekside"),
        ("hi-whistler-whistler", "Hostel"),
        ("the-crystal-lodge-whistler-hotel-whistler", "Hotel, Village Green"),
    ],
    "stay_more": guide("best-hotels-whistler"),
}

PEMBERTON = {
    "title": "9. Pemberton",
    "intro": "A farming valley surrounded by peaks, home to Joffre Lakes.",
    "eat": [
        ("mile-one-eating-house-pemberton", "Casual eatery"),
        ("the-pony-pemberton", "Restaurant, comfort food"),
        ("blackbird-bakery-pemberton", "Bread, pastries, coffee"),
        ("grimms-gourmet-and-deli-ltd-and-brooklyns-pizza-pemberton", "Deli, pizza, coffee"),
    ],
    "eat_more": guide("best-restaurants-pemberton"),
    "stay": [
        ("pemberton-valley-lodge-pemberton", "Lodge"),
        ("pemberton-hotel-pemberton", "Historic hotel, Frontier Street"),
        ("nairn-falls-campground-pemberton", "Provincial park campground"),
    ],
    "stay_more": guide("best-hotels-pemberton"),
}

TRAIL_HEADER = ["Trail", "Difficulty", "Distance", "Time", "Highlights"]

SQUAMISH_TRAILS = {
    "title": "6. Squamish Trail Guide",
    "intro": "Popular hikes rated by difficulty, distance, and time.",
    "rows": [
        ["Shannon Falls", "Easy", "0.5 km", "15 min", "335 m waterfall. Paved path."],
        ["Estuary Trails", "Easy", "3-5 km", "1-2 hrs", "Flat, river views, eagles, sunset spot."],
        ["Four Lakes Trail", "Easy-Mod", "6 km loop", "2-3 hrs", "Four lakes, swimming in summer."],
        ["Chief 1st Peak", "Hard", "4 km", "2-3 hrs", "Granite scramble. Howe Sound views."],
        ["Chief 2nd Peak", "Hard", "5 km", "4-5 hrs", "Big summit, usually less crowded."],
        ["Chief 3rd Peak", "Hard", "7 km", "5-7 hrs", "Highest of the three (702m). Garibaldi views."],
        ["Garibaldi Lake", "Moderate", "18 km", "5-7 hrs", "Turquoise alpine lake."],
        ["Elfin Lakes", "Moderate", "22 km", "6-8 hrs", "Alpine meadows, overnight hut available."],
        ["Sea to Summit", "Moderate", "7.5 km", "3-4 hrs", "Forest trail to Gondola summit."],
        ["Smoke Bluffs", "Easy", "2-4 km", "1-2 hrs", "Climbing crag views. Loop trails."],
        ["Brandywine Meadows", "Hard", "10 km", "5-6 hrs", "Alpine wildflowers in July-Aug."],
    ],
    "tip": ("Trail Tip: Start the Chief before 8 AM on weekends. Second Peak is the local's choice: "
            "same views, more space, fewer selfie sticks."),
    "more": guide("best-hikes-squamish"),
}

WHISTLER_TRAILS = {
    "title": "8. Whistler Trail Guide",
    "intro": None,
    "rows": [
        ["Lost Lake Loop", "Easy", "5 km", "1-2 hrs", "Flat loop, swimming, free. Year-round."],
        ["Train Wreck Falls", "Easy", "2 km", "30 min", "Suspension bridge to graffiti train cars."],
        ["Cheakamus River", "Easy", "3 km", "1 hr", "Riverside walk, old-growth forest."],
        ["Whistler Peak Trail", "Moderate", "5 km", "2-3 hrs", "From gondola summit. Alpine views."],
        ["Russet Lake", "Hard", "26 km", "8-10 hrs", "Musical Bumps to Singing Pass."],
        ["Wedgemount Lake", "Hard", "12 km", "5-7 hrs", "Steep climb to a glacier lake."],
        ["High Note Trail", "Moderate", "9 km", "3-4 hrs", "Panoramic alpine views. Gondola access."],
        ["Flute Summit", "Hard", "12 km", "5-6 hrs", "Above the treeline. Musical Bumps."],
        ["Rainbow Falls", "Easy", "3 km", "1 hr", "Gentle forest walk to waterfall."],
        ["Helm Creek", "Hard", "22 km", "7-9 hrs", "Black Tusk views. Backcountry camping."],
    ],
    "tip": ("Trail Tip: High Note Trail gives big views for the effort. Gondola up, walk the ridge with "
            "360\u00b0 views, ride back down."),
    "more": guide("best-hikes-whistler"),
}

PEMBERTON_TRAILS = {
    "title": "10. Pemberton Trail Guide",
    "intro": None,
    "rows": [
        ["Joffre Lakes", "Moderate", "10 km", "3-4 hrs", "Three turquoise glacier lakes. Check pass rules."],
        ["Nairn Falls", "Easy", "3 km", "1 hr", "Powerful cascade, old-growth forest."],
        ["One Mile Lake", "Easy", "1.5 km", "30 min", "Lakeside loop, swimming, family-friendly."],
        ["Mount Currie Trail", "Hard", "14 km", "6-8 hrs", "Summit views over the entire valley."],
        ["Tenquille Lake", "Hard", "24 km", "8-10 hrs", "Remote alpine lake. Backcountry hut."],
        ["Mosquito Lake", "Moderate", "8 km", "3-4 hrs", "Lake swimming, forest walk."],
    ],
    "tip": ("Trail Tip: Joffre Lakes is very busy in summer. Check day-use pass rules at bcparks.ca "
            "before you go and arrive by 8 AM."),
    "more": guide("best-hikes-pemberton"),
}

PACKING_SUMMER = [
    "Hiking boots or sturdy trail shoes",
    "Layers: mountain weather changes fast",
    "Light rain jacket",
    "Sunscreen SPF 50+ and sunglasses",
    "Reusable water bottle",
    "Camera or phone with plenty of storage",
    "Trail snacks and lunch for longer hikes",
    "Swimsuit for lake swimming",
    "Insect repellent (June-August)",
    "Cash or card for parking meters",
    "Bear spray for remote trails",
    "Headlamp (just in case)",
]
PACKING_WINTER = [
    "Warm layers (base layer, fleece, insulated jacket)",
    "Waterproof outer shell",
    "Warm toque/beanie and gloves",
    "Ski goggles",
    "Hand warmers",
    "Winter tires or chains (required on Highway 99 in winter; check drivebc.ca for dates)",
    "Lip balm with SPF",
    "Thermos for hot drinks",
    "Ski pass (check online rates in advance)",
]

OUR_GUIDES = [
    ("Best Restaurants in Squamish", "best-restaurants-squamish"),
    ("Best Restaurants in Whistler", "best-restaurants-whistler"),
    ("Best Restaurants in Pemberton", "best-restaurants-pemberton"),
    ("Best Hikes in Squamish", "best-hikes-squamish"),
    ("Best Hikes in Whistler", "best-hikes-whistler"),
    ("Best Hikes in Pemberton", "best-hikes-pemberton"),
    ("Best Hotels in Whistler", "best-hotels-whistler"),
    ("Best Breweries in Squamish", "best-breweries-squamish"),
    ("Best Skiing in Whistler", "best-skiing-whistler"),
    ("Things to Do in Squamish", "things-to-do-squamish"),
    ("Things to Do in Whistler", "things-to-do-whistler"),
    ("Things to Do in Pemberton", "things-to-do-pemberton"),
]
OUR_BLOG = [
    ("Sea to Sky Road Trip Itinerary", "sea-to-sky-highway-road-trip-itinerary"),
    ("48 Hours in Squamish", "48-hours-in-squamish-weekend-itinerary"),
    ("Local's Guide to Whistler in Winter", "locals-guide-whistler-winter"),
    ("Squamish vs Whistler: Where to Stay?", "squamish-vs-whistler-where-to-stay"),
    ("Filming Locations (Virgin River +)", "movies-tv-shows-filmed-sea-to-sky"),
]
AI_PLANNER = {
    "intro": "Need personalized recommendations? Try our free AI Trip Planner:",
    "url": SITE + "/chat",
    "examples": ('Ask it anything: "What should I do for a weekend in Squamish?" '
                 '"Easy hikes for beginners near Whistler?"'),
}
# Useful links: only bestseatosky.com and websites stored on Supabase listings
# are hyperlinked. Other resources are printed as plain text.
USEFUL_LINKS = [
    ("BC Parks day passes", "bcparks.ca", None),
    ("DriveBC road conditions", "drivebc.ca", None),
    ("Whistler Blackcomb snow report", "whistlerblackcomb.com", ("listing_website", "whistler-blackcomb-whistler")),
    ("Weather (Squamish)", "weather.gc.ca", None),
]

BACK_COVER = {
    "brand": "Best Sea to Sky",
    "line_1": "850+ listings across Squamish, Whistler & Pemberton",
    "line_1_min_published": 850,
    "line_2": "Ranked by real Google reviews from locals and visitors",
    "line_3": "Free \u2022 Updated regularly",
}
