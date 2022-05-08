"use strict";
window.addEventListener("DOMContentLoaded", function() {
    // tabs

    const tabContent = document.querySelectorAll(".tabcontent"),
        tabParent = document.querySelector(".tabheader__items"),
        tabs = document.querySelectorAll(".tabheader__item");

    function hideTabContent() {
        tabContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add("show", "fade");
        tabContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    tabParent.addEventListener("click", (event) => {
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

    hideTabContent();
    showTabContent();

    //timer

    const deadLine = "2022-06-30";

    function getTimeRemaning(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadLine);

    // modal

    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        modalTimerId = setTimeout(openModal, 5000);

    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    // используем классы для карточек

    class CardMenu {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes || ["menu__item"];
            this.parent = document.querySelector(parentSelector);
            this.rate = 80;
            this.convertToRub();
        }

        convertToRub() {
            this.price = this.price * this.rate;
        }

        render() {
            const element = document.createElement("div");
            if (this.classes.length == 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) => element.classList.add(className));
            }
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
            this.parent.append(element);
        }
    }

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

    // Forms

    const forms = document.querySelectorAll("form");
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
        openModal();

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
            closeModal();
        }, 4000);
    }

    fetch("http://localhost:3000/menu")
        .then((data) => data.json())
        .then((res) => console.log(res));

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

    // calculator

    const result = document.querySelector(".calculating__result span"); // поле с результатом подсчета

    let sex, height, weigth, age, ratio; // объявляем переменные нижней плашки

    // проверка: если в local storage уже находятся данные, то их мы помещаем в переменную sex
    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", "female"); // устанавливаем значение по умолчанию, записываем в local storage
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

    // вычисляет количество каллорий по формуле
    function calcTotal() {
        if (!sex || !height || !weigth || !age || !ratio) {
            result.textContent = "____";
            return; // функция дальше не пойдет
        } // если какое-либо значение в инпут не будет введено, вычисления не произведутся
        // в переменных в if попадают числа. Если это не число, а строка, результат - false

        if (sex === "female") {
            result.textContent = Math.round(
                (447.6 + 9.2 * weigth + 3.1 * height - 4.3 * age) * ratio
            );
        } else {
            result.textContent = Math.round(
                (88.36 + 13.4 * weigth + 4.8 * height - 5.7 * age) * ratio
            );
        }
    }

    calcTotal();

    // получать статическую информацию.
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.addEventListener("click", (e) => {
                //обращаемся сначала к data-ratio. Если такой атрибут есть, записываем его в переменную ratio
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio"); //записываем его в переменную ratio
                    localStorage.setItem("ratio", +e.target.getAttribute("data-ratio")); // устанавливаем в local storage значение ratio
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id")); // помещаем значение в local storage
                }

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
});