document.addEventListener("DOMContentLoaded", () => {
  addEventListenersMethod();
  makeForm();
  getCall();
});

const url = "http://localhost:3000/monsters";
let pageNumber = 1;
const limit = 50;

function addEventListenersMethod() {
  document
    .getElementById("back")
    .addEventListener("click", decrementPageNumber);
  document
    .getElementById("forward")
    .addEventListener("click", incrementPageNumber);
}

function makeForm() {
  const monsterDiv = document.getElementById("create-monster");

  const monsterForm = document.createElement("form");
  monsterForm.addEventListener("submit", function() {
    postAMonster(event);
  });

  const br = document.createElement("br");

  const hr = document.createElement("hr");

  const createMonsterBtn = document.createElement("button");
  createMonsterBtn.innerText = "Create Monster";

  const nameInput = document.createElement("input");
  nameInput.id = "name-input";

  const nameInputLabel = document.createElement("label");
  nameInputLabel.setAttribute("for", nameInput.id);
  nameInputLabel.innerHTML = "Name:";

  const ageInput = document.createElement("input");
  ageInput.id = "age-input";

  const ageInputLabel = document.createElement("label");
  ageInputLabel.setAttribute("for", ageInput.id);
  ageInputLabel.innerHTML = "Age:";

  const descriptionInput = document.createElement("input");
  descriptionInput.id = "description-input";

  const descriptionInputLabel = document.createElement("label");
  descriptionInputLabel.setAttribute("for", descriptionInput.id);
  descriptionInputLabel.innerHTML = "Description:";

  monsterForm.appendChild(nameInputLabel);
  monsterForm.appendChild(nameInput);
  monsterForm.appendChild(br);
  monsterForm.appendChild(ageInputLabel);
  monsterForm.appendChild(ageInput);
  monsterForm.appendChild(br);
  monsterForm.appendChild(descriptionInputLabel);
  monsterForm.appendChild(descriptionInput);
  monsterForm.appendChild(br);
  monsterForm.appendChild(createMonsterBtn);

  monsterDiv.appendChild(monsterForm);
  monsterForm.appendChild(hr);
}

function decrementPageNumber() {
  pageNumber--;
  getCall();
}

function incrementPageNumber() {
  pageNumber++;
  getCall();
}

function getCall() {
  fetch(`${url}/?_limit=${limit}&_page=${pageNumber}`)
    .then(res => res.json())
    .then(res => viewOnePageOfMonsters(res))
    .catch(err => console.log(err));
}

function viewOnePageOfMonsters(data) {
  document.getElementById("monsters-list").innerText = "";
  data.forEach(datum => add1Monster(datum));
}

function add1Monster(monster) {
  const monsterList = document.getElementById("monsters-list");
  const monsterLi = document.createElement("li");

  const pId = document.createElement("p");
  pId.innerText = `Id: ${monster.id}`;

  const pName = document.createElement("p");
  pName.innerText = `Name: ${monster.name}`;

  const pAge = document.createElement("p");
  pAge.innerText = `Age: ${monster.age}`;

  const pDescription = document.createElement("p");
  pDescription.innerText = `Description: ${monster.description}`;

  const hr = document.createElement("hr");

  monsterLi.appendChild(pId);
  monsterLi.appendChild(pName);
  monsterLi.appendChild(pDescription);
  monsterLi.appendChild(pAge);
  monsterLi.appendChild(hr);

  monsterList.appendChild(monsterLi);
}

function postAMonster(event) {
  event.preventDefault();
  const namePost = document.getElementById("name-input").value;
  const agePost = document.getElementById("age-input").value;
  const descriptionPost = document.getElementById("description-input").value;

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: namePost,
      age: agePost,
      description: descriptionPost
    })
  })
    .then(res => res.json())
    .then(res => add1Monster(res))
    .then(clearForm())
    .catch(err => console.log(err));
}

function clearForm() {
  document.getElementById("name-input").value = "";
  document.getElementById("age-input").value = "";
  document.getElementById("description-input").value = "";
}
