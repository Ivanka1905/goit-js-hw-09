import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const flatpickrInit = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
const daysElem = document.querySelector('span[data-days]');
const hoursElem = document.querySelector('span[data-hours]');
const minutesElem = document.querySelector('span[data-minutes]');
const secondsElem = document.querySelector('span[data-seconds]');

let selectedTimeMs;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            // window.alert('Please choose a date in the future')
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            btnStart.disabled = false;
            selectedTimeMs = selectedDates[0].getTime();
        }
  },
};
let dateSelect = flatpickr(flatpickrInit, options);
let timerId;

btnStart.addEventListener('click', onStart)
function onStart() {
    btnStart.disabled = true;
    let deltaTime = selectedTimeMs - Date.now();
    timerId = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        if (deltaTime >= 1000) { deltaTime -= 1000; } else {
                clearInterval(timerId);
                Notiflix.Notify.success('Відлік завершено!')
            }
        }, 1000);
};  
function changeNumbers() {
    daysElem.textContent = addLeadingZero(days);
    hoursElem.textContent = addLeadingZero(hours);
    minutesElem.textContent = addLeadingZero(minutes);
    secondsElem.textContent = addLeadingZero(seconds);
}  

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

flatpickrInit.style.fontSize = '24px';
flatpickrInit.style.borderRadius = '5px';
flatpickrInit.style.marginLeft = '30px';
flatpickrInit.style.marginBottom = '30px'
btnStart.style.fontSize = '24px';
btnStart.style.color = '#FF0000';
btnStart.style.borderRadius = '5px';
const timer = document.querySelector('.timer');
timer.style.fontSize = '40px';
timer.style.display = 'flex';
timer.style.gap = '35px';
timer.style.marginLeft = '30px';
timer.style.color = '#FF0000';

// done