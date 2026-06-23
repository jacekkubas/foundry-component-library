export const translate = (text: string, lang: string = "EN") => {
  if (lang === "EN") return text;

  if (text === "Get in touch") {
    return "Kontakt aufnehmen";
  }

  if (text === "Tell us about your brand and discover how we can help.") {
    return "Erzählen Sie uns von Ihrer Marke und entdecken Sie, wie wir Ihnen helfen können.";
  }

  if (text === "Success stories.\nWith proven results.") {
    return "Erfolgsgeschichten.\nMit messbaren Ergebnissen.";
  }

  if (text === "") {
    return "";
  }

  if (text === "") {
    return "";
  }

  if (text === "") {
    return "";
  }

  return text;
};
