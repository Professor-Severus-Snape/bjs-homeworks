// ==================== Задача #1 ==================== :
function cachingDecoratorNew(func) {
  const cache = [];

  return (...args) => {
    // const hash = md5(args); // нужна библиотека "js-md5"
    const hash = args.join(","); // "1,2"
    const maxCacheValuesCount = 5
    const objectInCache = cache.find(item => item[hash]); // {'1,2': 3}

    if (objectInCache) {
      return `Из кеша: ${objectInCache[hash]}`;
    }

    const result = func(...args); // 3
    cache.push( {[hash]: result} ); // cache = [{'1,2': 3}]

    if (cache.length > maxCacheValuesCount) {
      cache.shift();
    }

    return `Вычисляем: ${result}`;
  }
}

// Проверка работы кеширующего декоратора:
const sum = (...args) => args.reduce((acc, item) => acc + item, 0);
const cachedSum = cachingDecoratorNew(sum);

console.log(cachedSum(1, 2)); // Вычисляем: 3
console.log(cachedSum(2, 3)); // Вычисляем: 5
console.log(cachedSum(1, 2)); // Из кеша: 3
console.log(cachedSum(3, 4)); // Вычисляем: 7
console.log(cachedSum(4, 5)); // Вычисляем: 9
console.log(cachedSum(5, 6)); // Вычисляем: 11
console.log(cachedSum(6, 7)); // Вычисляем: 13
console.log(cachedSum(1, 2)); // Вычисляем: 3

// ==================== Задача #2 ==================== :
function debounceDecoratorNew(func, ms) {
  let timeoutId = null;

  function wrapper(...args) {
    wrapper.allCount++;

    if (!timeoutId) {
      func(...args);
      wrapper.count++;
    } else {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      wrapper.count++;
    }, ms);
  }

  wrapper.count = 0; // кол-во вызовов декорированной функции
  wrapper.allCount = 0; // кол-во вызовов debounce-декоратора

  return wrapper;
}

// Проверка работы задерживающего декоратора:
const sendSignal = (signalOrder, delay) => console.log("Сигнал отправлен", signalOrder, delay);
const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);

setTimeout( () => upgradedSendSignal(1, 0) ); // Сигнал отправлен, запланирован асинхронный запуск - будет проигнорирован (300 - 0 < 2000)
setTimeout( () => upgradedSendSignal(2, 300), 300 ); // проигнорировано, т.к. следующий сигнал отменит предыдущий (900 - 300 < 2000)
setTimeout( () => upgradedSendSignal(3, 900), 900 ); // проигнорировано, т.к. следующий сигнал отменит предыдущий (1200 - 900 < 2000)
setTimeout( () => upgradedSendSignal(4, 1200), 1200 ); // проигнорировано, т.к. следующий сигнал отменит предыдущий (2300 - 1200 < 2000)
setTimeout( () => upgradedSendSignal(5, 2300), 2300 ); // Сигнал отправлен, т.к. следующий вызов не успеет отменить текущий: 4400-2300=2100 (2100 > 2000)
setTimeout( () => upgradedSendSignal(6, 4400), 4400 ); // проигнорировано, т.к. следующий сигнал отменит предыдущий (4500 - 4400 < 2000)
setTimeout( () => upgradedSendSignal(7, 4500), 4500 ); // Сигнал будет отправлен, т.к. это последний вызов debounce декоратора (спустя 4500 + 2000 = 6500)
setTimeout( () => {
  console.log(upgradedSendSignal.count); // было выполнено 3 отправки сигнала
  console.log(upgradedSendSignal.allCount); // было выполнено 7 вызовов декорированной функции
}, 7000);
