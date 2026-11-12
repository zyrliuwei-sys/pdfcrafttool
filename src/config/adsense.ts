// Public AdSense account identifier supplied by the site publisher.
export const ADSENSE_PUBLISHER_ID = 'pub-2841223102464177';

export function adsensePublisherId(configured?: string): string {
  const value = configured?.trim().replace(/^ca-/, '');
  return value && /^pub-\d{16}$/.test(value) ? value : ADSENSE_PUBLISHER_ID;
}
