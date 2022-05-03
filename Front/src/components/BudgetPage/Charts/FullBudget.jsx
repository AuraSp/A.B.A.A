import React from "react";
// import 'chart.js/auto';
// import { Doughnut } from 'react-chartjs-2';
import ApexCharts from 'react-apexcharts'
// import { ExportToCsv } from 'export-to-csv';


const FullBudget = ({ data }) => {

  const series = [34, 45, 54];
  let name = 'name'
  let value = 'value'
  const options = {
    chart: {
      legend: {
        show: false,
      },
      type: 'donut',
      animations: {
        animateGradually: {
          enabled: true,
        }
      }
    },
    legend: {
      show: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    sparkline: {
      enabled: false
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              name
            },
            value: {
              value
            }
          },
        },
        expandOnClick: false,
      },
      grid: {
        padding: {
          bottom: -100
        }
      },
    }
  }

  // const ex = {
  //   fieldSeparator: ',',
  //   quoteStrings: '"',
  //   decimalSeparator: '.',
  //   showLabels: true,
  //   showTitle: true,
  //   title: 'My Awesome CSV',
  //   useTextFile: false,
  //   useBom: true,
  //   useKeysAsHeaders: true
  // };

  // const csvExporter = new ExportToCsv(ex);

  // csvExporter.generateCsv(series);

  return (
    <>
      <ApexCharts options={options} series={series} type='donut' width={400} height={400}
      />
    </>
  );
};

export default FullBudget;