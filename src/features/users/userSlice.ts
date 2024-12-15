import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

type SelectedUser = User | null | {};
interface UserSliceType {
  selectedUser: SelectedUser;
}

export const initialState = { selectedUser: null } as UserSliceType;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<SelectedUser>) {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
