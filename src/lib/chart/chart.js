function groupTimeIntervals(arr) {
  let intervals = {};
  arr.forEach((obj) => {
    let time = new Date(obj.time);
    let mins = time.getMinutes();
    let intervalMins = mins - (mins % 5);
    let interval = `${time.getHours()}:${intervalMins}-${
      time.getHours()
    }:${intervalMins + 4}`;
    if (intervals[interval]) {
      intervals[interval]++;
    } else {
      intervals[interval] = 1;
    }
  });
  for (let interval in intervals) {
    console.log(`${intervals[interval]} tidsobjekt i intervallet ${interval}`);
  }
}