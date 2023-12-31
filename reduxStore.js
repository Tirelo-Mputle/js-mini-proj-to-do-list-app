import {
  createSlice,
  configureStore,
} from "https://cdn.jsdelivr.net/npm/@reduxjs/toolkit@2.0.1/+esm";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoListItemsArray: [],
    isAlertVisible: false,
    emptyInputFieldValue: "",
    editing: {
      todoEditing: "",
      isEditing: false,
      editValue: "",
    },
  },
  reducers: {
    addTodoToList: (state, action) => {
      state.todoListItemsArray = [
        ...state.todoListItemsArray,
        { todoItem: action.payload, id: crypto.randomUUID() },
      ];
    },
    toggleAlert: (state) => {
      state.isAlertVisible = !state.isAlertVisible;
    },
    editTodoOn: (state, action) => {
      state.todoListItemsArray = state.todoListItemsArray.map((todo) => {
        if (todo.id === action.payload.id) {
          return { todoItem: action.payload.editValue, id: action.payload.id };
        } else {
          return todo;
        }
      });
    },
    deleteTodo: (state, action) => {
      state.todoListItemsArray = state.todoListItemsArray.filter((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }
      });
    },
  },
});

export const { addTodoToList, toggleAlert, editTodoOn, deleteTodo } =
  todoSlice.actions;

export const store = configureStore({
  reducer: todoSlice.reducer,
});
