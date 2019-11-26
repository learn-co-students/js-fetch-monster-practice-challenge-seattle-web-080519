document.addEventListener("DOMContentLoaded", () => {
  getCall();
});

function getCall() {
  fetch("http://localhost:3000/monsters")
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
