var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  checkBox.type = "checkBox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var displayTask = function () {
  axios.get("http://localhost:3000/").then((res) =>
    res.data.forEach((todo) => {
      console.log(todo._id);
      const listItem = createNewTaskElement(todo.item);
      listItem.setAttribute("id", todo._id);
      incompleteTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskCompleted);
    })
  );
};
displayTask();

var addTask = function () {
  console.log("Add Task...");
  axios
    .post("http://localhost:3000/", { item: taskInput.value })
    .then((res) => console.log(res));

  var listItem = createNewTaskElement(taskInput.value);

  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

var editTask = function () {
  console.log("Edit Task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    axios.put("http://localhost:3000/", {
      item: editInput.value,
      id: listItem.id,
    });
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
};

var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  axios
    .delete("http://localhost:3000/", {
      data: { id: listItem.id },
    })
    .then((res) => console.log(res));
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

var taskCompleted = function () {
  console.log("Task Complete...");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//Mark a task as incomplete
var taskIncomplete = function () {
  console.log("Task Incomplete...");
  //When the checkbox is unchecked appendTo #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind List item events");
  // select listitems chidlren
  var checkBox = taskListItem.querySelector('input[type="checkbox"]');
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
