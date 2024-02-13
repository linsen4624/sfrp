const theme = document.body.classList
let most_color, tiny_color

if(theme.value == 'light'){
  most_color = "rgba(0, 0, 0, 0.8)"
  tiny_color = "rgba(0, 0, 0, 0.2)"
}
if(theme.value == 'dark'){
  most_color = "rgba(255, 255, 255, 0.8)"
  tiny_color = "rgba(255, 255, 255, 0.2)"
}
const Radar = {
  type: "radar",
  data: null,
  options: {
    plugins: {
      legend: {
        labels: {
          color: most_color,
          font: {
            size: 16,
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        ticks: {
          stepSize: 1,
          showLabelBackdrop: false, // hide square behind text
        },
        pointLabels: {
          color: most_color,
          font: {
            size: 14,
          },
        },
        grid: {
          color: tiny_color,
        },
        angleLines: {
          color: tiny_color, // lines radiating from the center
        },
        suggestedMin: 1,
        suggestedMax: 5,
      },
    },
  },
}

const Bar = {
  type: "bar",
  data: null,
  options: {
    scales: {
      
      x: {
        grid: {
          color: tiny_color,
        },
        angleLines: {
          color: tiny_color,
        },
      },
      y: {
        grid: {
          color: tiny_color,
        },
        angleLines: {
          color: tiny_color,
        },
      },
    },
  },
}

const Line = {
  type: "line",
  data: null,
  options: {
    scales: {
      x: {
        grid: {
          color: tiny_color,
        },
        angleLines: {
          color: tiny_color,
        },
      },
      y: {
        grid: {
          color: tiny_color,
        },
        angleLines: {
          color: tiny_color,
        },
      },
    },
  },
}

const Pie = {
  type: "pie",
  data: null,
  options: {},
}

const Polar = {
  type: "polarArea",
  data: null,
  options: {},
}

export {
  Radar,
  Bar,
  Line,
  Pie,
  Polar
}