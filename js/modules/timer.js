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

export default timer;