let dataValues = [0, 0, 0, 0, 0];

const labelsTop = [
  "توزيع عبء التمويل",
  "حجم التمويل الكلي",
  "فعالية التمويل على المناخ",
  "شكل التمويل",
  "عدالة شروط التمويل",
];
const labelsTopSecond = [
  "تمويل تشاركي",
  "تمويل فائض",
  "تمويل فعّال",
  "منح",
  "تمويل لا مشروط",
];

const labelsBottom = [
  "تمويل محصور",
  "تمويل غير كافي",
  "تمويل غير فعّال",
  "قروض",
  "تمويل بشروط مجحفة",
];

const chart = new Chart(document.getElementById("chart"), {
  type: "bar",
  data: {
    labels: labelsBottom,
    
    datasets: [
      {
        label: "قيمة المؤشر",
        data: dataValues,
        backgroundColor: dataValues.map((val) =>
          val >= 0 ? "rgba(76, 175, 80, 0.7)" : "rgba(244, 67, 54, 0.7)"
        ),
        borderColor: dataValues.map((val) =>
          val >= 0 ? "#4caf50" : "#f44336"
        ),
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: dataValues.map((val) =>
          val >= 0 ? "#4caf50" : "#f44336"
        ),
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#555",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${labelsTop[context.dataIndex]}: ${context.raw}`;
          },
        },
      },
      datalabels: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        min: -10,
        max: 10,
        ticks: {
          stepSize: 1,
          color: "#666",
          font: { size: 14, weight: 600 },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#666",
          font: { size: 14, weight: 600 },
        },
        grid: { display: false },
      },
      xTop: {
        position: "top",
        grid: { display: false },
        ticks: {
          color: "#666",
          font: { size: 14, weight: 600 },
        },
        labels: labelsBottom,
      },
      x2Top: {
        position: "top",
        grid: { display: false },
        ticks: {
          color: "#666",
          font: { size: 14, weight: 600 },
        },
        labels: labelsBottom,
       
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  },
  plugins: [ChartDataLabels],
});

// إضافة المحور العلوي بعد إنشاء الرسم البياني
chart.options.scales.xTop.ticks.callback = function (value, index) {
  return labelsTopSecond[index];
};
chart.options.scales.x2Top.ticks.callback = function (value, index) {
  return labelsTop[index];
};
chart.update();

function updateChartColors() {
  chart.data.datasets.forEach((dataset) => {
    dataset.backgroundColor = dataValues.map((val) =>
      val >= 0 ? "rgba(76, 175, 80, 0.7)" : "rgba(244, 67, 54, 0.7)"
    );
    dataset.borderColor = dataValues.map((val) =>
      val >= 0 ? "#4caf50" : "#f44336"
    );
    dataset.hoverBackgroundColor = dataValues.map((val) =>
      val >= 0 ? "#4caf50" : "#f44336"
    );
  });
}

function changeValue(index, delta) {
  const newValue = dataValues[index] + delta;
  if (newValue >= -10 && newValue <= 10) {
    dataValues[index] = newValue;
    document.getElementById("col" + index).innerText = dataValues[index];
    chart.data.datasets[0].data = dataValues;
    updateChartColors();
    chart.update();
  }
}

function resetValues() {
  for (let i = 0; i < dataValues.length; i++) {
    dataValues[i] = 0;
    document.getElementById("col" + i).innerText = "0";
  }
  chart.data.datasets[0].data = dataValues;
  updateChartColors();
  chart.update();
}