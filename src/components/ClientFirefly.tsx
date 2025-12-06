"use client";

import { FireflyOverlay } from "./Firefly";
import type { Event } from "@/types";

export function ClientFirefly({
  anchorIds,
  featuredEvent,
}: {
  anchorIds: string[];
  featuredEvent?: Event;
}) {
  return <FireflyOverlay anchorIds={anchorIds} featuredEvent={featuredEvent} />;
}
