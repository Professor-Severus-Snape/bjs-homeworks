class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(alarmTime, action) {
    if (!alarmTime || !action) {
      throw new Error("Отсутствуют обязательные аргументы");
    }

    if (this.alarmCollection.find(alarm => alarm.time === alarmTime)) {
      console.warn("Уже присутствует звонок на это же время");
      return;
    }
    
    this.alarmCollection.push({callback: action, time: alarmTime, canCall: true});
  }

  removeClock(alarmTime) {
    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== alarmTime);
  }

  getCurrentFormattedTime() {
    return new Date().toLocaleTimeString("ru-Ru", {hour: "2-digit", minute: "2-digit"});
  }

  start() {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.alarmCollection.forEach(alarm => {
        if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resetAllCalls() {
    this.alarmCollection.forEach(alarm => alarm.canCall = true);
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}

console.log("========================================");
console.log("проверка работоспособности будильника:");
console.log("========================================");

console.log("\n--------------------------------------------------");
let alarm = new AlarmClock;
console.log(alarm);

console.log("--------------------------------------------------");
alarm.addClock("07:00", "Не так рано, пожалуйста!");
alarm.addClock("10:00", "Проснись и пой!");
alarm.addClock("10:00", "Еще один будильник на 10:00!");  // "Уже присутствует звонок на это же время"
// alarm.addClock("10:00");  // Error: Отсутствуют обязательные аргументы !!!
alarm.addClock("13:00", "Не, ну серьезно, вставай уже!");
console.log("--------------------------------------------------");
console.log(alarm);

console.log("\n--------------------------------------------------");
console.log("Удаление всех будильников, установленных на 10:00:");
alarm.removeClock("10:00");
console.log("--------------------------------------------------");
console.log(alarm);

console.log("\n--------------------------------------------------");
console.log(`Текущее время -> ${alarm.getCurrentFormattedTime()}`); // Текущее время -> 00:09
console.log("--------------------------------------------------");

console.log("\n--------------------------------------------------");
console.log("Включение будильника:");
console.log("--------------------------------------------------");
alarm.start();
console.log(alarm);

console.log("\n--------------------------------------------------");
console.log("Выключение будильника:");
console.log("--------------------------------------------------");
alarm.stop();
console.log(alarm);

console.log("\n--------------------------------------------------");
console.log("Сброс возможности запуска всех будильников:");
console.log("--------------------------------------------------");
alarm.resetAllCalls();
console.log(alarm);

console.log("\n--------------------------------------------------");
console.log("Удаление всех будильников:");
console.log("--------------------------------------------------");
alarm.clearAlarms();
console.log(alarm); // AlarmClock { alarmCollection: [], intervalId: null }
