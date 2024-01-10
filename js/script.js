// IMPORTS
import { store } from "../reduxStore.js";
import { addTodoItemToList, displayTodoListItems } from "./helperFunctions.js";
// SELECTED ITEM
const inputForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit-btn");
export const input = document.querySelector(".input");
export const todosContainer = document.querySelector(".todos-container");
export const alert = document.querySelector(".alert");
export const clearTodosBtn = document.querySelector("clear-todos-button");
// EVENT LISTENERS
window.addEventListener("DOMContentLoaded", displayTodoListItems);

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodoItemToList();
  displayTodoListItems();
});
submitBtn.addEventListener("click", () => {
  addTodoItemToList();
  displayTodoListItems();
});
