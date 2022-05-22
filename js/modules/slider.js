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

export default slider;