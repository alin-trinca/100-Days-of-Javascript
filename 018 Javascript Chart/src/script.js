// Define chart options
const chartOptions = {
  chart: {
    type: "area",
    height: 200,
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  colors: ["#0ea5ea"],
  series: [{ name: "Users", data: [60, 21, 33, 14, 56, 89] }],
  dataLabels: { enabled: false },
  stroke: { width: 3, curve: "smooth" },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    categories: ["Mar", "Apr", "Apr", "May", "Jun", "Jul"],
    axisBorder: { show: false },
    labels: { style: { colors: "#b9e0f2", fontFamily: "Mulish" } }
  },
  yaxis: { show: false },
  grid: {
    borderColor: "rgba(0, 0, 0, 0)",
    padding: { top: -30, bottom: -8, left: 12, right: 12 }
  },
  tooltip: {
    enabled: true,
    y: { formatter: (value) => `${value}K` },
    style: { fontFamily: "Mulish" }
  },
  markers: { show: false }
};

const chart = new ApexCharts(
  document.querySelector(".chart-area"),
  chartOptions
);
chart.render();
