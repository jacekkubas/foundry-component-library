"use client";

import { useEffect, useState } from "react";
import { Widget } from "@typeform/embed-react";
import "@typeform/embed/build/css/widget.css";

export type HubService =
  | "brand"
  | "strategy"
  | "performance"
  | "content"
  | "contact";

function readCookie(name: string): string {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : "";
}

export function HubLeadForm({ service }: { service: HubService }) {
  const [hidden, setHidden] = useState<Record<string, string>>({
    service,
    page: "",
    gclid: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setHidden({
      service,
      page: window.location.pathname,
      gclid: params.get("gclid") || readCookie("_fgclid") || "",
    });
  }, [service]);

  return (
    <Widget
      id="qmv6Yk"
      style={{ width: "100%", height: "600px" }}
      hidden={hidden}
      transitiveSearchParams={[
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
      ]}
    />
  );
}
