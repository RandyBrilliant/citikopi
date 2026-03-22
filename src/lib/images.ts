/**
 * Remote backgrounds (Unsplash): Indonesian / coffee garden, harvest, beans, highlands.
 * Product photos: `/public/img/product/*` (local).
 */

export const images = {
  /** Hero poster / OG — rich coffee beans, editorial mood */
  hero: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=2400&q=80",
  /** Home “100% local” section — hands gathering coffee cherries */
  coffeeHarvestBg:
    "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?auto=format&fit=crop&w=2000&q=80",
  /** Products page header — coffee farm / garden atmosphere */
  coffeeFarmBg:
    "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&w=2400&q=80",
  /** About page — origin / craft at the farm */
  coffeeOriginBg:
    "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=2000&q=80",
} as const;

/** Card imagery on /products — matches `public/img/product/` uploads. */
export const productImages: Record<
  | "coffee"
  | "nest"
  | "fishMaw"
  | "seaCucumber"
  | "spices"
  | "sweets"
  | "palmSugar",
  string
> = {
  coffee: "/img/product/coffee.png",
  nest: "/img/product/bird-nest.jpg",
  fishMaw: "/img/product/fish-maw.jpg",
  seaCucumber: "/img/product/sea-cucumber.jpg",
  spices: "/img/product/spices.jpg",
  sweets: "/img/product/biscuit.jpg",
  palmSugar: "/img/product/palm-sugar.jpg",
};
