"use strict";

/**
 * Функция, решающая квадратные уравнения (ax² + bx + c = 0).
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {array|string} Массив решений или строку с предупреждением.
 */
function solveEquation(a, b, c) {
  const arr = [];

  const discriminant = b ** 2 - 4 * a * c;

  if (discriminant === 0) {
    if (a === 0) {
      return "Делить на ноль нельзя!";
    }
    const result = -b / (2 * a);
    arr.push(result);
  } else if (discriminant > 0) {
    if (a === 0) {
      return "Делить на ноль нельзя!";
    }
    const result_1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const result_2 = (-b - Math.sqrt(discriminant)) / (2 * a);
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
 * @returns {number} Общую сумму платежа по ипотеке.
 */
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  const loanRate = percent / 100 / 12; // ежемесячная ставка по кредиту
  const loanBody = amount - contribution; // тело кредита
  const monthlyFee = loanBody * (loanRate + loanRate / ((1 + loanRate) ** countMonths - 1)); // ежемесячный платеж
  const totalPayment = +(monthlyFee * countMonths).toFixed(2); // суммарный платеж
  return totalPayment;
}
