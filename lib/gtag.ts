export const GA_TRACKING_ID = process.env.GA_KEY;

type GtagPayload = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string | undefined, params?: GtagPayload) => void;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag?.('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
