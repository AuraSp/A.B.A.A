import React, { useState } from "react";
// import 'chart.js/auto';
// import { Doughnut } from 'react-chartjs-2';
import ApexCharts from 'react-apexcharts';
import { ExportToCsv } from 'export-to-csv';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


const FullBudget = ({ data }) => {

  console.log(data)


  const series = [34];

  const option = {
    chart: {
      type: 'donut',
      animations: {
        animateGradually: {
          enabled: true
        }
      }
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        customScale: 1,
        donut: {
          size: '70%'
        }
      },
      legend: {
        show: false,
      },
      grid: {
        padding: {
          bottom: -100
        }
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
        enabed: false,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
        }
      }]
    }
  }

  const options = {
    plotOptions: {
      stroke: {
        show: true,
      },
      dataLabels: {
        enabled: false,
      }
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

  // const data = [
  //   { name: 'Group A', value: 400 },
  //   { name: 'Group B', value: 300 },
  //   { name: 'Group C', value: 300 },
  //   { name: 'Group D', value: 200 },
  // ];
  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  return (
    <>
      <ApexCharts options={options} series={series} type='donut' width={300} height={300} />
      {/* <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={420}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart> */}
    </>
  );
};

export default FullBudget;