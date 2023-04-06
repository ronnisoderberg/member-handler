//Todo ska en ny Data så att den kan köras iconfig filen. Den ska bygga på den data som finns i databasen.
import mockData from "./mockdata.js";

function groupTimesByFiveMinutes(arr) {
  const timeGroups = {};
  arr.forEach((item) => {
    const time = new Date(item.time);
    const minutes = time.getMinutes();
    const timeGroup = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()} ${time.getHours()}:${
      minutes - (minutes % 5)
    }-${time.getHours()}:${minutes - (minutes % 5) + 4}`;
    if (timeGroup in timeGroups) {
      timeGroups[timeGroup].count++;
    } else {
      timeGroups[timeGroup] = { count: 1, range: timeGroup };
    }
  });
  return Object.values(timeGroups).sort((a, b) => {
    const dateA = new Date(a.range.split(" ")[0]);
    const dateB = new Date(b.range.split(" ")[0]);
    return dateA - dateB;
  });
}
console.log(groupTimesByFiveMinutes(mockData));

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "greenday"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9, 23, 23],
      backgroundColor: [
        "rgba(255, 26, 104, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(0, 0, 0, 0.2)"
      ],
      borderColor: [
        "rgba(255, 26, 104, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(0, 0, 0, 1)"
      ],
      borderWidth: 1
    },
    {
      label: "Weekly Sals",
      data: [12, 3, 23, 3, 5, 12, 12],
      backgroundColor: [
        "rgba(255, 26, 104, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(0, 0, 0, 0.2)"
      ],
      borderColor: [
        "rgba(255, 26, 104, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(0, 0, 0, 1)"
      ],
      borderWidth: 1
    }
  ]
};

// config
const config = {
  type: "bar",
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked"
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  }
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

// Instantly assign Chart.js version
const chartVersion = document.getElementById("chartVersion");
chartVersion.innerText = Chart.version;
