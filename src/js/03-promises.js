import Notiflix from 'notiflix';

const formEl = document.querySelector('.form')

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
};

formEl.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const { amount, step, delay } = event.target.elements;
  let amountValue = Number(amount.value);
  let stepValue = Number(step.value);
  let delayValue = Number(delay.value);
  
  for (let index = 0; index < amountValue; index+=1) {
    createPromise(index +1, delayValue).then().catch();
    delayValue += stepValue; }
}

// done
    