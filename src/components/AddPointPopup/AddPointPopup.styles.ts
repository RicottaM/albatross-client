export interface AddPointPopupProps {
  onAdd: (name: string, categoryId: number) => void;
  categories: { id: number; name: string }[];
  initialName?: string;
  initialCategoryId?: number;
  buttonLabel?: string;
  title?: string;
}
