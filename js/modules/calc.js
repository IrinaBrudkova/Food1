function calc() {
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
}

module.exports = calc;