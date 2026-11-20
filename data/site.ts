export interface Site {
  name: string;
}

export const site: Site = {
  name: "Segundo Planes",
};

// Date of the last content update, used as the sitemap's lastModified (a
// stable value; `new Date()` changed on every build). Bump it when publishing.
export const CONTENT_UPDATED = "2026-11-20";
