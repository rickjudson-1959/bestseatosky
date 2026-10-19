-- Read-only export used to build data/listings-snapshot.json.
-- Run against the Best Sea to Sky Supabase project (ref ntbedmwekuzpsvqubadb).
-- Paste the JSON rows into listings-snapshot.json under "listings".
select l.id, l.slug, l.name, l.status, c.slug as category, t.slug as town,
       t.name as town_name, l.website, l.address, l.updated_at
from listings l
join categories c on c.id = l.category_id
join towns t on t.id = l.town_id
where l.slug = any(array[
  'a-frame-brewing-co-squamish',
  'alice-lake-campgrounds-squamish',
  'araxi-restaurant-and-oyster-bar-whistler',
  'backcountry-brewing-squamish',
  'blackbird-bakery-pemberton',
  'brandywine-falls-provincial-park-whistler',
  'britannia-mine-museum-britannia-beach',
  'canadian-coastal-sailing-squamish',
  'el-furniture-warehouse-whistler',
  'executive-suites-hotel-and-resort-squamish-squamish',
  'fairmont-chateau-whistler-whistler',
  'fergies-cafe-squamish',
  'grimms-gourmet-and-deli-ltd-and-brooklyns-pizza-pemberton',
  'handlebar-pizza-whistler',
  'hi-whistler-whistler',
  'howe-sound-inn-and-brewing-squamish',
  'hunter-gather-whistler',
  'joffre-lakes-park-pemberton',
  'mags99-fried-chicken-and-mexican-cantina-squamish',
  'mile-one-eating-house-pemberton',
  'nairn-falls-campground-pemberton',
  'nairn-falls-provincial-park-whistler',
  'nita-lake-lodge-whistler',
  'pangea-pod-hotel-whistler',
  'pemberton-hotel-pemberton',
  'pemberton-valley-lodge-pemberton',
  'porteau-cove-provincial-park-squamish',
  'purebread-bakery-coffee-whistler',
  'purebread-bakery-coffee-whistler-2',
  'rimrock-cafe-whistler',
  'sandman-hotel-and-suites-squamish-squamish',
  'scandinave-spa-whistler-whistler',
  'sea-to-sky-gondola-squamish',
  'shannon-falls-provincial-park-squamish',
  'squamish-adventure-inn-and-hostel-squamish',
  'sunwolf-riverside-resort-squamish',
  'sushi-village-japanese-restaurant-whistler',
  'tantalus-lookout-squamish',
  'the-crabapple-cafe-squamish',
  'the-crystal-lodge-whistler-hotel-whistler',
  'the-locavore-bar-and-grill-squamish',
  'the-longhorn-saloon-whistler',
  'the-pony-pemberton',
  'the-westin-resort-and-spa-whistler-whistler',
  'whistler-blackcomb-whistler',
  'whistler-brewing-company-taphouse-whistler'
])
order by l.slug;

-- Site-wide counts used for the back cover ("850+ listings"):
select status, count(*) from listings group by status;

-- Published guide and blog slugs (site_pages in the snapshot):
select 'guide' as kind, slug, status from seo_pages
union all
select 'blog', slug, status from blog_posts
order by 1, 2;
