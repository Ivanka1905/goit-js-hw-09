function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
// console.log(body)
// console.log(btnStart)
// console.log(btnStop)
btnStop.disabled = true;
btnStart.addEventListener('click', onStart);

let timerId;
function onStart() {
    btnStart.disabled = true;
    btnStop.disabled = false;

    timerId = setInterval(() => {
        const bgColor = getRandomHexColor();
        body.style.background = bgColor;
    }, 1000)
};

btnStop.addEventListener('click', onStop);
function onStop() {
    btnStart.disabled = false; 
    btnStop.disabled = true;

    clearInterval(timerId);
}

// done
