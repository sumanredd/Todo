let ulContainer = document.getElementById("ulContainer");
let todoUserInputElement = document.getElementById("todoUserInput");
let addButton = document.getElementById("addId");
let UniqueNo = -1;

function fromLocalStorage() {
  let StorageItems = localStorage.getItem("todolist");
  let parsedItem = JSON.parse(StorageItems);
  return parsedItem === null ? [] : parsedItem;
}

let todoList = fromLocalStorage();

function taskCompleteOrNotStatus(checkBoxId, labelId, liId) {
  let checkBoxElement = document.getElementById(checkBoxId);
  let labelElementStatus = document.getElementById(labelId);
  let checkedIndex = todoList.findIndex((each_item, index) => "liId" + index === liId);
  if (checkedIndex !== -1) {
    let todoObject = todoList[checkedIndex];
    todoObject.isChecked = checkBoxElement.checked;
    labelElementStatus.style.textDecoration = todoObject.isChecked ? "line-through" : "none";
    localStorage.setItem("todolist", JSON.stringify(todoList));
  }
}

function todoItemDelete(liID) {
  let TodoId = document.getElementById(liID);
  ulContainer.removeChild(TodoId);
  let deleteItemIndex = todoList.findIndex((each_Item, index) => liID === "liId" + index);
  if (deleteItemIndex !== -1) {
    todoList.splice(deleteItemIndex, 1);
    localStorage.setItem("todolist", JSON.stringify(todoList));
  }
}

function appendTodoItems(todo) {
  UniqueNo += 1;
  let checkBoxId = "checkBoxId" + UniqueNo;
  let labelId = "labelId" + UniqueNo;
  let liId = "liId" + UniqueNo;

  let liElement = document.createElement("li");
  liElement.classList.add("liStyle", "d-flex", "flex-row");
  liElement.id = liId;
  ulContainer.appendChild(liElement);

  let inputElement = document.createElement("input");
  inputElement.id = checkBoxId;
  inputElement.classList.add("checkboxStyle");
  inputElement.type = "checkbox";
  inputElement.checked = todo.isChecked;
  inputElement.onclick = function () {
    taskCompleteOrNotStatus(checkBoxId, labelId, liId);
  };
  liElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("labelContainerStyle", "d-flex", "flex-row");
  liElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.classList.add("labelStyle");
  labelElement.textContent = todo.text;
  labelElement.setAttribute("for", checkBoxId);
  labelElement.id = labelId;
  if (todo.isChecked) {
    labelElement.style.textDecoration = "line-through";
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function () {
    todoItemDelete(liId);
  };
  deleteIconContainer.appendChild(deleteIcon);
}

function onAddTodoItems() {
  let Value = todoUserInputElement.value;
  if (Value === "") {
    alert("Enter Valid Text");
    return;
  }
  let addTodoObject = {
    text: Value,
    isChecked: false,
  };
  todoList.push(addTodoObject);
  appendTodoItems(addTodoObject);
  localStorage.setItem("todolist", JSON.stringify(todoList));
  todoUserInputElement.value = "";
}

addButton.onclick = function () {
  onAddTodoItems();
};

todoUserInputElement.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    onAddTodoItems();
  }
});

for (let todo of todoList) {
  appendTodoItems(todo);
}
