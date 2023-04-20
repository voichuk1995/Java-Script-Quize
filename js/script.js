import BD from "./bd.js";

// *******************************************************************
// *******************************************************************

const burgerMenu = document.querySelector("#burger__menu");
const menu = document.querySelector("#menu");
const menuLink = document.querySelectorAll(".menu__link");

burgerMenu.addEventListener("click", changeMenu);

menuLink.forEach((link) => {
    link.addEventListener("click", changeMenu);
});

function changeMenu() {
    burgerMenu.classList.toggle("open__burger-menu");
    menu.classList.toggle("display-none");
    document.body.classList.toggle("hiden");
}

// *******************************************************************
// *******************************************************************

const buttons = document.querySelectorAll(".js-button");
const mainFooter = document.querySelectorAll(".js-show");
const testingBlock = document.querySelector(".js-testing");
const headerImg = document.querySelector(".header__img");
const headerTitle = document.querySelector(".header__title");

buttons.forEach((item) => {
    item.addEventListener("click", () => {
        testingBlock.classList.toggle("display-none");
        testingBlock.classList.add("flex");

        mainFooter.forEach((item) => {
            item.classList.toggle("display-none");
        });

        headerImg.classList.remove("display-none");
        headerTitle.classList.remove("display-none");

        clearPage();
        showQuestion();
    });
});

// *******************************************************************
// *******************************************************************

function clearPage() {
    questionContainer.innerHTML = "";
    listContainer.innerHTML = "";

    submitBtn.classList.remove("active");
    submitBtn.removeEventListener("click", checkNextTemplate);
    flexList.classList.remove("flex-list");
    createImg.setAttribute("src", "");
    createImg.classList.add("display-none");
}

const questionContainer = document.querySelector("#question");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");
const flexList = document.querySelector(".testing__list");
const createImg = document.querySelector(".testing__img");

let indexBD = 0;
let progres = 9;

function showQuestion() {
    if (indexBD <= 3) {
        createTemplate();
    } else if (indexBD === 4 || indexBD === 5) {
        createTemplateIMG();
    } else if (indexBD === 6 || indexBD === 8) {
        createTemplate();
    } else if (indexBD === 7 || indexBD === 10) {
        createTemplateGALERY();
    } else if (indexBD === 9) {
        createTemplateMIX();
    }

    const radioButton = document.querySelectorAll(".answer-radio");
    const answerBox = document.querySelectorAll(".answer-box");
    const answerImgBox = document.querySelectorAll(".answer-img-box");
    const answerNumberBox = document.querySelectorAll(".answer-number-box");

    if (indexBD <= 3) {
        checkRadio(radioButton, answerBox);
    } else if (indexBD === 4 || indexBD === 5) {
        checkRadioIMG(radioButton, answerImgBox);
    } else if (indexBD === 6 || indexBD === 8) {
        checkRadio(radioButton, answerBox);
    } else if (indexBD === 7 || indexBD === 10) {
        checkRadioGALERY(radioButton, answerNumberBox);
    } else if (indexBD === 9) {
        checkRadioMIX(radioButton, answerBox);
    }

    nextWindow();
}

function createTemplate() {
    questionContainer.innerHTML = `<h2 class="title">${BD[indexBD].question}</h2>`;

    let answerNumber = 1;

    for (let answerText of BD[indexBD].answers) {
        const answersTemplate = `
                <li class="answer-box">
                    <label class="label">
                        <input value="${answerNumber}" type="radio" class="answer-radio" name="answer" />
                        <span class="custom-radio"></span>
                        <span class="answer-text">${answerText}</span>
                    </label>
                </li>`;

        listContainer.insertAdjacentHTML("beforeend", answersTemplate);

        answerNumber++;
    }

    renderProgresBar();
}

function createTemplateIMG() {
    questionContainer.innerHTML = `<h2 class="title">${BD[indexBD].question}</h2>`;

    let answerNumber = 1;

    flexList.classList.add("flex-list");

    for (let answerText of BD[indexBD].answers) {
        const answersTemplate = `
                <li class="answer-img-box" style="background-color: ${answerText}">
                    <label class="label">
                        <input value="${answerNumber}" type="radio" class="answer-radio flex-radio" name="answer" />
                    </label>
                </li>`;

        listContainer.insertAdjacentHTML("beforeend", answersTemplate);
        answerNumber++;
    }

    renderProgresBar();
}

function createTemplateGALERY() {
    questionContainer.innerHTML = `<h2 class="title">${BD[indexBD].question}</h2>`;

    createImg.classList.remove("display-none");
    createImg.setAttribute("src", `${BD[indexBD].img}`);

    flexList.classList.add("flex-list");

    let answerNumber = 1;

    for (let answerText of BD[indexBD].answers) {
        const answersTemplate = `
                <li class="answer-number-box">
                    <label class="label">
                        <input value="${answerNumber}" type="radio" class="answer-radio number-radio" name="answer" />
                        <span class="answer-number-text">${answerText}</span>
                    </label>
                </li>`;

        listContainer.insertAdjacentHTML("beforeend", answersTemplate);
        answerNumber++;
    }

    renderProgresBar();
}

function createTemplateMIX() {
    questionContainer.innerHTML = `<h2 class="title">${BD[indexBD].question}</h2>`;

    createImg.classList.remove("display-none");
    createImg.setAttribute("src", `${BD[indexBD].img}`);

    flexList.classList.add("flex-list");

    let answerNumber = 1;

    for (let answerText of BD[indexBD].answers) {
        const answersTemplate = `
        <li class="answer-box">
            <label class="label">
                <input value="${answerNumber}" type="radio" class="answer-radio" name="answer" />
                <span class="custom-radio"></span>
                <span class="answer-text">${answerText}</span>
            </label>
        </li>`;

        listContainer.insertAdjacentHTML("beforeend", answersTemplate);
        answerNumber++;
    }

    renderProgresBar();
}

function renderProgresBar() {
    const progresBas = document.querySelector(".testig__progres");

    let progresNew = `width: ${progres}%`;
    progres += 9;

    progresBas.setAttribute("style", progresNew);
}

function checkRadio(radioButton, answerBox) {
    radioButton.forEach((item) => {
        item.addEventListener("click", () => {
            answerBox.forEach((item) => {
                item.classList.remove("active-box");
            });

            let parentBox = item.parentNode.parentNode;

            parentBox.classList.add("active-box");

            submitBtn.classList.add("active");
            submitBtn.querySelector(".testing__button").classList.add("black");
        });
    });
}

function checkRadioIMG(radioButton, answerImgBox) {
    radioButton.forEach((item) => {
        item.addEventListener("click", () => {
            answerImgBox.forEach((item) => {
                item.classList.remove("active-img-box");
            });

            let parentBox = item.parentNode.parentNode;

            parentBox.classList.add("active-img-box");

            submitBtn.classList.add("active");
            submitBtn.querySelector(".testing__button").classList.add("black");
        });
    });
}

function checkRadioGALERY(radioButton, answerNumberBox) {
    radioButton.forEach((item) => {
        item.addEventListener("click", () => {
            answerNumberBox.forEach((item) => {
                item.classList.remove("active-number-box");
            });

            let parentBox = item.parentNode.parentNode;

            parentBox.classList.add("active-number-box");

            submitBtn.classList.add("active");
            submitBtn.querySelector(".testing__button").classList.add("black");
        });
    });
}

function checkRadioMIX(radioButton, answerBox) {
    radioButton.forEach((item) => {
        item.addEventListener("click", () => {
            answerBox.forEach((item) => {
                item.classList.remove("active-box");
            });

            let parentBox = item.parentNode.parentNode;

            parentBox.classList.add("active-box");

            submitBtn.classList.add("active");
            submitBtn.querySelector(".testing__button").classList.add("black");
        });
    });
}

function nextWindow() {
    submitBtn.addEventListener("click", checkNextTemplate);
}

function checkNextTemplate() {
    if (indexBD !== BD.length - 1) {
        indexBD++;
        clearPage();
        showQuestion();
    } else {
        clearPage();
        renderProgresBar();
        loader();
    }
}

function loader() {
    questionContainer.innerHTML = `<h2 class="title">Обработка результатов</h2>`;

    createImg.classList.remove("display-none");
    createImg.classList.add("animation-loader");
    createImg.setAttribute("src", "../img/loader.png");

    const answersTemplate = `<h2 class="title">
    Определение стиля мышления........................
    ..........................................</h2>`;

    listContainer.insertAdjacentHTML("beforeend", answersTemplate);
    submitBtn.classList.add("display-none");

    setTimeout(showResult, 2000);
}

function showResult() {
    clearPage();

    headerTitle.innerHTML = "Готово!";

    testingBlock.classList.add("result__center");

    const resultTemplate = `
        <h2 class="result__title">
            Ваш результат рассчитан:
        </h2>
        <span class="result__text">
            <span>Вы относитесь к 3%</span> респондентов, чей уровень интеллекта более чем на 
            15 пунктов отличается от среднего в большую или меньшую сторону!
        </span>
        <h3 class="result__subtitle">
            Скорее получите свой результат!
        </h3>
        <div class="result__subscribe">
            В целях защиты персональных 
            данных результат теста, их подробная интерпретация и рекомендации 
            доступны в виде голосового сообщения по звонку с вашего мобильного телефона
        </div>
        <span class="result__timer">
            Звоните скорее, запись доступна всего
            <span class="result__time">10:00</span>
            минут
        </span>
        <div class="result__call">
            <img class="result__call-tell" src="../img/call.png" alt="tel">
            <span class="result__call-text">
                Позвонить и прослушать результат
            </span>
        </div>`;

    testingBlock.innerHTML = resultTemplate;

    const timer = document.querySelector(".result__time");

    setInterval(counterTime, 1000, timer);

    const call = document.querySelector(".result__call");

    call.addEventListener("click", getDataFromFetch);
}

let time = 600;

function counterTime(timer) {
    let minutes = Math.floor(time / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer.innerHTML = `${minutes}:${seconds}`;

    time--;
}

const baseUrl = "https://swapi.dev/api/people/1/";

function getDataFromFetch() {
    fetch(baseUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            createFetchTRemplate(data);
        });
}

function createFetchTRemplate(data) {
    testingBlock.classList.add("height-unset");

    const dataTemplate = `
        <div class="fetch__box">
            <h3 class="fetch__key">name:<b class="fetch__value">${data.name}</b></h3>
            <h3 class="fetch__key">height:<b class="fetch__value">${data.height}</b></h3>
            <h3 class="fetch__key">mass:<b class="fetch__value">${data.mass}</b></h3>
            <h3 class="fetch__key">hair_color:<b class="fetch__value">${data.hair_color}</b></h3>
            <h3 class="fetch__key">skin_color:<b class="fetch__value">${data.skin_color}</b></h3>
            <h3 class="fetch__key">eye_color:<b class="fetch__value">${data.eye_color}</b></h3>
            <h3 class="fetch__key">birth_year:<b class="fetch__value">${data.birth_year}</b></h3>
            <h3 class="fetch__key">gender:<b class="fetch__value">${data.gender}</b></h3>  
        </div>   
    `;

    testingBlock.insertAdjacentHTML("beforeend", dataTemplate);
}

// *******************************************************************
// *******************************************************************
