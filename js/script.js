const input = document.querySelector(".input");
const inputForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit-btn");
const todosContainer = document.querySelector(".todos-container");
let todoListItemsArray = [];
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
  if (todoItem !== "") {
    todoListItemsArray = [
      ...todoListItemsArray,
      { todoItem, id: crypto.randomUUID() },
    ];
  }
  clearTodoInputField();
  console.log(todoListItemsArray);
};
const displayTodoListItems = () => {
  const fragment = new DocumentFragment();
  todoListItemsArray.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todoListItem");
    todoItem.innerHTML = `
   <div>
   <p>${todo.todoItem}</p>
   </div>`;
    fragment.appendChild(todoItem);
  });
  todosContainer.innerHTML = "";
  todosContainer.appendChild(fragment);
};
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodoItemToList();
  displayTodoListItems();
});
submitBtn.addEventListener("click", () => {
  addTodoItemToList();
  displayTodoListItems();
});
