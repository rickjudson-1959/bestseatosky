-- Remove the author-tenure claim from the Squamish itinerary blog meta.
-- Meta, Open Graph, and Twitter descriptions all read this column.

update public.blog_posts
set meta_description = 'An honest 2-day Squamish itinerary: the hikes, the coffee, the pints, and the spots most visitors drive right past.'
where slug = '48-hours-squamish-local-itinerary';
