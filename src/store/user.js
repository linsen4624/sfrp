import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    isLoggedIn: false,
    account: null,
    profile: null,
    bizData: [],
    coupons: [],
    relations: [],
  },
  reducers: {
    updateStatus: (state, action) => {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    },
    updateProfile: (state, action) => {
      switch (action.type) {
        case "locale":
          return {
            ...state,
            [state.profile]: {
              ...[state.profile],
              locale: action.payload,
            },
          };

        default:
          return state;
      }
    },
    updateAccount: (state, action) => {
      switch (action.type) {
        case "username":
          return {
            ...state,
            [state.account]: {
              ...[state.account],
              username: action.payload,
            },
          };
        default:
          return state;
      }
    },
  },
});
export const { updateStatus, updateAccount, updateProfile } = userSlice.actions;
export default userSlice.reducer;
