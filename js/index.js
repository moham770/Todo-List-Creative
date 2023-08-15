// todo ===========================================================> HTML variables
let addbtn = document.getElementById("newTask");
let modal = document.getElementById("modal");
let status = document.getElementById("status");
let category = document.getElementById("category");
let description = document.getElementById("description");
let title = document.getElementById("title");
let addTaskBtnt = document.getElementById("addBtn");
let UpdateTaskBtnt = document.getElementById("UpdateBtn");
let mode = document.getElementById("mode");
let gridBtn = document.getElementById("gridBtn");
let root = document.querySelector(":root");
let section = document.querySelectorAll("section");
let barsBtn = document.getElementById("barsBtn");
let searchInput = document.getElementById("searchInput");
let nextUpCountElement = document.getElementById("nextUpCount");
let inProgressCountElement = document.getElementById("inProgressCount");
let doneCountEmelent = document.getElementById("doneCount");
let cancelAlert = document.getElementById("cancelAlert");
let alertContainer = document.querySelector(".alert-container");

let container = {
  nextUp: document.getElementById("toDo"),
  inProgress: document.getElementById("inProgress"),
  done: document.getElementById("done"),
};

// todo ===============================================================> app variables
let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
let updateIndex = 0;

for (let i = 0; i < tasksArray.length; i++) {
  displayTasks(i);
}

let titleRegex = /^[a-z]{3,8}$/;
let descriptionRegex = /^[a-z]{3,8}$/;
// todo ==================================================================> functions
function showModal() {
  modal.classList.replace("d-none", "d-flex");
  document.body.style.overflow = "hidden";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
function hideModal() {
  modal.classList.replace("d-flex", "d-none");
  clearValuesFromInput();
  document.body.style.overflow = "visible";
}
function addTask() {
  if (
    valaidation(titleRegex, title) == true &&
    valaidation(descriptionRegex, description) == true
  ) {
    let tast = {
      status: status.value,
      category: category.value,
      title: title.value,
      description: description.value,
    };
    tasksArray.push(tast);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    displayTasks(tasksArray.length - 1);
    hideModal();
    clearValuesFromInput();
    title.classList.remove("is-valid");
    description.classList.remove("is-valid");
  } else {
    alertContainer.classList.remove("d-none");
  }
}

function displayTasks(index) {
  let taskHtml = `
    <div class="task">
      <h3 class="text-capitalize">${tasksArray[index].title}</h3>
      <p class="description text-capitalize">${tasksArray[index].description}</p>
      <h4 class="category ${tasksArray[index].category} text-capitalize">${tasksArray[index].category}</h4>
      <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
        <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${index})"></i></li>
        <li><i class="bi bi-trash-fill" onclick="deleteTask(${index})"></i></li>
        <li><i class="bi bi-palette-fill" onclick="generateColor(event)"></i></li>
      </ul>
    </div>
  `;
  container[tasksArray[index].status].innerHTML += taskHtml;
  updateTaskCounts();
}

function updateTaskCounts() {
  let nextUpCount = tasksArray.filter(
    (task) => task.status === "nextUp"
  ).length;
  let inProgressCount = tasksArray.filter(
    (task) => task.status === "inProgress"
  ).length;
  let doneCount = tasksArray.filter((task) => task.status === "done").length;
  nextUpCountElement.innerHTML = nextUpCount;
  inProgressCountElement.innerHTML = inProgressCount;
  doneCountEmelent.innerHTML = doneCount;
}
function generateColor(e) {
  let charColor = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  let color = "#";
  for (let i = 0; i < 6; i++) {
    let random = Math.trunc(Math.random() * charColor.length);
    color += charColor[random];
  }

  e.target.closest(".task").style.backgroundColor = color + "22";
}

function deleteTask(index) {
  emptyContainers();
  tasksArray.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  for (let i = 0; i < tasksArray.length; i++) {
    displayTasks(i);
  }
  updateTaskCounts();
}

function getTaskInfo(index) {
  showModal();
  status.value = tasksArray[index].status;
  category.value = tasksArray[index].category;
  title.value = tasksArray[index].title;
  description.value = tasksArray[index].description;
  addTaskBtnt.classList.add("d-none");
  UpdateTaskBtnt.classList.remove("d-none");
  updateIndex = index;
}

function updateTask() {
  tasksArray[updateIndex].status = status.value;
  tasksArray[updateIndex].category = category.value;
  tasksArray[updateIndex].title = title.value;
  tasksArray[updateIndex].description = description.value;
  hideModal();
  emptyContainers();
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  for (let i = 0; i < tasksArray.length; i++) {
    displayTasks(i);
  }
  addTaskBtnt.classList.remove("d-none");
  UpdateTaskBtnt.classList.add("d-none");
  clearValuesFromInput();
}

function emptyContainers() {
  for (item in container) {
    container[item].innerHTML = "";
  }
}
function clearValuesFromInput() {
  status.value = "nextUp";
  category.value = "education";
  title.value = "";
  description.value = "";
}

function changeColor() {
  if (mode.classList.contains("bi-brightness-high-fill")) {
    root.style.setProperty("--main-black", "#f1f1f1");
    root.style.setProperty("--sec-black", "#ddd");
    root.style.setProperty("--text-color", "#222");
    root.style.setProperty("--gray-color", "#333");
    root.style.setProperty("--mid-gray", "#f1f1f1");
    mode.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
  } else {
    mode.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
    root.style.setProperty("--main-black", "#0d1117");
    root.style.setProperty("--sec-black", "#161b22");
    root.style.setProperty("--text-color", "#a5a6a7");
    root.style.setProperty("--gray-color", "#dadada");
    root.style.setProperty("--mid-gray", "#474a4e");
  }
}

function changeDisplayToRow() {
  for (let sec of section) {
    sec.classList.remove("col-md-6");
    sec.classList.remove("col-lg-4");
  }
  container["nextUp"].setAttribute("data-view", "bars");
  container["inProgress"].setAttribute("data-view", "bars");
  container["done"].setAttribute("data-view", "bars");
  container["done"].setAttribute("data-view", "bars");
  barsBtn.classList.add("active");
  gridBtn.classList.remove("active");
}
function changeDisplayToCol() {
  for (let sec of section) {
    sec.classList.add("col-md-6");
    sec.classList.add("col-lg-4");
  }
  container["nextUp"].removeAttribute("data-view", "bars");
  container["inProgress"].removeAttribute("data-view", "bars");
  container["done"].removeAttribute("data-view", "bars");
  gridBtn.classList.add("active");
  barsBtn.classList.remove("active");
}

function searchTask() {
  resetTasksContainer();
  let searchKey = searchInput.value;
  for (let i = 0; i < tasksArray.length; i++) {
    if (
      tasksArray[i].title.toLowerCase().includes(searchKey.toLowerCase()) ||
      tasksArray[i].category.toLowerCase().includes(searchKey.toLowerCase())
    ) {
      displayTasks(i);
    }
  }
}
function resetTasksContainer() {
  container.nextUp.innerHTML = "";
  container.inProgress.innerHTML = "";
  container.done.innerHTML = "";
}

function valaidation(regex, element) {
  if (regex.test(element.value)) {
    element.parentElement.nextElementSibling.classList.add("d-none");

    return true;
  } else {
    element.parentElement.nextElementSibling.classList.remove("d-none");

    return false;
  }
}

// todo =======================================================================================> Events
addbtn.addEventListener("click", showModal);

// ! [1] Hide Modal using Escape
document.addEventListener("keydown", (e) => {
  e.key === "Escape" ? hideModal() : null;
});
// ! [2] Hide Modal using clicked outside modal
modal.addEventListener("click", (e) => {
  e.target.id === "modal" ? hideModal() : null;
});
// ! add task
addTaskBtnt.addEventListener("click", addTask);
// ! update task
UpdateTaskBtnt.addEventListener("click", updateTask);
// ! random color
mode.addEventListener("click", changeColor);
// !change Display To Row
barsBtn.addEventListener("click", changeDisplayToRow);
// !change Display To coloum
gridBtn.addEventListener("click", changeDisplayToCol);

searchInput.addEventListener("input", searchTask);

title.addEventListener("input", () => {
  if (valaidation(titleRegex, title) == true) {
    title.classList.add("is-valid");
    title.classList.remove("is-invalid");
    document.querySelector(".alertTitle").classList.add("d-none");
  } else {
    title.classList.add("is-invalid");
    title.classList.remove("is-valid");
    document.querySelector(".alertTitle").classList.remove("d-none");
  }
});

description.addEventListener("input", () => {
  if (valaidation(descriptionRegex, description) == true) {
    description.classList.add("is-valid");
    description.classList.remove("is-invalid");
    document.querySelector(".alertDescription").classList.add("d-none");
  } else {
    description.classList.add("is-invalid");
    description.classList.remove("is-valid");
    document.querySelector(".alertDescription").classList.remove("d-none");
  }
});
