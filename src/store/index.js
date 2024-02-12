import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";

const rootReducers = combineReducers({ user: userReducer });

export default configureStore({
  reducer: rootReducers,
  devTools: import.meta.env.PROD == true && false,
});
