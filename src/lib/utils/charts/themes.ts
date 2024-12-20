import type { EChartsOption } from 'echarts';

export const defaultTheme: Partial<EChartsOption> = {
  color: [
    '#236aa4',  // Primary blue
    '#45a1bf',  // Light blue
    '#a5cdee',  // Pale blue
    '#8dacbf',  // Gray blue
    '#85c7c6',  // Teal
    '#d2c6ac',  // Beige
    '#f4b548',  // Gold
    '#8f3d56',  // Burgundy
    '#71b9f4',  // Sky blue
    '#46a485'   // Green
  ],
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'Inter, sans-serif',
    color: '#4a5568'
  },
  title: {
    textStyle: {
      fontSize: 14,
      fontWeight: 500,
      color: '#2d3748'
    }
  },
  legend: {
    textStyle: {
      fontSize: 12,
      color: '#4a5568'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    axisLine: {
      lineStyle: {
        color: '#cbd5e0'
      }
    },
    axisLabel: {
      color: '#4a5568'
    }
  },
  yAxis: {
    axisLine: {
      lineStyle: {
        color: '#cbd5e0'
      }
    },
    axisLabel: {
      color: '#4a5568'
    },
    splitLine: {
      lineStyle: {
        color: '#e2e8f0'
      }
    }
  }
};