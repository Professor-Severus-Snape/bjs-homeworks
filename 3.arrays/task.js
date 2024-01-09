/**
 * Выполняет поэлементное сравнение двух массивов.
 * @param {Array} arr1 первый массив
 * @param {Array} arr2 второй массив
 * @returns {Boolean} True (если массивы равны) или false (если массивы не равны).
 */
function compareArrays(arr1, arr2) {
  // ========== 1-ый вариант решения: ==========
  if (arr1.length === arr2.length) {
    return arr1.every( (item, index) => item === arr2[index] );
  }
  return false;

  // ========== 2-ой вариант решения: ==========
  // return arr1.length === arr2.length && arr1.every( (item, index) => item === arr2[index] );
}

/**
 * Вычисляет средний возраст пользователей определенной гендерной принадлежности.
 * @param {Array} users список пользователей (массив объектов)
 * @param {String} gender искомая гендерная принадлежность
 * @returns {Number} Средний возраст пользователей указанной гендерной принадлежности или 0 (если невозможно произвести рассчет).
 */
function getUsersNamesInAgeRange(users, gender) {
  // ========== моё решение: ==========
  if (!users.length) {
    return 0;
  }

  const foundUsers = users.filter( user => user.gender === gender );  // массив подходящих объектов
  if (!foundUsers.length) {
    return 0;
  }
  
  return +(foundUsers.reduce( (accumulator, user) => accumulator + user.age, 0 ) / foundUsers.length).toFixed(2);

  // ========== решение эксперта: ==========
  // return
  //   users.filter( user => user.gender === gender )
  //        .map( user => user.age )
  //        .reduce( (average, userAge, index, array) => average + userAge / array.length, 0 );
}

const people = [
  {firstName: "Александр", secondName: "Карпов", age: 17, gender: "мужской"},
  {firstName: "Егор", secondName: "Морозов", age: 21, gender: "мужской"},
  {firstName: "Мелисса", secondName: "Леонова", age: 40, gender: "женский"},
  {firstName: "Мелания", secondName: "Савельева", age: 37, gender: "женский"},
  {firstName: "Мария", secondName: "Овчинникова", age: 18, gender: "женский"},
  {firstName: "Марьяна", secondName: "Котова", age: 17, gender: "женский"},
  {firstName: "Фёдор", secondName: "Селезнев", age: 50, gender: "мужской"},
  {firstName: "Георгий", secondName: "Петров", age: 35, gender: "мужской"},
  {firstName: "Даниил", secondName: "Андреев", age: 49, gender: "мужской"},
  {firstName: "Дарья", secondName: "Савельева", age: 25, gender: "женский"},
  {firstName: "Михаил", secondName: "Шаров", age: 22, gender: "мужской"},
  {firstName: "Владислав", secondName: "Давыдов", age: 40, gender: "мужской"},
  {firstName: "Илья", secondName: "Казаков", age: 35, gender: "мужской"},
  {firstName: "Евгений", secondName: "Кузьмин", age: 19, gender: "мужской"},
];
