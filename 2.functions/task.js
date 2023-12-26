"use strict";

const arr = [
  [10, 10, 11, 20, 10],
  [67, 10, 2, 39, 88],
  [72, 75, 51, 87, 43],
  [30, 41, 55, 96, 62],
];

function getArrayParams(...arr) {
  if (!arr.length) {
    return 0;
  }

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const sum = arr.reduce((accumulator, current) => accumulator + current);
  const avg = +(sum / arr.length).toFixed(2);

  return { min: min, max: max, avg: avg };
}

function summElementsWorker(...arr) {
  if (!arr.length) {
    return 0;
  }

  const sum = arr.reduce((accumulator, current) => accumulator + current);
  return sum;
}

function differenceMaxMinWorker(...arr) {
  if (!arr.length) {
    return 0;
  }

  const difference = Math.max(...arr) - Math.min(...arr);
  return difference;
}

function differenceEvenOddWorker(...arr) {
  if (!arr.length) {
    return 0;
  }

  let sumEvenElement = 0;
  let sumOddElement = 0;

  for (let i = 0; i < arr.length; i++) {
    (arr[i] % 2) ? (sumOddElement += arr[i]) : (sumEvenElement += arr[i]);
  }

  return sumEvenElement - sumOddElement;
}

function averageEvenElementsWorker(...arr) {
  if (!arr.length) {
    return 0;
  }

  let sumEvenElement = 0;
  let countEvenElement = 0;

  for (let i = 0; i < arr.length; i++) {
    if (!(arr[i] % 2)) {
      sumEvenElement += arr[i];
      countEvenElement++;
    }
  }

  const avg = +(sumEvenElement / countEvenElement).toFixed(2);

  return avg;
}

function makeWork(matrix, func) {
  if (!matrix.length) {
    return 0;
  }

  let maxWorkerResult = func(...matrix[0]);

  for (let i = 1; i < matrix.length; i++) {
    const tmp = func(...matrix[i]);
    if (tmp > maxWorkerResult) {
      maxWorkerResult = tmp;
    }
  }

  return maxWorkerResult;
}
