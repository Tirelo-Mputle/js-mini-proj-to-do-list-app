const input = document.querySelector(".input");
const inputForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit-btn");
let todosArray = [];
/**
 * Clears the to do input field after the user adds the to do to the list of to dos
 */
const clearTodoInputField = () => {
  input.value = "";
};
/**
 * Adds input to do value in the list of to dos to be displayed.
 */
const addTodoItemToList = () => {
  const todoItem = input.value;
  todosArray = [...todosArray, { todoItem, id: crypto.randomUUID() }];
  clearTodoInputField()
  console.log(todosArray);
};

input.addEventListener("input", (e) => {
  e.preventDefault();
});
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodoItemToList();
});
submitBtn.addEventListener("click", addTodoItemToList);
