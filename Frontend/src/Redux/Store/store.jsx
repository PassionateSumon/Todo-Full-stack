// src/Redux/Store/store.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Slices/todoSlice";
import authReducer from "../Slices/authSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
  },
});

export default store;
