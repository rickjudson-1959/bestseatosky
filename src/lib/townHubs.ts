export type TownHub = {
  href: string;
  label: string;
  category: 'eat' | 'stay' | 'visit';
};

const EAT_TOWN_HUBS = new Set(['squamish', 'whistler', 'pemberton']);
const STAY_TOWN_HUBS = new Set(['squamish', 'whistler']);

function titleCaseTown(townName: string): string {
  return townName;
}

export function getTownEatHub(townSlug?: string | null): string | null {
  if (!townSlug) return null;
  return EAT_TOWN_HUBS.has(townSlug) ? `/eat/${townSlug}` : null;
}

export function getTownStayHub(townSlug?: string | null): string | null {
  if (!townSlug) return null;
  return STAY_TOWN_HUBS.has(townSlug) ? `/stay/${townSlug}` : null;
}

export function getTownHubs(
  townSlug?: string | null,
  townName?: string | null,
  omitCategory?: string | null,
): TownHub[] {
  const name = townName ? titleCaseTown(townName) : 'the corridor';
  const eatHref = getTownEatHub(townSlug) || '/eat';
  const stayHref = getTownStayHub(townSlug) || '/stay';

  return [
    {
      href: eatHref,
      label: getTownEatHub(townSlug) ? `Explore ${name} Eat` : 'Explore Eat',
      category: 'eat' as const,
    },
    {
      href: stayHref,
      label: getTownStayHub(townSlug) ? `Explore ${name} Stay` : 'Explore Stay',
      category: 'stay' as const,
    },
    {
      href: '/visit',
      label: townName ? `Explore ${name} Visit` : 'Explore Visit',
      category: 'visit' as const,
    },
  ].filter((hub) => hub.category !== omitCategory);
}

export function getPrimaryTownHub(
  categorySlug: string,
  townSlug?: string | null,
  townName?: string | null,
): TownHub {
  const hubs = getTownHubs(townSlug, townName);
  return hubs.find((hub) => hub.category === categorySlug) || hubs[0];
}

export function getCategoryTownHubHref(categorySlug: string, townSlug?: string | null): string | null {
  if (categorySlug === 'eat') return getTownEatHub(townSlug);
  if (categorySlug === 'stay') return getTownStayHub(townSlug);
  return null;
}
