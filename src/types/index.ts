export interface Item {
  id?: number;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  items: ItemState;
}
