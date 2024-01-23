// ============================== задача #1 ==============================
class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100; // в конструкторе сразу вызываем сеттер 
    this.type = null;
  }

  set state(tmpState) {
    if (tmpState < 0) {
      this._state = 0;
    } else if (tmpState > 100) {
      this._state = 100;
    } else {
      this._state = tmpState;
    }
  }

  get state() {
    return this._state;
  }

  fix() {
    this.state *= 1.5; // сначала вызываем геттер, а затем - сеттер
  }
}

// ============================== проверка задачи #1 ==============================
const sherlock = new PrintEditionItem(
  "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
  2019,
  1008
);
console.log(sherlock.releaseDate); // 2019 (получение значения свойства)
console.log(sherlock.state); // 100 (вызов геттера)
sherlock.fix(); // 100
console.log(sherlock.state); // 100 (вызов геттера)


// ============================== задача #2 ==============================
class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount)
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount)
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount)
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount)
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount)
    this.type = "detective";
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) { // вызываем геттер
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    return this.books.find( book => book[type] === value ) || null;
  }

  giveBookByName(bookName) {
    const bookIndex = this.books.findIndex( book => book.name === bookName );
    if (~bookIndex) {
      const foundBook = this.books[bookIndex];
      this.books.splice(bookIndex, 1);
      return foundBook;
    }
    return null;
  }
}

// ============================== проверка задачи #2 ==============================
const myLibrary = new Library("Библиотека имени Ленина");
myLibrary.addBook(new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168));
myLibrary.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
myLibrary.addBook(new Magazine("Мурзилка", 1924, 60));
console.log(myLibrary.findBookBy("name", "Властелин колец")); // null (книга не найдена)
console.log(myLibrary.findBookBy("releaseDate", 1924).name); // Мурзилка
console.log(`Количество книг до выдачи: ${myLibrary.books.length}`); // 3
console.log(myLibrary.giveBookByName("Машина времени"));
console.log(`Количество книг после выдачи: ${myLibrary.books.length}`); // 2


// ============================== задача #3 (бонусная) ==============================
class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(markToAdd, subject) {
    if (markToAdd < 2 || markToAdd > 5) {
      return;
    }
    if (!this.marks[subject]) {
      this.marks[subject] = [];
    }
    (this.marks[subject]).push(markToAdd);
  }

  getAverageBySubject(subject) {
    if (this.marks[subject]) {
      const sum = this.marks[subject].reduce( (current, previous) => current + previous, 0 );
      return sum / this.marks[subject].length;
    }
    return 0;
  }

  getAverage() {
    const allSubjects = Object.keys(this.marks); // ["химия", "физика"]
    if (allSubjects.length) {
      return allSubjects.reduce( (acc, subject) => acc + this.getAverageBySubject(subject), 0 ) / allSubjects.length;
    }
    return 0;
  }
}

// ============================== проверка задачи #3 ==============================
const student = new Student("Илон Маск");
console.log(student);
student.addMark(5, "химия");
student.addMark(5, "химия");
student.addMark(5, "физика");
student.addMark(4, "физика");
student.addMark(6, "физика"); // оценка не добавится, так как она > 5
console.log(student);
console.log(`средний балл по физике: ${student.getAverageBySubject("физика")}`); // 4.5
console.log(`средний балл по биологии: ${student.getAverageBySubject("биология")}`); // 0 (т.к. нет оценок)
console.log(`средний балл по всем предметам: ${student.getAverage()}`); // 4.75
