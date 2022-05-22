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

export default cards;