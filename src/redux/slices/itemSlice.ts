import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Item } from "@/types";
import { getItems, addItem, updateItem, deleteItem } from "@/services/database";

interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const items = await getItems();
  return items;
});

export const createItem = createAsyncThunk(
  "items/createItem",
  async (item: Omit<Item, "id" | "createdAt">) => {
    const id = await addItem(item);
    return { ...item, id };
  }
);

export const editItem = createAsyncThunk(
  "items/editItem",
  async (item: Item) => {
    await updateItem(item);
    return item;
  }
);

export const removeItem = createAsyncThunk(
  "items/removeItem",
  async (id: number) => {
    await deleteItem(id);
    return id;
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch items";
      })
      // Create Item
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Edit Item
      .addCase(editItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item: Item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Remove Item
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item: Item) => item.id !== action.payload
        );
      });
  },
});

export default itemSlice.reducer;
