import type { HubService } from "./HubLeadForm";

const MAP: Record<string, HubService> = {
  "branding-corporate-id": "brand",
  "markenbildung-unternehmensidentitaet": "brand",
  "strategy-positioning": "strategy",
  "strategie-positionierung": "strategy",
  "social-media-performance": "performance",
  "soziale-medien-leistung": "performance",
  "content-campaigning": "content",
  "inhalte-kampagnen": "content",
};

export function serviceForHub(slug: string): HubService {
  return MAP[slug] ?? "contact";
}
