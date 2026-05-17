export type Category = {
  id: string;
  name: string;
  color?: string;
  icon?: string;
};

export type CreateCategoryPayload = Omit<Category, "id">;

export type UpdateCategoryPayload = Partial<Omit<Category, "id">>;
