const randomImg = document.querySelector(".randomImgBox");
const clock = document.querySelector(".clockBox");
const userLS = document.querySelector(".userLSBox");
const LS_form = userLS.querySelector("form");
const LS_input = userLS.querySelector("input");
const todo = document.querySelector(".todoBox");
const todo_form = todo.querySelector("form");
const todo_input = todo.querySelector("form input");
const weather = document.querySelector(".weatherBox");
const USER_KEY = "username";
const API_KEY = "351a74d096edeb3a9b0cc077aa42a168";

//clock
const clockSpan = document.createElement("h3");
clock.appendChild(clockSpan);

function doClock() {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const mins = date.getMinutes();
  const sec = date.getSeconds();
  clockSpan.innerText = `${month}월 ${day}일 ${hours}시 ${mins}분 ${sec}초`;
}
setInterval(doClock, 1000);

function saveLS(user) {
  localStorage.setItem(USER_KEY, user);
  paintName(user);
}

function paintName(user) {
  const textName = JSON.parse(user);
  const leng = LS_form.childNodes.length;
  console.log(leng);
  if (leng < 4) {
    const LS_div = document.createElement("div");
    LS_div.innerHTML = `Welcome ${textName} !!!`;
    LS_div.classList.add("LS_showing");
    LS_form.appendChild(LS_div);
  } else {
    LS_form.removeChild(LS_form.childNodes[3]);
    const LS_secondDiv = document.createElement("div");
    LS_secondDiv.innerHTML = `Welcome ${textName} !!!`;
    LS_secondDiv.classList.add("LS_showing");
    LS_form.appendChild(LS_secondDiv);
  }
}

function loadLS(user) {
  const currentValue = localStorage.getItem(USER_KEY);
  saveLS(user);
}

function handleLSForm(e) {
  e.preventDefault();
  const submittedName = LS_input.value;
  const parsedName = JSON.stringify(submittedName);
  console.dir(parsedName);
  loadLS(parsedName);
  LS_input.value = "";
}

const deleteToDo = (e) => {
  const targetText = e.target.parentNode;
  console.dir(targetText);
  targetText.parentNode.removeChild(targetText);
};

const doneToDo = (e) => {
  console.dir(e.target);
  const todo_h3 = e.target.parentNode;
  todo_h3.classList.add("todo_done");
};

function paintToDo(TODO) {
  const del = "×";
  const done = "√";
  const delBtn = document.createElement("button");
  delBtn.innerHTML = del;
  const doneBtn = document.createElement("button");
  doneBtn.innerHTML = done;
  const toDoText = document.createElement("h3");
  toDoText.innerHTML = JSON.parse(TODO);
  toDoText.appendChild(delBtn);
  toDoText.appendChild(doneBtn);
  todo.appendChild(toDoText);
  //
  delBtn.addEventListener("click", deleteToDo);
  doneBtn.addEventListener("click", doneToDo);
}

function handleToDoForm(e) {
  e.preventDefault();
  const submittedToDos = todo_input.value;
  const parsedToDos = JSON.stringify(submittedToDos);
  paintToDo(parsedToDos);
  todo_input.value = "";
}

function paintWeather(temp, city) {
  const weather_span = document.createElement("h2");
  weather_span.innerHTML = ` 온도 : ${temp} / 도시 : ${city}`;
  weather.appendChild(weather_span);
}

const success = async (e) => {
  const lat = e.coords.latitude;
  const long = e.coords.longitude;
  const API_info = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
  ).then(function (res) {
    return res.json();
  });
  const temp = API_info.main.temp;
  const city = API_info.name;
  paintWeather(temp, city);
  console.dir(API_info);
};

function error(err) {
  console.log(err);
}

function option(e) {
  console.log(e);
}
//
const body = document.querySelector("body");

const IMG_NUMBER = 7;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.png`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}
//
function init() {
  LS_form.addEventListener("submit", handleLSForm);
  todo_form.addEventListener("submit", handleToDoForm);
  window.navigator.geolocation.getCurrentPosition(success, error, option);
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
