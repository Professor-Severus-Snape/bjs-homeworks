function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.marks = [];
}

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
}

Student.prototype.addMarks = function (...marksToAdd) {
  if (this.marks) {
    this.marks.push(...marksToAdd);
  }
}

Student.prototype.getAverage = function () {
  if (!this.marks || !this.marks.length) {
    return 0;
  }
  return this.marks.reduce((previous, current) => previous + current, 0) / this.marks.length;
}

Student.prototype.exclude = function (reason) {
  delete this.subject;
  delete this.marks;
  this.excluded = reason;
}

let student_1 = new Student("Василиса", "женский", 19);
student_1.setSubject("Algebra");
console.log(student_1.getAverage()); // 0
student_1.addMarks(4, 5, 4, 5);
console.log(student_1.getAverage()); // 4.5
console.log(student_1); // { name: 'Василиса', gender: 'женский', age: 19, marks: [ 4, 5, 4, 5 ], subject: 'Algebra'}

let student_2 = new Student("Артём", "мужской", 25);
student_2.setSubject("Geometry");
student_2.exclude('плохая учёба')
console.log(student_2) // {  name: 'Артём', gender: 'мужской', age: 25, excluded: 'плохая учёба'}
