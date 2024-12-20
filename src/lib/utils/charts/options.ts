import type { EChartsOption } from 'echarts';
import { defaultTheme } from './themes';
import { formatNumber } from '../format';

interface ChartData {
  columns: string[];
  rows: any[][];
}

export function createChartOptions(data: ChartData, type: string): EChartsOption {
  const labels = data.rows.map(row => row[0]);
  const values = data.rows.map(row => row[1]);
  const seriesName = data.columns[1] || 'Value';

  const baseOptions: EChartsOption = {
    ...defaultTheme,
    grid: {
      top: '9%',
      right: '0%',
      bottom: '8%',
      left: '0%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const param = Array.isArray(params) ? params[0] : params;
        return `${param.name}: ${formatNumber(param.value)}`;
      }
    },
    legend: {
      show: false
    },
    xAxis: type !== 'pie' ? {
      type: 'category',
      data: labels,
      axisLabel: {
        fontSize: 12
      },
      axisTick: {
        show: false
      }
    } : undefined,
    yAxis: type !== 'pie' ? {
      type: 'value',
      show: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#e2e8f0',
          width: 1,
          type: 'solid'
        },
        interval: (value: number) => value === 0
      }
    } : undefined
  };

  switch (type) {
    case 'bar':
      return {
        ...baseOptions,
        series: [{
          name: seriesName,
          type: 'bar',
          data: values,
          label: {
            show: true,
            position: 'top',
            fontSize: 12,
            formatter: (params: any) => formatNumber(params.value)
          }
        }]
      };

    case 'line':
      return {
        ...baseOptions,
        series: [{
          name: seriesName,
          type: 'line',
          data: values,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          label: {
            show: true,
            position: 'top',
            fontSize: 12,
            formatter: (params: any) => formatNumber(params.value)
          }
        }]
      };

    case 'pie':
      return {
        ...baseOptions,
        series: [{
          name: seriesName,
          type: 'pie',
          radius: '70%',
          data: labels.map((label, i) => ({
            name: label,
            value: values[i]
          })),
          label: {
            formatter: (params: any) => 
              `${params.name}: ${formatNumber(params.value)} (${params.percent}%)`,
            fontSize: 12
          }
        }]
      };

    default:
      return baseOptions;
  }
}