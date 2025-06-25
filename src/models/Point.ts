import { Category } from './Category';

export type Point = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  categoryId: number;
  category: Category;
};
