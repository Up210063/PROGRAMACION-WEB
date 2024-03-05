const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");
const formAlarm = document.getElementById("form-alarm");
let alarmDate;

document.addEventListener('DOMContentLoaded', () => {
    getCurrentTime();
});

setInterval(() => {
    getCurrentTime()
}, 1000);

formAlarm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = formData.get("time");
    if (value === null || value === "") {
        alert("Establezca una fecha");
        return;
    }
    alarmDate = new Date(value);

});

const formatNumber = (number) => number < 10 ? "0" + number : number;

const getCurrentTime = () => {
    const currentDate = new Date();

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    console.log(alarmDate);

    hours.innerText = formatNumber(currentHours);
    minutes.innerText = formatNumber(currentMinutes);
    seconds.innerText = formatNumber(currentSeconds);
}
