"use strict";
window.addEventListener("DOMContentLoaded", function() {
    const tabs = require("./modules/tabs"),
        modal = require("./modules/modal"),
        calc = require("./modules/calc"),
        cards = require("./modules/cards"),
        forms = require("./modules/forms"),
        slider = require("./modules/slider"),
        timer = require("./modules/timer");

    tabs();
    modal();
    calc();
    cards();
    forms();
    slider();
    timer();
});