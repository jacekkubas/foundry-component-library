type Translations = Record<string, { DE?: string; EN?: string }>;

const strings: Translations = {
  "Get in touch": {
    DE: "Kontakt aufnehmen",
  },
  "Tell us about your brand and discover how we can help.": {
    DE: "Erzählen Sie uns von Ihrer Marke und entdecken Sie, wie wir Ihnen helfen können.",
  },
  "Success stories.\nWith proven results.": {
    DE: "Erfolgsgeschichten.\nMit messbaren Ergebnissen.",
  },
  Berlin: {
    DE: "Berlin",
  },
  Zurich: {
    DE: "Zürich",
  },
  "Service Hubs": {
    DE: "Hubs",
  },
  "About Us": {
    DE: "Über uns",
  },
  "Case Studies": {
    DE: "Cases",
  },
  Contact: {
    DE: "Kontakt",
  },
  "Contact Us": {
    DE: "Kontakt",
  },
  "Follow Us": {
    DE: "Folge uns",
  },
  Imprint: {
    DE: "Impressum",
  },
  Terms: {
    DE: "Terms & Conditions",
  },
  "Privacy policy": {
    DE: "Datenschutz",
  },
  "Team & Careers": {
    DE: "Team & Karriere",
  },
  "News & Insights": {
    DE: "News & Insights",
  },
  "": {
    DE: "",
  },
  "": {
    DE: "",
  },
  "": {
    DE: "",
  },
};

export const translate = (text: string, lang: "DE" | "EN" = "EN") => {
  if (lang === "EN") return text;

  let trans: string | undefined = "";

  Object.keys(strings).forEach((key: string) => {
    if (key === text) {
      trans = strings[key][lang];
      return;
    }
  });

  return trans || text;
};
