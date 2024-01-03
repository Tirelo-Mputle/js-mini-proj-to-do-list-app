import { store } from "../reduxStore.js";
import { addTodoItemToList, displayTodoListItems } from "./helperFunctions.js";
export const input = document.querySelector(".input");
const inputForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit-btn");
export const todosContainer = document.querySelector(".todos-container");
export const alert = document.querySelector(".alert");

displayTodoListItems();
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodoItemToList();
  displayTodoListItems();
});
submitBtn.addEventListener("click", () => {
  addTodoItemToList();
  displayTodoListItems();
});
