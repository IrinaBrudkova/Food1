"use strict";

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";

//Событие DOMContentLoaded происходит когда весь HTML был полностью загружен, не дожидаясь окончания загрузки таблиц стилей, изображений и фреймов.
window.addEventListener("DOMContentLoaded", function() {
    const modalTimerId = setTimeout(
        () => openModal(".modal", modalTimerId),
        300000
    );
    tabs();
    modal("[data-modal]", ".modal", modalTimerId);
    calc();
    cards();
    forms("form", modalTimerId);
    slider();
    timer();
});