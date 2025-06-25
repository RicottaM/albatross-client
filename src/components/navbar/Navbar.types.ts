import { Category } from '@/models/Category';

export interface NavbarProps {
  username: string | null;
  categories: Category[];
  selectedCategory: number | '*';
  onCategoryChange: (categoryId: number | '*') => void;
}
