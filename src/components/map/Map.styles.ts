import { Category } from '@/models/Category';

export interface MapProps {
  selectedCategory: number | '*';
  categories: Category[];
}
