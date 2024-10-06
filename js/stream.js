const config = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Nitrogen",
        data: [],
        borderColor: "red",
      },
      {
        label: "Phosphorus",
        data: [],
        borderColor: "blue",
      },
      {
        label: "Potassium",
        data: [],
        borderColor: "green",
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "realtime",
        realtime: {
          delay: 1000,
          // onRefresh: (chart) => {
          //   // Get the elements with the specified IDs
          //   var element1 = document.getElementById("nitrogen");
          //   var element2 = document.getElementById("phosphorus");
          //   var element3 = document.getElementById("potassium");

          //   // Check for null elements and set to 0.0 if necessary
          //   if (element1 == null) {
          //     element1 = { textContent: "0.0" };
          //   }
          //   if (element2 == null) {
          //     element2 = { textContent: "0.0" };
          //   }
          //   if (element3 == null) {
          //     element3 = { textContent: "0.0" };
          //   }

          //   // Get the text content of the elements
          //   var value1 = parseFloat(element1.textContent || element1.innerText);
          //   var value2 = parseFloat(element2.textContent || element2.innerText);
          //   var value3 = parseFloat(element3.textContent || element3.innerText);

          //   // Log the values
          //   console.log("Value 1:", value1);
          //   console.log("Value 2:", value2);
          //   console.log("Value 3:", value3);

          //   // Push the values to the datasets
          //   chart.data.datasets[0].data.push({
          //     x: Date.now(),
          //     y: value1,
          //   });
          //   chart.data.datasets[1].data.push({
          //     x: Date.now(),
          //     y: value2,
          //   });
          //   chart.data.datasets[2].data.push({
          //     x: Date.now(),
          //     y: value3,
          //   });
          // },
        },
      },
    },
  },
};

const myChart = new Chart(document.getElementById("npk-graph"), config);
