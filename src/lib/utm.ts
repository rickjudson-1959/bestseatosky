type UTMParams = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

export function buildUTMUrl(baseUrl: string, params: UTMParams): string {
  try {
    // Add protocol if missing
    let urlString = baseUrl;
    if (!/^https?:\/\//i.test(urlString)) {
      urlString = `https://${urlString}`;
    }

    const url = new URL(urlString);

    const utmMap: Record<string, string | undefined> = {
      utm_source: params.source ?? 'bestseatosky',
      utm_medium: params.medium ?? 'directory',
      utm_campaign: params.campaign,
      utm_content: params.content,
      utm_term: params.term,
    };

    for (const [key, value] of Object.entries(utmMap)) {
      if (value) {
        url.searchParams.set(key, value);
      }
    }

    return url.toString();
  } catch {
    return baseUrl;
  }
}
