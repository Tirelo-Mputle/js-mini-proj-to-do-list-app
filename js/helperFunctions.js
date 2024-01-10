import { input, alert, todosContainer, clearBtn } from "./script.js";
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
/**
 * Clears all the to do items in the list when the clear todos button is clicked
 */
export const clearTodoList = () => {
  store.dispatch(clearTodos());
  displayTodoListItems();
  displayAlert("alert-danger", "Cleared all to dos in your list!");
};
/**
 * Handles whether or not the clear to dos button should be displayed. It only displays when there are to dos displayed.
 */
const handleDisplayClearTodoListBtn = () => {
  if (store.getState().todoListItemsArray.length === 0) {
    clearBtn.classList.add("hidden");
  } else {
    clearBtn.classList.remove("hidden");
  }
};
/**
 * Displays alert when user adds an item to the list of todos
 */
export const displayAlert = (colorClass, alertText) => {
  store.dispatch(toggleAlert());
  if (store.getState().isAlertVisible) {
    alert.classList.add(colorClass, "show-alert");
    alert.textContent = alertText;
    //remove alert after 3 seconds
    setTimeout(() => {
      store.dispatch(toggleAlert());
      alert.classList.remove(colorClass, "show-alert");
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
    displayAlert("alert-success", "Successfully added a to do to your list.");
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
  let editButton = e.target;
  console.log(editButton);
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
    editButton.classList.remove("fa-solid", "fa-pen-to-square");
    editButton.classList.add("fa-solid", "fa-check");
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
    todosContainer.innerHTML = `<p>Add items to your list.</p>`;
    // clearTodosBtn.classList.add("hidden");
  } else {
    todoList.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.dataset.id = todo.id;
      todoItem.classList.add("todoListItem");
      todoItem.innerHTML = `
   
   <p class="todo-text">${todo.todoItem}</p>
   <div class="todoItemIcons">
   
   <i class="fa-solid fa-pen-to-square" data-action="edit"></i>   
   
   <i class="fa-solid fa-trash" data-action="delete"></i>
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
          displayAlert("alert-danger", "Deleted item from your list!");
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
  handleDisplayClearTodoListBtn();
}
