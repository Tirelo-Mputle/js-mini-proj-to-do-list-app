const input = document.querySelector(".input");
const inputForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit-btn");
const todosContainer = document.querySelector(".todos-container");
const alert = document.querySelector(".alert");
// app state
const state = {
  todoListItemsArray: [{ todoItem: "ham", id: 5 }],
};
let todoListItemsArray = [{ todoItem: "ham", id: 5 }];
let isAlertVisible = false;
let isEditing = false;
/**
 * Clears the to do input field after the user adds the to do to the list of to dos
 */
const clearTodoInputField = () => {
  input.value = "";
};
const displayAlert = () => {
  isAlertVisible = true;
  if (isAlertVisible) {
    alert.classList.add("alert-success", "show-alert");
    alert.textContent = `Successfully added to do to list!`;
    setTimeout(() => {
      isAlertVisible = false;
      alert.classList.remove("alert-success", "show-alert");
    }, 3000);
    //cleartimeout
  }
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
    displayAlert();
  }
  clearTodoInputField();
};
/**
 * Displays to do when they are added to the to dos list.
 */
const displayTodoListItems = () => {
  const fragment = new DocumentFragment();
  todoListItemsArray.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todoListItem");
    todoItem.innerHTML = `
   
   <p>${todo.todoItem}</p>
   <div class="todoItemIcons">
   <button data-action="edit">Edit</button>
   <button data-action="delete">Delete</button>
   </div>
   `;
    todoItem.addEventListener("click", (e) => {
      
      const actionType = e.target.dataset.action;
      if(actionType ==="edit"){
        console.log("EDITTING")
      }
      if(actionType ==="delete"){
        console.log("DELETING")
      }
    });
    //    <i class="fa-solid fa-trash"></i>
    //   <i class="fa-solid fa-pen-to-square"></i>
    fragment.appendChild(todoItem);
  });
  todosContainer.innerHTML = "";
  todosContainer.appendChild(fragment);
};
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
