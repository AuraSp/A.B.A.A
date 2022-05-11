import React, { useState, useEffect } from "react";
import ApexCharts from 'react-apexcharts';
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import './chart.css';

const ActivitiesChart = ({ incomes, expenses }) => {

    const incomeAmount = incomes.map((amount) => amount.amount);
    const expenseAmount = expenses.map((amount) => amount.amount);

    let incomeTotalSum = 0;
    let expenseTotalSum = 0;
    let balance = 0;
    var i = 0;

    //IncomeChartData
    for (i = 0; i < incomeAmount.length; i++) {
        incomeTotalSum += incomeAmount[i];
    }

    //ExpenseChartData
    for (i = 0; i < expenseAmount.length; i++) {
        expenseTotalSum += expenseAmount[i];
    }

    //BalanceChartData
    balance = incomeTotalSum - expenseTotalSum;
    let series = [balance, Math.trunc(incomeTotalSum), Math.trunc(expenseTotalSum)]


    const options = {
        chart: {
            type: 'donut',
            animations: {
                animateGradually: {
                    enabled: true
                },
            },
            offsetY: 15,
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 0,
                left: 0,
                blur: 3,
                opacity: 1
            }
        },
        labels: ['Likutis', 'Pajamos', 'Išlaidos'],
        legend: {
            show: false
        },
        colors: ['#ffc107', '#0d6efd', '#dc3545'],
        stroke: {
            show: false
        },
        dataLabels: {
            enabled: true,
            offsetY: -5
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
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            offsetY: -30
                        },
                        value: {
                            show: true,
                            offsetY: -20
                        },
                    }
                },
            }
        },
        grid: {
            padding: {
                bottom: -1
            }
        },
        noData: {
            text: 'Loading...'
        },
        responsive: [{
            breakpoint: 1100,
            options: {
                chart: {
                    height: 250,
                    offsetY: 15,
                }
            }
        }]
    }


    return (
        <>

            <div className='balancesummary col-lg-4 col-md-6 d-sm-none d-md-flex d-lg-flex flex-row flex-wrap align-content-center justify-content-center'>
                <div className="h-25 text-center">
                    <span><BsArrowUpShort className='bg-danger text-center p-1' />
                        <span className="ms-2">{Math.trunc(expenseTotalSum) + '€'}</span>
                    </span>
                </div>
                <div className="h-25 text-center">
                    <span><BsArrowDownShort className='bg-primary text-center p-1' />
                        <span className="ms-2">{Math.trunc(incomeTotalSum) + '€'}</span>
                    </span>
                </div>
                <div className="h-25 text-center">
                    <span><HiOutlineDatabase className='bg-warning text-center p-1' />
                        <span className="ms-2">{Math.trunc(balance) + '€'}</span>
                    </span>
                </div>
            </div>

            <div className='col-lg-4 col-md-6 col-sm-12 col-sm-12 fs-5'>
                <ApexCharts options={options} series={series} type='donut' width='100%' height={300} />
            </div>

            <div className='balancesummary col-sm-12 d-lg-none d-md-none d-sm-flex flex-row flex-wrap align-content-center justify-content-center my-4'>
                <div className="h-25 text-center">
                    <span><BsArrowUpShort className='bg-danger text-center p-1' />
                        <span className="ms-2">{Math.trunc(expenseTotalSum) + '€'}</span>
                    </span>
                </div>
                <div className="h-25 text-center">
                    <span><HiOutlineDatabase className='bg-warning text-center p-1' />
                        <span className="ms-2">{Math.trunc(balance) + '€'}</span>
                    </span>
                </div>
                <div className="h-25 text-center">
                    <span><BsArrowDownShort className='bg-primary text-center p-1' />
                        <span className="ms-2">{Math.trunc(incomeTotalSum) + '€'}</span>
                    </span>
                </div>
            </div>

        </>
    );
};


// import React, { useState, useEffect } from "react";
// import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
// import { HiOutlineDatabase } from "react-icons/hi";
// import { Chart as ChartJs, Tooltip, Title, ArcElement } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
// import './chart.css';

// ChartJs.register(
//     Tooltip, Title, ArcElement
// );


// function ActivitiesChart({ incomes, expenses }) {
//     const [data, setData] = useState({
//         datasets: [{
//             data: []
//         }]
//     });

//     const incomeAmount = incomes.map((amount) => amount.amount);
//     const expenseAmount = expenses.map((amount) => amount.amount);

//     let incomeTotalSum = 0;
//     let expenseTotalSum = 0;
//     let balance = 0;
//     var i = 0;

//     //IncomeChartData
//     for (i = 0; i < incomeAmount.length; i++) {
//         incomeTotalSum += incomeAmount[i];
//     }

//     //ExpenseChartData
//     for (i = 0; i < expenseAmount.length; i++) {
//         expenseTotalSum += expenseAmount[i];
//     }

//     let minusBalance;

//     //BalanceChartData
//     balance = incomeTotalSum - expenseTotalSum;

//     if (balance < 0) {
//         minusBalance = incomeTotalSum - expenseTotalSum;
//         balance = 0;
//     } else {
//         minusBalance = 0;
//     }

//     useEffect(() => {
//         const data = [];
//         data.push(balance, minusBalance, incomeTotalSum, expenseTotalSum)
//         setData({
//             datasets: [{
//                 data: data,
//                 backgroundColor: [
//                     'Yellow',
//                     'Black',
//                     'Blue',
//                     'Red'
//                 ],
//                 borderWidth: 0,

//             }
//             ],
//             labels: [
//                 'Likutis',
//                 'Minusinis likutis',
//                 'Pajamos',
//                 'Išlaidos'
//             ]
//         })
//     }, [incomeTotalSum, expenseTotalSum])


//     return (
//         <>
//             <div className='balancesummary col-lg-4 col-md-6 d-sm-none d-md-flex d-lg-flex flex-row flex-wrap align-content-center justify-content-center'>
//                 <div className="h-25 text-center">
//                     <span><BsArrowUpShort className='bg-danger text-center p-1' />
//                         <span className="ms-2">{Math.trunc(expenseTotalSum) + '€'}</span>
//                     </span>
//                 </div>
//                 <div className="h-25 text-center">
//                     <span><BsArrowDownShort className='bg-primary text-center p-1' />
//                         <span className="ms-2">{Math.trunc(incomeTotalSum) + '€'}</span>
//                     </span>
//                 </div>
//                 <div className="h-25 text-center">
//                     <span><HiOutlineDatabase className='bg-warning text-center p-1' />
//                         <span className="ms-2">{Math.trunc(balance) + '€'}</span>
//                     </span>
//                 </div>
//             </div>
//             <div className='col-lg-4 col-md-6 col-sm-12 col-sm-12 text-center'>
//                 <Doughnut data={data}
//                     height={300}
//                     width={300}
//                     />
//             </div>
//         </>
//         //  <div className='balancesummary col-sm-12 d-lg-none d-md-none d-sm-flex flex-row flex-wrap align-content-center justify-content-center my-4'>
//         //    <div className="h-25 text-center">
//         //      <span><BsArrowUpShort className='bg-danger text-center p-1' />
//         //        <span className="ms-2">{Math.trunc(expenseTotalSum) + '€'}</span>
//         //      </span>
//         //    </div>
//         //    <div className="h-25 text-center">
//         //      <span><HiOutlineDatabase className='bg-warning text-center p-1' />
//         //        <span className="ms-2">{Math.trunc(balance) + '€'}</span>
//         //      </span>
//         //    </div>
//         //    <div className="h-25 text-center">
//         //      <span><BsArrowDownShort className='bg-primary text-center p-1' />
//         //        <span className="ms-2">{Math.trunc(incomeTotalSum) + '€'}</span>
//         //      </span>
//         //    </div>
//         //  </div>

//     )
// }

export default ActivitiesChart