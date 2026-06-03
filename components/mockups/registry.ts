import { Otc360Hero, otc360FeatureGlyphs } from "@/components/mockups/otc-360";
import type { ReactNode } from "react";

/**
 * Per-project wireframe registry.
 *
 * Maps a `ProjectData.id` to its bespoke, product-faithful mockups. A project
 * without an entry falls back to the generic `AppMockup` / `WireframeGlyph` in
 * the case-study view — so custom mockups can be added one project at a time
 * without touching the others.
 */
export interface ProjectMockup {
  /** Big hero mockup replacing the generic `AppMockup`. */
  hero?: (props: { label?: string }) => ReactNode;
  /** Feature glyphs keyed by the exact `feature.title`. */
  features?: Record<string, (props: { className?: string }) => ReactNode>;
}

const PROJECT_MOCKUPS: Record<string, ProjectMockup> = {
  "otc-360": {
    hero: Otc360Hero,
    features: otc360FeatureGlyphs,
  },
};

export function getProjectMockup(id: string): ProjectMockup | undefined {
  return PROJECT_MOCKUPS[id];
}
