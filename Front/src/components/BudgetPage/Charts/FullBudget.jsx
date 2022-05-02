import React, { useState } from "react";
// import 'chart.js/auto';
// import { Doughnut } from 'react-chartjs-2';
import ApexCharts from 'react-apexcharts'

const FullBudget = () => {

  const series = [44, 55, 41, 17, 15];
  const options = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10
      }
    },
    grid: {
      padding: {
        bottom: -80
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  return (
    <>
      <ApexCharts options={options} series={series} type='donut' width={400} />
    </>
  );
};

export default FullBudget;