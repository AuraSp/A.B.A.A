import React, { useState, useEffect } from "react";
import ApexCharts from 'react-apexcharts';
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { ExportToCsv } from 'export-to-csv';
import './s.css';
import { deleteIncomeTransactions, deleteExpenseTransactions, getAllUsers, findIncomesAndUpdate, findExpensesAndUpdate, addNewIncome } from '../../../api/lib/TransactionsAPI';

const FullBudget = ({ data }) => {

  const income = data.filter(item => item.type === 'income');
  const expense = data.filter(item => item.type === 'expense');
  const incomeAmount = income.map((amount) => amount.amount)
  const expenseAmount = expense.map((amount) => amount.amount)

  let incomeTotalSum = 0;
  var i = 0;
  for (i = 0; i < incomeAmount.length; i++) {
    incomeTotalSum += incomeAmount[i];
    incomeTotalSum += incomeAmount[i];
  }
  let expenseTotalSum = 0;
  for (i = 0; i < expenseAmount.length; i++) {
    expenseTotalSum += expenseAmount[i];
  }

  let balance = 0;
  balance = incomeTotalSum - expenseTotalSum;

  let minusBalance = balance;
  if (balance < 0) {
    minusBalance += incomeTotalSum;
    console.log(minusBalance)
  }

  const series = [balance, minusBalance, Math.trunc(incomeTotalSum), Math.trunc(expenseTotalSum)]

  const options = {
    chart: {
      id: 'barQuarter',
      type: 'donut',
      animations: {
        animateGradually: {
          enabled: true
        },
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 1
      }
    },
    labels: ['Likutis', 'Minusas', 'Pajamos', 'Išlaidos'],
    legend: {
      show: false
    },
    colors: ['#ffc107', '#000', '#0d6efd', '#dc3545'],
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
          customScale: 0.2,
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
      }
    },
    grid: {
      padding: {
        bottom: -50
      }
    },
    noData: {
      text: 'Loading...'
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


  return (
    <>
      <div className='col-lg-4 col-md-6 col-sm-12 d-flex flex-row flex-wrap fs-5'>
        <ApexCharts options={options} series={series} type='donut' width='100%' height={300} />
      </div>
      <div className='col-lg-4 col-md-6 col-sm-12 balancesummary d-flex flex-row flex-wrap fs-5'>
        <div><span><BsArrowUpShort className='bg-danger text-center p-1' /><span>{Math.trunc(expenseTotalSum)}</span></span></div>
        <div><span><BsArrowDownShort className='bg-primary text-center p-1' />{Math.trunc(incomeTotalSum)}</span></div>
        <div><span><HiOutlineDatabase className='bg-warning text-center p-1' />{Math.trunc(balance)}</span></div>
      </div>
    </>
  );
};

export default FullBudget;
