import {
  createSlice,
  configureStore,
} from "https://cdn.jsdelivr.net/npm/@reduxjs/toolkit@2.0.1/+esm";

/**
 * Retrieves user's to do list from local storage
 * @returns {Array}
 */
export const getTodoListFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todoList"));
};
/**
 * Store to do list in local storage so that user to dos can persist after closing window.
 */
const storeTodoListInLocalStorage = (todoListArray) => {
  localStorage.setItem("todoList", JSON.stringify(todoListArray));
};

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoListItemsArray: getTodoListFromLocalStorage() || [],
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
      storeTodoListInLocalStorage(state.todoListItemsArray);
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
      storeTodoListInLocalStorage(state.todoListItemsArray);
    },
    deleteTodo: (state, action) => {
      state.todoListItemsArray = state.todoListItemsArray.filter((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }
      });
      storeTodoListInLocalStorage(state.todoListItemsArray);
    },
    clearTodos: (state) => {
      state.todoListItemsArray = [];
      storeTodoListInLocalStorage(state.todoListItemsArray);
    },
  },
});

export const {
  addTodoToList,
  toggleAlert,
  editTodoOn,
  deleteTodo,
  clearTodos,
} = todoSlice.actions;

export const store = configureStore({
  reducer: todoSlice.reducer,
});
