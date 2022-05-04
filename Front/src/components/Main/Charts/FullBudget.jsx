import React from "react";
import ApexCharts from 'react-apexcharts';
import { MdAccountCircle, MdOutlineDashboardCustomize, MdAccountBalance } from "react-icons/md";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { AiOutlineTransaction } from "react-icons/ai";
import { HiOutlineDatabase } from "react-icons/hi";
// import { ExportToCsv } from 'export-to-csv';
import './s.css'
const FullBudget = ({ data }) => {

  const income = data.filter(item => item.type === 'income');
  const expense = data.filter(item => item.type === 'expense');

  const incomeAmount = income.map((amount) => amount.amount)
  const expenseAmount = expense.map((amount) => amount.amount)

  let incomeTotalSum = 0;
  var i = 0;
  for (i = 0; i < incomeAmount.length; i++) {
    incomeTotalSum += incomeAmount[i];
  }
  let expenseTotalSum = 0;
  for (i = 0; i < expenseAmount.length; i++) {
    expenseTotalSum += expenseAmount[i];
  }

  const series = [Math.trunc(incomeTotalSum), Math.trunc(expenseTotalSum)];
  const options = {
    chart: {
      type: 'donut',
      animations: {
        animateGradually: {
          enabled: true
        },
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          pan: true
        },
        export: {
          csv: {
            filename: 'Išlaidos',
            columnDelimiter: '|',
            headerCategory: 'Kategorija',
            headerValue: 'Suma',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            show:false
          }
        }
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 1
      }
    },
    labels: ['Pajamos', 'Išlaidos'],
    legend: {
      show: false
    },
    colors: ['#0d6efd', '#dc3545'],
    stroke: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    sparkline: {
      enabled: false
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut: {
          size: '75%',
          customScale: 0.8,
          labels: {
            show: true,
            name: {
              show: true
            },
            value: {
              show: true
            },
          }
        },
        // expandOnClick: false,
      }
    },
    grid: {
      padding: {
        bottom: -100
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        }
      }
    }]
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
      <div className='col-lg-4 col-md-6 col-sm-12 d-flex flex-row flex-wrap fs-5'>
        <ApexCharts options={options} series={series} type='donut' width='100%' height={300} />
      </div>
      <div className='col-lg-4 col-md-6 col-sm-12 balancesummary d-flex flex-row flex-wrap fs-5'>
        <div><span><BsArrowUpShort className='bg-danger text-center p-1' /><span>{Math.trunc(expenseTotalSum)}</span></span></div>
        <div><span><BsArrowDownShort className='bg-primary text-center p-1' />{Math.trunc(incomeTotalSum)}</span></div>
        <div><span><HiOutlineDatabase className='bg-warning text-center p-1' />Likutis</span></div>
      </div>
    </>
  );
};

export default FullBudget;