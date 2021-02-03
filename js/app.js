/* *****variables***** */
const themeToggle = document.getElementById("theme-toggle");
const theme = document.querySelector("#theme-link");
const inputField = document.getElementById("input-field");
const todoContainer = document.getElementById("todo-container");
const itemsLeftContainer = document.getElementById("items-left-container");
const todosLeft = document.getElementById("todos-left");
const clearAllCompletedTodos = document.getElementById("clear-completed-todos");
const todoStatusContainer = document.getElementById("todo-status-container");
const showAllTodos = document.getElementById("show-all-todos");
const showActiveTodos = document.getElementById("show-active-todos");
const showCompletedTodos = document.getElementById("show-completed-todos");

/* *****on load***** */
countTodosLeft();
showAllTodos.classList.add("clicked");

/* *****functions***** */
// create todo item
function createTodoItem(input) {
  // create todo div element with class todo
  let todo = document.createElement("div");
  todo.className = "todo active";

  // add todo inner html
  todo.innerHTML = `
          <div class="checkbox">
            <i class="fas fa-check checkmark"></i>
          </div>
          <p class="todo-name">${input}</p>
          <i class="fal fa-times btn-delete-todo"></i>`;

  // append todo to todo container
  todoContainer.appendChild(todo);

  // make sure todo displays before the items-left container
  todoContainer.insertBefore(todo, itemsLeftContainer);

  // hide/show created todo item based on open category
  if (showCompletedTodos.classList.contains("clicked")) {
    showCompletedTodoItems();
  }

  // clean up input field
  inputField.value = "";

  // update number of todo items left
  countTodosLeft();
}

// count todos left
function countTodosLeft() {
  let itemsLeft = [...document.querySelectorAll(".active")].length;

  if (!itemsLeft) {
    todosLeft.innerText = "0 items left";
  } else if (itemsLeft === 1) {
    todosLeft.innerText = `1 item left`;
  } else {
    todosLeft.innerText = `${itemsLeft} items left`;
  }
}

// delete todo item
function deleteTodoItem(element) {
  element.remove();
}

// delete all completed todo items
function clearCompletedTodos() {
  let completedTodos = [...document.querySelectorAll(".completed")];

  completedTodos.forEach((completedTodo) => completedTodo.remove());
}

// Show only active todos
function showActiveTodoItems() {
  // reset
  showAllTodoItems();

  // hide completed todos
  [...document.querySelectorAll(".completed")].forEach(
    (todoItem) => (todoItem.style.display = "none")
  );
}

// Show only completed todos
function showCompletedTodoItems() {
  // reset
  showAllTodoItems();

  // hide active todos
  [...document.querySelectorAll(".active")].forEach(
    (todoItem) => (todoItem.style.display = "none")
  );
}

// Show all todos
function showAllTodoItems() {
  [...document.querySelectorAll(".todo")].forEach(
    (todoItem) => (todoItem.style.display = "flex")
  );
}

/* *****event listeners***** */
// Toggle between dark mode & light mode
themeToggle.addEventListener("click", () => {
  if (theme.getAttribute("href") === "./css/light-theme.css") {
    // change theme toggle icon to sun
    themeToggle.className = "fas fa-sun theme-toggle";
    // switch to dark mode
    theme.setAttribute("href", "./css/dark-theme.css");
  } else {
    // change theme toggle icon to moon
    themeToggle.className = "fas fa-moon theme-toggle";
    // switch to light mode
    theme.setAttribute("href", "./css/light-theme.css");
  }
});

// Add todo item when enter key is pressed
inputField.addEventListener("keyup", (e) => {
  if (e.code === "Enter" && inputField.value.length > 0) {
    createTodoItem(inputField.value);
  }
});

// mark todo item as complete or incomplete
todoContainer.addEventListener("click", (e) => {
  let targetEl = e.target;

  if (targetEl.tagName === "DIV" || targetEl.tagName === "I") {
    if (targetEl.tagName === "DIV" && targetEl.classList.contains("checkbox")) {
      switch (true) {
        case !targetEl.classList.contains("checked"):
          // add class checked to the checkbox
          targetEl.classList.add("checked");

          // remove class active from todo & add class completed
          targetEl.parentElement.classList.remove("active");
          targetEl.parentElement.classList.add("completed");

          //hide todo item if active todos category is selected
          if (showActiveTodos.classList.contains("clicked")) {
            showActiveTodoItems();
          }

          // update number of todo items left
          countTodosLeft();
          break;
        default:
          // remove class checked to the checkbox
          targetEl.classList.remove("checked");

          // add class active from todo & remove class completed
          targetEl.parentElement.classList.add("active");
          targetEl.parentElement.classList.remove("completed");

          //hide todo item if completed todos category is selected
          if (showCompletedTodos.classList.contains("clicked")) {
            showCompletedTodoItems();
          }

          // update number of todo items left
          countTodosLeft();
      }
    }

    if (
      targetEl.tagName === "I" &&
      targetEl.classList.contains("btn-delete-todo")
    ) {
      deleteTodoItem(targetEl.parentElement);
    }
  }
});

// clear all completed todo
clearAllCompletedTodos.addEventListener("click", clearCompletedTodos);

//display specific category of todo items
todoStatusContainer.addEventListener("click", (e) => {
  let targetEl = e.target;
  let controls = [...document.getElementById("todo-status-container").children];

  if (targetEl.tagName === "P") {
    //remove blue color from all controls
    controls.forEach((control) => control.classList.remove("clicked"));
    // add blue color to clicked control
    targetEl.classList.add("clicked");

    // display active todos only
    if (targetEl === showActiveTodos) {
      showActiveTodoItems();
    }

    // display completed todos only
    if (targetEl === showCompletedTodos) {
      showCompletedTodoItems();
    }

    // display all todos
    if (targetEl === showAllTodos) {
      showAllTodoItems();
    }
  }
});
