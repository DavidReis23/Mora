import type { PropertyPurpose, PropertyType } from "./property";

export type PropertyFilterValues = {
  search: string;
  city: string;
  neighborhood: string;
  type: PropertyType | "";
  purpose: PropertyPurpose | "";
  minPrice: string;
  maxPrice: string;
  includeNearby: boolean;
};
