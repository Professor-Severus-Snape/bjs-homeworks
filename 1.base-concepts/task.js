"use strict";

/**
 * Функция, решающая квадратные уравнения (ax² + bx + c = 0).
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {array|string} Массив решений или строку с предупреждением.
 */
function solveEquation(a, b, c) {
  let arr = [];

  let discriminant = b ** 2 - 4 * a * c;

  if (discriminant === 0) {
    if (a === 0) {
      return "Делить на ноль нельзя!";
    }
    let result = -b / (2 * a);
    arr.push(result);
  } else if (discriminant > 0) {
    if (a === 0) {
      return "Делить на ноль нельзя!";
    }
    let result_1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    let result_2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    arr.push(result_1, result_2);
  }

  return arr;
}

/**
 * Функция, осуществляющая расчёт выплат по ипотеке.
 * @param {number} percent процентная ставка
 * @param {number} contribution сумма первоначального взноса
 * @param {number} amount сумма кредита
 * @param {number} countMonths срок кредитования (в месяцах)
 * @returns {number} Общая сумма платежа по ипотеке.
 */
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  let loanRate = percent / 100 / 12; // ежемесячная ставка по кредиту
  let loanBody = amount - contribution; // тело кредита
  let monthlyFee = loanBody * (loanRate + loanRate / ((1 + loanRate) ** countMonths - 1)); // ежемесячный платеж
  let totalPayment = +(monthlyFee * countMonths).toFixed(2); // суммарный платеж
  return totalPayment;
}
