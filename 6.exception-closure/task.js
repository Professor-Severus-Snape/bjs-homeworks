// ==================== Задача #1 ====================
function parseCount(parseValue) {
  if (Number.isNaN(Number.parseFloat(parseValue))) {
    throw new Error("Невалидное значение");
  }
  return Number.parseFloat(parseValue);
}

// ==================== Тесты для функции parseCount(): ====================
// console.log(parseCount("10px")); // 10(int)
// console.log(parseCount("12.5em")); // 12.5
// console.log(parseCount("22.34.5")); // 22.34
// console.log(parseCount("0908.5")); // 908.5
// console.log(parseCount("3.125e7")); // 31250000
// console.log(parseCount("0xA")); // 0
// console.log(parseCount("invalid")); // "Error: Невалидное значение"
// console.log(parseCount("0xA")); // код не выполнится после ошибки!!!

function validateCount(validateValue) {
  try {
    return parseCount(validateValue);
  } catch(err) {
    return err;
  }
}

// ==================== Тесты для функции validateCount(): ====================
// console.log(validateCount("10px")); // 10(int)
// console.log(validateCount("12.5em")); // 12.5
// console.log(validateCount("22.34.5")); // 22.34
// console.log(validateCount("0908.5")); // 908.5
// console.log(validateCount("3.125e7")); // 31250000
// console.log(validateCount("0xA")); // 0
// console.log(validateCount("invalid")); // "Error: Невалидное значение"
// console.log(validateCount("0xA")); // 0 <- Код выполнится!!!


// ==================== Задача #2 ====================
class Triangle {
  constructor (a, b, c) {
    if ( (a + b) < c || (b + c) < a || (a + c) < b ) {
      throw new Error("Треугольник с такими сторонами не существует");
    }
    this.a = a;
    this.b = b;
    this.c = c;
  }

  get perimeter() {
    return this.a + this.b + this.c;
  }

  get area() {
    const halfPerimeter = this.perimeter / 2;
    return +( Math.sqrt( halfPerimeter * (halfPerimeter - this.a) * (halfPerimeter - this.b) * (halfPerimeter - this.c) ).toFixed(3) );
  }
}

function getTriangle(a, b, c) {
  try {
    return new Triangle(a, b, c);
  } catch {
    return { 
      get area() {return "Ошибка! Треугольник не существует"},
      get perimeter() {return "Ошибка! Треугольник не существует"}
    };
  }
}

// ==================== Тесты для класса Triangle и функции getTriangle(): ====================
// const myInvalidTriangle = new Triangle(1, 2, 5); // "Error: Треугольник с такими сторонами не существует"
// const inValidTriangle = getTriangle(1, 2, 5); // { area: [Getter], perimeter: [Getter] }
// console.log(`Периметр треугольника: ${inValidTriangle.perimeter}`); // Ошибка! Треугольник не существует
// console.log(`Площадь треугольника: ${inValidTriangle.area}`); // Ошибка! Треугольник не существует
// const validTriangle = getTriangle(10, 15, 20); // Triangle { a: 10, b: 15, c: 20 }
// console.log(`Периметр треугольника: ${validTriangle.perimeter}`); // 45
// console.log(`Площадь треугольника: ${validTriangle.area}`); // 72.618
