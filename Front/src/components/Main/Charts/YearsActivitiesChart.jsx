import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import './chart.css';
import { getAllUserIncomesOffAllMonth, getAllUserExpenseOffAllMonth } from '../../../api/lib/TransactionsAPI';

function YearsActivitiesChart({ userId, render }) {

    const [loading, setLoading] = useState(true);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        getAllUserIncomesOffAllMonth(userId).then((res) => {
            setIncome(res.data.data.income)
        });
        getAllUserExpenseOffAllMonth(userId).then((res) => {
            setExpense(res.data.data.expense)
        });
        setLoading(false)
    }, [userId])
    console.log(income, expense)

    // const myDataset = [
    //     [
    //         { x: "a", y: 1 },
    //         { x: "b", y: 21 },
    //         { x: "c", y: 3 },
    //         { x: "d", y: 2 },
    //         { x: "e", y: 1 }
    //     ],
    //     [
    //         { x: "a", y: 2 },
    //         { x: "b", y: 3 },
    //         { x: "c", y: 4 },
    //         { x: "d", y: -2 },
    //         { x: "e", y: -6 }
    //     ],
    //     [
    //         { x: "a", y: 1 },
    //         { x: "b", y: 2 },
    //         { x: "c", y: 3 },
    //         { x: "d", y: 4 },
    //         { x: "e", y: 4 }
    //     ]
    // ];
    // const dataset = myDataset;
    // const series = [1.45, 5.42, 5.9]
    // const options = {
    //     chart: {
    //         type: 'bar',
    //         height: 350
    //     }
    // plotOptions: {
    //     bar: {
    //         colors: {
    //             ranges: [{
    //                 from: -100,
    //                 to: -46,
    //                 color: '#F15B46'
    //             }, {
    //                 from: -45,
    //                 to: 0,
    //                 color: '#FEB019'
    //             }]
    //         },
    //         columnWidth: '80%',
    //     }
    // },
    // dataLabels: {
    //     enabled: false,
    // },
    // yaxis: {
    //     title: {
    //         text: 'Growth',
    //     },
    //     labels: {
    //         formatter: function (y) {
    //             return y.toFixed(0) + "%";
    //         }
    //     }
    // },
    // xaxis: {
    //     type: 'datetime',
    //     categories: [
    //         '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
    //         '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
    //         '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01',
    //         '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01',
    //         '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01',
    //         '2013-07-01', '2013-08-01', '2013-09-01'
    //     ],
    //     labels: {
    //         rotate: -90
    //     }
    // }
    // }
    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: [{
                        from: -100,
                        to: -46,
                        color: '#F15B46'
                    }, {
                        from: -45,
                        to: 0,
                        color: '#FEB019'
                    }]
                },
                columnWidth: '80%',
            }
        },
        dataLabels: {
            enabled: true,
        },
        yaxis: {
            title: {
                text: 'Balansas',
            },
            labels: {
                formatter: function (y) {
                    return y.toFixed(0) + "%";
                }
            }
        },
        xaxis: {
            type: 'date',
            categories: [
                'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'
            ],
            labels: {
                rotate: -90
            }
        }
    }
    const series = [
        {
            name: 'wef',
            data: [2]
        },

    ]

    return (
        <>
            <div>
                <ApexCharts options={options} series={series} type="bar" height={350} />
            </div>

        </>
    )
}

export default YearsActivitiesChart