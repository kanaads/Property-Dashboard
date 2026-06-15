import * as React from "react";

/**
 * The core repeating unit of the Propvia dashboard: a single property listing.
 * Composes ScoreBadge (Latent Value Score, floated over the photo) and Badge
 * (property type). Shows price, title, location and the bed/bath/sqft strip.
 *
 * @startingPoint section="Property" subtitle="Property listing grid card" viewport="380x360"
 */
export interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Photo URL. Falls back to a slate gradient when omitted. */
  image?: string;
  title: string;
  location?: string;
  /** Property type label shown as a badge over the photo. */
  type?: string;
  /** Price in dollars (number → formatted $X.XM/$XK) or a preformatted string. */
  price?: number | string;
  beds?: number;
  baths?: number;
  sqft?: number;
  /** Latent Value Score 1–100. */
  score?: number;
  favorite?: boolean;
  /** When provided, renders the watchlist heart toggle. */
  onFavorite?: (e: React.MouseEvent) => void;
  /** Hover lift + pointer. @default true */
  interactive?: boolean;
}

export function PropertyCard(props: PropertyCardProps): JSX.Element;
