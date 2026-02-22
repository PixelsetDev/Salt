export type dietaryType = {
  celery: number;
  gluten: number;
  crustaceans: number;
  eggs: number;
  fish: number;
  lupin: number;
  milk: number;
  molluscs: number;
  mustard: number;
  peanuts: number;
  sesame: number;
  soybeans: number;
  sulphites: number;
  treenuts: number;
  animal_products: number;
  meat: number;
} | null;

export type categoryType = {
  id: number;
  name: string;
  ingredients: [number];
  subcategories: [{
    id: number;
    name: string;
  }];
} | null;

export type categoriesType = [{
  id: number;
  name: string;
}] | null;

export type collectionType = {
  id: number;
  name: string;
  slug: string;
  author: {
    uuid: string;
    name: string;
    username: string;
  };
  description: string;
  featured: boolean;
  visibility: number;
} | null;

export type ingredientType = {
  alias_of: number;
  name: string;
  dietary: {
    celery: number;
    gluten: number;
    crustaceans: number;
    eggs: number;
    fish: number;
    lupin: number;
    milk: number;
    molluscs: number;
    mustard: number;
    peanuts: number;
    sesame: number;
    soybeans: number;
    sulphites: number;
    treenuts: number;
    animal_products: number;
    meat: number
  }|null;
  disclaimer: string;
}|null;

export type ingredientsType = {
  id: number;
  name: string;
}[];

export type recipeType = {
  id: number;
  slug: string;
  name: string;
  description: string;
  servings: number;
  difficulty: number;
  visibility: number;
  date: string;
  tips: string;
  author: {
    username: string;
    name: string;
    uuid: string;
  };
  time: {
    prep: number;
    cook: number;
  }
} | null;

export type recipeIngredientsType = {
  ingredient: number;
  name?: string;
  amount: number;
  unit: string;
}[] | null;

export type reviewsType = {
  score: number;
  reviews: [
    {
      rating: number;
      comment: string | null;
      author: {
        username: string;
        name: string;
      };
      created: string;
      edited: string|null;
    },
  ];
} | null;

export type stepsType = [string] | null;

export type userType = {
  name: string;
  username: string;
  uuid: string;
  recipes?: {
    slug: string;
    name: string;
    description: string|null;
    visibility: number;
  }[];
  collections?: {
    slug: string;
    name: string;
    description: string|null;
    featured: boolean;
    visibility: number;
  }[];
  self: boolean;
  reviews: {
    rating: number;
    comment: string|null;
    recipe_id: string;
    recipe_name: string;
    recipe_slug: string;
    recipe_author: {
      name: string;
      username: string;
    };
  }[];
} | null;