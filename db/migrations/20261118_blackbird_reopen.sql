-- Blackbird Bakery (Pemberton) reopened. Google showed it open on Nov 18, 2026
-- (4.7 from 578 reviews). This file is NOT applied. Rick runs it in the
-- Supabase SQL editor for project ntbedmwekuzpsvqubadb, or says OK first.
-- The app does not run it.
--
-- Phone: /eat and listing pages read listings.phone. No hard-coded Blackbird
-- number exists in the site code. 673 listings use "+1 NNN-NNN-NNNN".
-- Blackbird is already in that form ("+1 604-894-6226"). The new number is
-- stored as "+1 604-902-0392" so it matches that convention. "(604) 902-0392"
-- is the same number; the parenthetical form is uncommon here (44 rows,
-- mostly toll-free).
--
-- FAQ: only the answer to "Are there cafes in Pemberton?" changes. Other
-- faq_json entries are left in place via jsonb_set on that one answer.

-- Select before. Confirm these current values, then run the updates.
select id, slug, phone
from public.listings
where id = 'f724d3aa-f0df-4420-9340-e8cc95d1c2cd'
  and slug = 'blackbird-bakery-pemberton';

select id, slug, faq_json
from public.seo_pages
where id = 'e87411ab-76ec-4409-95d0-b5e55cfaa80a'
  and slug = 'best-restaurants-pemberton';

begin;

update public.listings
set phone = '+1 604-902-0392'
where id = 'f724d3aa-f0df-4420-9340-e8cc95d1c2cd'
  and slug = 'blackbird-bakery-pemberton'
  and phone = '+1 604-894-6226';

update public.seo_pages
set faq_json = jsonb_set(
  faq_json,
  '{3,answer}',
  to_jsonb($new$Yes. Cafes and bakeries on this list include The Bread Warehouse on Carpenter Road (4.9 from 250), The British Baker in Mount Currie (4.9 from 38), Lynx Cafe on Highway 99 (4.8 from 104), Blackbird Bakery on Frontier Street (4.7 from 578) and Mount Currie Coffee Company on Arbutus Street (4.6 from 527).$new$::text)
)
where id = 'e87411ab-76ec-4409-95d0-b5e55cfaa80a'
  and slug = 'best-restaurants-pemberton'
  and faq_json->3->>'question' = 'Are there cafes in Pemberton?'
  and faq_json->3->>'answer' = $old$Yes. Cafes and bakeries on this list include The Bread Warehouse on Carpenter Road (4.9 from 250), The British Baker in Mount Currie (4.9 from 38), Lynx Cafe on Highway 99 (4.8 from 104) and Mount Currie Coffee Company on Arbutus Street (4.6 from 527).

Blackbird Bakery on Frontier Street is left off for now because Google showed it as temporarily closed on October 19, 2026.$old$;

-- Expect UPDATE 1 for each statement. If either says UPDATE 0, run rollback
-- instead of commit.
commit;

-- Rollback. Leave commented. Restores the values read on Nov 18, 2026.
--
-- begin;
--
-- update public.listings
-- set phone = '+1 604-894-6226'
-- where id = 'f724d3aa-f0df-4420-9340-e8cc95d1c2cd'
--   and slug = 'blackbird-bakery-pemberton'
--   and phone = '+1 604-902-0392';
--
-- update public.seo_pages
-- set faq_json = jsonb_set(
--   faq_json,
--   '{3,answer}',
--   to_jsonb('Yes. Cafes and bakeries on this list include The Bread Warehouse on Carpenter Road (4.9 from 250), The British Baker in Mount Currie (4.9 from 38), Lynx Cafe on Highway 99 (4.8 from 104) and Mount Currie Coffee Company on Arbutus Street (4.6 from 527).' || E'\n\n' || 'Blackbird Bakery on Frontier Street is left off for now because Google showed it as temporarily closed on October 19, 2026.')
-- )
-- where id = 'e87411ab-76ec-4409-95d0-b5e55cfaa80a'
--   and slug = 'best-restaurants-pemberton'
--   and faq_json->3->>'question' = 'Are there cafes in Pemberton?';
--
-- commit;
