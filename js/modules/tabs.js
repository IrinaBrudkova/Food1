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

export default tabs;