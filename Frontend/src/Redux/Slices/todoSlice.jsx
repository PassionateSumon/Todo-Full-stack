import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API = "http://localhost:3000/api";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_API}/gettodo`, {
        headers: { token },
      });
      return response.data.todos;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
); // get the todo

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ todoHeading, todoBody }, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_API}/addtodo`,
        { todoHeading, todoBody },
        {
          headers: { token },
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
); // add the todo

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, todoHeading, todoBody }, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_API}/edittodo/${id}`,
        { todoHeading, todoBody },
        {
          headers: { token },
        }
      );
      return { id, todoHeading, todoBody };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
); // edit the todo

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASE_API}/deletetodo/${id}`, {
        headers: { token },
      });
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
); // delete the todo

export const comepleteTodo = createAsyncThunk(
  "todos/completeTodo",
  async (id, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${BASE_API}/donetodo/${id}`,
        {},
        {
          headers: { token },
        }
      );
      return response.data?.todo;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
); // mark done/undone todo

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const ind = state.todos.findIndex((t) => t._id === action.payload.id);
        if (ind !== -1) {
          state.todos[ind] = {
            ...state.todos[ind],
            ...action.payload,
          };
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t._id !== action.payload);
      })
      .addCase(comepleteTodo.fulfilled, (state, action) => {
        const todo = state.todos.find((t) => t._id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.complete;
        }
      })
      .addCase(
        fetchTodos.rejected,
        addTodo.rejected,
        editTodo.rejected,
        deleteTodo.rejected,
        comepleteTodo.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default todoSlice.reducer;
