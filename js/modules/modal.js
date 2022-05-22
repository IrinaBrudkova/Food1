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

export default modal;
export { closeModal };
export { openModal };