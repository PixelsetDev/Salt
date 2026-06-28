import React from 'react';

export const allergenList: { key: string; label: string; Icon: React.FC<{ width: number; height: number; fill: string; color: string }> }[] = [
  { key: 'celery', label: 'Celery', Icon: require('../assets/icons/dietary/circle-celery.svg') },
  { key: 'gluten', label: 'Gluten', Icon: require('../assets/icons/dietary/circle-cereal.svg') },
  { key: 'crustaceans', label: 'Crustaceans', Icon: require('../assets/icons/dietary/circle-crustaceans.svg'), },
  { key: 'eggs', label: 'Eggs', Icon: require('../assets/icons/dietary/circle-eggs.svg') },
  { key: 'fish', label: 'Fish', Icon: require('../assets/icons/dietary/circle-fish.svg') },
  { key: 'lupin', label: 'Lupin', Icon: require('../assets/icons/dietary/circle-lupin.svg') },
  { key: 'milk', label: 'Milk', Icon: require('../assets/icons/dietary/circle-milk.svg') },
  { key: 'molluscs', label: 'Molluscs', Icon: require('../assets/icons/dietary/circle-molluscs.svg'), },
  { key: 'mustard', label: 'Mustard', Icon: require('../assets/icons/dietary/circle-mustard.svg'), },
  { key: 'peanuts', label: 'Peanuts', Icon: require('../assets/icons/dietary/circle-peanuts.svg'), },
  { key: 'sesame', label: 'Sesame', Icon: require('../assets/icons/dietary/circle-sesame.svg') },
  { key: 'soybeans', label: 'Soy', Icon: require('../assets/icons/dietary/circle-soya.svg') },
  { key: 'sulphites', label: 'Sulphites', Icon: require('../assets/icons/dietary/circle-so2.svg'), },
  { key: 'treenuts', label: 'Tree Nuts', Icon: require('../assets/icons/dietary/circle-nuts.svg'), },
];

export const VeganIcon: React.FC<{ width: number; height: number; fill: string; color: string }> = require('../assets/icons/dietary/circle-vegan.svg');
export const VegetarianIcon: React.FC<{ width: number; height: number; fill: string; color: string }> = require('../assets/icons/dietary/circle-vegetarian.svg');

export const dietaryColour = (value: number): string => {
  if (value === 2) return '#DC2626';
  if (value === 1) return '#D97706';
  return '#16A34A';
};

export const dietaryTooltip = (value: number, label: string): string => {
  if (value === 2) return `Contains ${label}`;
  if (value === 1) return `May contain ${label}`;
  return `No ${label}`;
};
