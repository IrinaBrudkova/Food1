/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // calculator

    const result = document.querySelector(".calculating__result span"); // поле с результатом подсчета(обращаемся к классу и внутри него span)

    let sex, height, weigth, age, ratio; // объявляем переменные нижней плашки

    // проверка: если в local storage уже находятся данные, то их мы помещаем в переменную sex
    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", "female"); // устанавливаем значение по умолчанию, записываем в local storage("ключ", "занчение")
    }

    // помещаем значение из local storage в переменную ratio
    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375); // устанавливаем значение по умолчанию, записываем в local storage
    }

    // функция, которая инициализирует введенные данные от пользователя в калькулятор
    // записывает их в ls и переключает класс активности
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector); //плашки в полями

        elements.forEach((elem) => {
            elem.classList.remove(activeClass); // для каждой снимаем класс активности, если он есть

            // если атрибут значения элемента === значению из ls
            if (elem.getAttribute("id") === localStorage.getItem("sex")) {
                elem.classList.add(activeClass); // назначаем класс активности
            }

            // если значение атрибута совпадает со значением в ls
            if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings("#gender div", "calculating__choose-item_active"); // вызываем функцию для верхней плашки
    initLocalSettings(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    ); // вызываем для нижней плашки

    // вычисляет количество каллорий по формуле(конечный результат)
    function calcTotal() {
        if (!sex || !height || !weigth || !age || !ratio) {
            result.textContent = "____";
            return; // чтобы досрочно прервать функцию
        } // если какое-либо значение в инпут не будет введено, вычисления не произведутся
        // в переменных в if попадают числа. Если это не число, а строка, результат - false
        if (sex === "female") {
            result.textContent = Math.round(
                (447.6 + 9.2 * weigth + 3.1 * height - 4.3 * age) * ratio
            ); // вычисляем результат по формуле, округляем значение до ближайшего целого
        } else {
            result.textContent = Math.round(
                (88.36 + 13.4 * weigth + 4.8 * height - 5.7 * age) * ratio
            ); // суточная норма каллорий для мужчины
        }
    }

    calcTotal();

    // получать статическую информацию
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector); // selector - это верхнее или нижнее поле, передается в качестве аргумента функции
        // если элемент, на который кликнули имеет data-атрибут, это будет одна из нижних плашек (ratio)
        // если data-атрибута нет, то работает условие else, поллучаем пол (значение id из верстки).
        elements.forEach((elem) => {
            elem.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio"); // записываем значение "data-ratio"в переменную ratio
                    localStorage.setItem("ratio", +e.target.getAttribute("data-ratio")); // устанавливаем в local storage значение ratio
                } else {
                    sex = e.target.getAttribute("id"); // получаем значение id
                    localStorage.setItem("sex", e.target.getAttribute("id")); // помещаем значение в local storage
                }
                //добавляем или убираем класс активности (зеленый)
                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation("#gender div", "calculating__choose-item_active"); // применяем для верхней плашки и добавляем класс активности
    getStaticInformation(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    ); // для нижней плашки и добавляем класс активности

    // получаем инпуты
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            // если в поле ввода находится нечисло, рамка подсвечивается красной обводкой
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            // если инпут совпадает с каким-либо id, записываем его в соответствующую переменную
            switch (input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weigth = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation("#height"); // вызываем для каждого id в полях инпута
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    class CardMenu {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src; // картинка
            this.alt = alt;
            this.title = title; // название карточки
            this.descr = descr; // описание карточки
            this.price = price;
            this.classes = classes || ["menu__item"]; // массив, из возможных элементов
            this.parent = document.querySelector(parentSelector); // DOM элемент
            this.rate = 80;
            this.convertToRub();
        }

        convertToRub() {
            this.price = this.price * this.rate;
        }

        // динамически сформировать структуру карточки
        render() {
            const element = document.createElement("div"); // создаем div

            // если ни один элемент не передан в rest-оператор
            if (this.classes.length == 0) {
                this.element = "menu__item"; // дефолтный класс
                element.classList.add(this.element); // добавляем класс ". menu___item"
            } else {
                this.classes.forEach((className) => element.classList.add(className));
            }

            // добавляем верстку в div
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                <div>
            `;
            this.parent.append(element); // добавляем div на страницу
        }
    }

    // используем метод "на месте", не добавляя его в переменную, вызываем функцию
    new CardMenu(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new CardMenu(
        "img/tabs/elite.jpg",
        "elite",
        "Меню “Премиум”",
        " В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        12,
        ".menu .container"
    ).render();

    new CardMenu(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        "  Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        8,
        ".menu .container"
    ).render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms(formSelector, modalTimerId) {
    // Forms
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так...",
    };

    forms.forEach((item) => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                 `;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            fetch("server.php", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify(object),
                })
                .then((data) => data.text())
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const previosModalDialog = document.querySelector(".modal__dialog");

        previosModalDialog.classList.add("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
                        <div class = "modal__content">
                        <div data-close class="modal__close">&times;</div>
                        <div class="modal__title">${message}</div>
                        </div>
                    `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previosModalDialog.classList.add("show");
            previosModalDialog.classList.remove("hide");
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
        }, 4000);
    }

    fetch("http://localhost:3000/menu")
        .then((data) => data.json())
        .then((res) => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
// закрытие модального окна описывает сам процесс, обработчик события клика будет дальше
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("hide");
    modal.classList.remove("show");
    // добавляем стиль overflow для всего body, чтобы страница не прокручивалась, когда открыто модальное окно
    document.body.style.overflow = "";
}

//открытие модального окна также только октрытие путем добавленияф/удаления классов
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector), // кнопки
        modal = document.querySelector(modalSelector); // само модальное окно

    //приеняем функцию открытия окна к каждой кнопке на странице
    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
    });

    // если кликнуть на подложку в любом месте, модальное окно закрывается
    // если e.target будет совпадать с modal, окно закрывается
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal(modalSelector);
        }
    });

    //событие keydown срабатывает тогдаа, когда нажимается кнопка на клавиатуре
    //code - св-во отслеживает код клавиши.
    //если срабатывает клавиша esc и модальное окно открыто, срабатывает условия
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    //открытие модального окна, когда пользователь долистал до конца страницы
    //scrollHeight - полная высота видимой части страницы
    //pageYOffset - отслеживает, сколько px отлистал ппользователь до конца страницы
    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal(modalSelector, modalTimerId);
            //убираем обработчик события, внутрь помещаем ссылку на функцию и событие, которое нужно удалить
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    //вызвать функцию открытия окна по событию scroll
    window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    // slider

    const slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width; // здесь будет число (значение ширины картинки из верстки)

    let slideIndex = 1, // слайды, картинки
        offset = 0; // числовое значение над картинками

    // инициализация обозначения слайдов: если число однозначное, добавляем вначало 0.

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + "%"; // делаем так, чтобы все вместе картинки занимали 100% ширины
    slidesField.style.display = "flex"; // располагаем горизонтально
    slidesField.style.transition = "0.5s all"; // плавный переход
    slidesWrapper.style.overflow = "hidden"; // в "обертке" скрываем те слайды, которые не должны быть в поле видимости

    slides.forEach((slide) => {
        slide.style.width = width; // для каждого слайда устанавливаем ширину картинки равную переменной width;
    });

    // создаем точки под слайдером:
    slider.style.position = "relative"; // устанавливаем блоку слайдера position: relative. А точкам установим абсолютное позиционирование относительно слайдера.

    const indicators = document.createElement("ol"), // создали список ol
        dots = []; // массив с точками
    indicators.classList.add("carousel-indicators"); // присвоили списку точек класс

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // присвоили классу свойства css
    slider.append(indicators); // добавили в блок slider

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li"); // динамически в цикле создаем список точек
        dot.setAttribute("data-slide-to", i + 1); //присваиваем им data-атрибуты
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        //на первой итерации выделяем первую точку
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot); // добавляем точку в массив dots
    }

    //техническая функция, удаляет все не числа в выражении, оставляя только значение.
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, "");
    }

    // визуально выделяем нужную точку;
    function selectDot(arr) {
        arr.forEach((dot) => (dot.style.opacity = ".5"));
        arr[slideIndex - 1].style.opacity = 1;
    }
    // обозначение слайдов: если число однозначное, добавляем вначало 0.
    function numbersOfSlides() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    // навешиваем события на стрелки "вперед" и "назад".
    next.addEventListener("click", () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0; // если слайдер дошел до конца, значение offset возвращается в начало
        } else {
            offset += deleteNotDigits(width); //иначе,  offset = ширина слайда 1 картинки
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // перемещение картинок по оси х на ширину слайда.
        // проверяем значение slideIndex.Если дошли до конца слайдера, значение возвращается в 1, на первую картинку.
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        numbersOfSlides();
        selectDot(dots);
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        numbersOfSlides();
        selectDot(dots);
    });

    // добавляем функционал точкам
    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to"); // получаем атрибут каждой точки

            slideIndex = slideTo; //значение slideIndex становится равным номеру атрибута
            offset = deleteNotDigits(width) * (slideTo - 1); // offset = ширина слайда(500) * очередной номер атрибута
            slidesField.style.transform = `translateX(-${offset}px)`;

            numbersOfSlides();
            selectDot(dots);
        });
    });

    // вариант 1

    // showSlides(slideIndex);
    // проверяем, если число слайдов однозначное, добавляем 0 вначало.
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }
    // функция показа слайдов.
    // 1.проверяет, если слайдер дошел до конца, возвращает значение slideIndex в 1.
    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }
    // 2. скрыть все слайды
    //     slides.forEach((item) => (item.style.display = "none"));

    // 3. показать текущий слайд (значение slideIndex)

    //     slides[slideIndex - 1].style.display = "block";

    // обновление счетчика
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }
    // "перелистывание"
    // function plussSlides(n) {
    //     showSlides((slideIndex += n));
    // }
    // обработчики событий на стрелки "вправо" "влево"
    // prev.addEventListener("click", () => {
    //     plussSlides(-1);
    // });

    // next.addEventListener("click", () => {
    //     plussSlides(1);
    // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    // Tabs

    let tabs = document.querySelectorAll(".tabheader__item"), // влкладки-названия
        tabsContent = document.querySelectorAll(".tabcontent"), // контент-блоки
        tabsParent = document.querySelector(".tabheader__items"); // поле родителя с вкладками

    // создаем функцию, которая будет скрывать все табы
    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }
    hideTabContent();

    // функция, которая будет показывать табы
    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active"); // добавляем класс активности
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    //timer

    const deadLine = "2022-06-30"; // может приходить из разных источников

    function getTimeRemaning(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //таймстамп оставшегося времени, t = разница между датами в количестве миллисекунд
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // математически переводим в колиичество дней(вссего млс/(млс в минуте * млсек в часе* млсек в дне)
            hours = Math.floor((t / (1000 * 60 * 60)) % 24), // получаем хвостик от целых суток
            minutes = Math.floor((t / (1000 * 60)) % 60), // получаем хвостик от  часа
            seconds = Math.floor((t / 1000) % 60);

        // возвращаем объект
        return {
            days,
            hours,
            minutes,
            seconds,
        };
    }

    // подставляем 0 перед однозначными числами
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // функция, которая устанавливает таймер на страницу,принимает в себя селектор(timer) из верстки, второй - дедлайн
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000); // чтобы таймер запускался каждую секунду

        updateClock(); // чтобы таймер запускался ссразу, а не через секунду.

        // обновление часов
        function updateClock() {
            const t = getTimeRemaning(endtime); // вернет объект с данными

            // поместить расчетные величины на страницу
            days.innerHTML = getZero(t.days); // получаем из объекта ключ days
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            //условие для остановки таймера (если время рано или меньше планируемой даты, очищаем таймер)
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











//Событие DOMContentLoaded происходит когда весь HTML был полностью загружен, не дожидаясь окончания загрузки таблиц стилей, изображений и фреймов.
window.addEventListener("DOMContentLoaded", function() {
    const modalTimerId = setTimeout(
        () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalTimerId),
        300000
    );
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form", modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map