import { input, alert, todosContainer } from "./script.js";
import {
  store,
  toggleAlert,
  addTodoToList,
  editTodoOn,
  deleteTodo,
  clearTodos,
} from "../reduxStore.js";
/**
 * Clears the to do input field after the user adds the to do to the list of to dos
 */
export const clearTodoInputField = () => {
  input.value = store.getState().emptyInputFieldValue;
};
export const clearTodoList = () => {
  store.dispatch(clearTodos());
  displayTodoListItems();
};
/**
 * Displays alert when user adds an item to the list of todos
 */
export const displayAlert = (type) => {
  store.dispatch(toggleAlert());
  if (store.getState().isAlertVisible) {
    let alertColor;
    let alertText;
    if (type === "addTodo") {
      alertColor = "alert-success";
      alertText = `Successfully added to do to list!`;
    }
    if (type === "deleteTodo") {
      alertColor = "alert-delete";
      alertText = `Deleted item from do to list!`;
      console.log("deleting!!");
    }
    alert.classList.add(alertColor, "show-alert");
    alert.textContent = alertText;
    //remove alert after 3 seconds
    setTimeout(() => {
      store.dispatch(toggleAlert());
      alert.classList.remove(alertColor, "show-alert");
    }, 3000);
    //cleartimeout
  }
};

/**
 * Adds input to do value in the list of to dos to be displayed.
 */
export const addTodoItemToList = () => {
  const todoItem = input.value;
  if (todoItem !== "") {
    store.dispatch(addTodoToList(todoItem));
    displayAlert("addTodo");
    clearTodoInputField();
  }
};
/**
 * User can edit the to do item text content
 * @param {Object} e event object
 * @param {li} todoItem to do li element
 */
const editTodo = (e, todoItem) => {
  const todoText = todoItem.querySelector(".todo-text");
  const editButton = e.target;
  const edittingInput = todoText.querySelector(".edittingInput");
  const oldText = todoText.textContent;
  if (todoItem.classList.contains("edittingTodo")) {
    //if no value is added do nothing
    if (edittingInput.value.length === 0) {
    } else {
      todoItem.classList.remove("edittingTodo");
      editButton.textContent = "edit";
      //changes the todoItem text value of the to do
      store.dispatch(
        editTodoOn({ id: todoItem.dataset.id, editValue: edittingInput.value })
      );
    }
    displayTodoListItems();
  } else {
    todoItem.classList.add("edittingTodo");
    editButton.textContent = "save?";
    //add an input box for user to edit to do
    todoText.innerHTML = `
    <input placeholder=${oldText} class="edittingInput"/>`;
    editButton.classList.add("editting");
  }
};

/**
 * Displays to do when they are added to the to dos list.
 */
export function displayTodoListItems() {
  const fragment = new DocumentFragment();
  const todoList = store.getState().todoListItemsArray;
  if (todoList.length === 0) {
    todosContainer.innerHTML = `<p>No to do added yet.</p>`;
    // clearTodosBtn.classList.add("hidden");
  } else {
    todoList.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.dataset.id = todo.id;
      todoItem.classList.add("todoListItem");
      todoItem.innerHTML = `
   
   <p class="todo-text">${todo.todoItem}</p>
   <div class="todoItemIcons">
   <button data-action="edit">Edit</button>
   <button data-action="delete">Delete</button>
   </div>
   `;
      //editting and deleting functionality
      todoItem.addEventListener("click", (e) => {
        //select type of button
        const actionType = e.target.dataset.action;
        if (actionType === "edit") {
          editTodo(e, todoItem);
        }
        if (actionType === "delete") {
          store.dispatch(deleteTodo(todoItem.dataset.id));
          displayAlert("deleteTodo");
          displayTodoListItems();
        }
      });
      //    <i class="fa-solid fa-trash"></i>
      //   <i class="fa-solid fa-pen-to-square"></i>
      fragment.appendChild(todoItem);
    });
    todosContainer.innerHTML = "";
    todosContainer.appendChild(fragment);
    // clearTodosBtn.classList.remove("hidden");
  }
}
