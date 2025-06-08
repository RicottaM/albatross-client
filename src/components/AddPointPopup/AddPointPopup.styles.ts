export interface AddPointPopupProps {
  onAdd: (name: string, categoryId: number) => void;
  categories: { id: number; name: string }[];
}
