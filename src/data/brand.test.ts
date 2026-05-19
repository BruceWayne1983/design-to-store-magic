import { describe, expect, it } from "vitest";
import { activeSocialLinks, SOCIAL_LINKS } from "./brand";

describe("activeSocialLinks", () => {
  it("filters out entries with an empty url", () => {
    const active = activeSocialLinks();
    expect(active.every((s) => s.url.length > 0)).toBe(true);
  });

  it("preserves the order of SOCIAL_LINKS for entries that pass the filter", () => {
    const populatedNames = SOCIAL_LINKS.filter((s) => s.url.length > 0).map((s) => s.name);
    expect(activeSocialLinks().map((s) => s.name)).toEqual(populatedNames);
  });
});
