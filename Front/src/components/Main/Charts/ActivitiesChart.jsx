import React, { useEffect, useState } from "react";
import ApexCharts from 'react-apexcharts';
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import './chart.css';
import { getUserIncomeByMonth, getUserExpenseByMonth } from '../../../api/lib/TransactionsAPI';

const ActivitiesChart = ({ userId, render }) => {

    let [totalNum, setTotalNum] = useState(0);
    let [incomeThisMonth, setIncomeThisMonth] = useState(0);
    let [expenseThisMonth, setExpenseThisMonth] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserIncomeByMonth(userId).then((res) => {
            setIncomeThisMonth(res.data.data.income)
        });
        getUserExpenseByMonth(userId).then((res) => {
            setExpenseThisMonth(res.data.data.expense)
        });
        setTotalNum(+incomeThisMonth - expenseThisMonth);
        setLoading(false)
    }, [render, expenseThisMonth, incomeThisMonth, totalNum, userId])

    let series = [totalNum, incomeThisMonth, expenseThisMonth]
    const options = {
        chart: {
            type: 'donut',
            animations: {
                animateGradually: {
                    enabled: true
                },
            },
            offsetY: 30,
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 0,
                left: 0,
                blur: 3,
                opacity: 1
            },
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
            enabled: false,
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
                            offsetY: -35
                        },
                        value: {
                            show: true,
                            offsetY: -25
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
        }
    }


    return (
        <>
            <div className='balancesummary col-lg-4 col-md-6 d-sm-none d-md-flex d-lg-flex flex-row flex-wrap align-content-center justify-content-center'>
                <div className="h-25 text-center">
                    <span><BsArrowUpShort className='bg-danger text-center p-1' />
                        <span className="ms-2">{Math.trunc(expenseThisMonth) + '€'}</span>
                    </span>
                </div>
                <div className="h-25 text-center">
                    <span><BsArrowDownShort className='bg-primary text-center p-1' />
                        <span className="ms-2">{Math.trunc(incomeThisMonth) + '€'}</span>
                    </span>
                </div>
                <div className="h-25 text-center">
                    <span><HiOutlineDatabase className='bg-warning text-center p-1' />
                        <span className="ms-2">{Math.trunc(totalNum) + '€'}</span>
                    </span>
                </div>
            </div>
            {!loading &&
                <div className='chart col-lg-4 col-md-6 col-sm-12 col-sm-12 fs-lg-5'>
                    <ApexCharts options={options} series={series} type='donut' width='100%' height={280} />
                </div>
            }
            <div className='balancesummary col-sm-12 d-lg-none d-md-none d-sm-flex flex-row flex-wrap align-content-center justify-content-center my-4'>
                <div className="h-25 text-center">
                    <span><BsArrowUpShort className='bg-danger text-center p-1' />
                        <span className="ms-2">{Math.trunc(expenseThisMonth) + '€'}</span>
                    </span>
                </div>
                <div className="h-25 text-center">
                    <span><HiOutlineDatabase className='bg-warning text-center p-1' />
                        <span className="ms-2">{Math.trunc(totalNum) + '€'}</span>
                    </span>
                </div>
                <div className="h-25 text-center">
                    <span><BsArrowDownShort className='bg-primary text-center p-1' />
                        <span className="ms-2">{Math.trunc(incomeThisMonth) + '€'}</span>
                    </span>
                </div>
            </div>
        </>
    );
};

export default ActivitiesChart