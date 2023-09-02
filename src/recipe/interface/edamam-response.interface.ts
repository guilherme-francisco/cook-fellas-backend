export interface EdamamResponse {
  from: number;
  to: number;
  count: number;
  _links: Links;
  hits: Hit[];
}

export interface Links {
  next?: Next;
}

export interface Next {
  href?: string;
  title: string;
}

export interface Hit {
  recipe: Recipe;
  _links: Links2;
}

export interface Recipe {
  uri?: string;
  label?: string;
  image?: string;
  images?: Images;
  url?: string;
  yield?: number;
  healthLabels?: string[];
  cautions?: string[];
  ingredientLines?: string[];
  ingredients?: Ingredient[];
  calories?: number;
  totalCO2Emissions?: number;
  totalTime?: number;
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
  source?: string;
  totalWeight?: number;
  co2EmissionsClass?: string;
  dietLabels?: string[];
  totalNutrients?: Nutrients;
  totalDaily?: Nutrients;
}

export interface Ingredient {
  text: string;
  quantity: number;
  measure?: string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image?: string;
}

export interface Links2 {
  self: Self;
}

export interface Self {
  title: string;
  href: string;
}

export interface Images {
  THUMBNAIL: Image;
  SMALL: Image;
  REGULAR: Image;
  LARGE: Image;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Nutrients {
  ENERC_KCAL: Nutrient;
  FAT: Nutrient;
  CHOCDF: Nutrient;
  FIBTG: Nutrient;
  SUGAR: Nutrient;
  PROCNT: Nutrient;
  CHOLE: Nutrient;
  NA: Nutrient;
}

export interface Nutrients {
  ENERC_KCAL: Nutrient;
  FAT: Nutrient;
  CHOCDF: Nutrient;
  FIBTG: Nutrient;
  PROCNT: Nutrient;
  CHOLE: Nutrient;
  NA: Nutrient;
}

export interface Nutrient {
  label: string;
  quantity: number;
  unit: string;
}
