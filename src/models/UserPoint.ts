export type UserPoint = {
  id: number;
  userId: number;
  pointId: number;
  point: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    categoryId: number;
  };
};
