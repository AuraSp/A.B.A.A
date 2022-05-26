import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import './chart.css';
import { getAllUserIncomesOffAllMonth, getAllUserExpenseOffAllMonth } from '../../../api/lib/TransactionsAPI';

function YearsActivitiesChart({ userId, render }) {

    const [loading, setLoading] = useState(true);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);

    useEffect(() => {
        getAllUserIncomesOffAllMonth(userId).then((res) => {
            setIncome(res.data.data.income[0].dataInc);
        });
        getAllUserExpenseOffAllMonth(userId).then((res) => {
            setExpense(res.data.data.expense[0].dataEx);
        });
        setLoading(false)
    }, [userId])
    let category = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis',
        'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis']
    console.log(new Date().getMonth())
    const options = {
        chart: {
            type: 'bar',
            height: 300
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '60%'
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                fontWeight: 'bold',
                colors: ["#fff"]
            }
        },
        yaxis: {
            title: {
                text: 'Balansas',
                style: {
                    fontSize: '15px'
                }
            },
            labels: {
                show: true,
                style: {
                    fontSize: '15px'
                }
            }
        },
        xaxis: {
            labels: {
                rotate: -45,
                style: {
                    fontSize: '15px'
                }
            },
            type: 'date',
            categories:
                category
        },
        colors: ['#0d6efd', '#dc3545'],
        legend: {
            offsetY: 10
        },
        noData: {
            text: 'Trūksta duomenų...'
        }
    }
    const series = [
        {
            name: 'Pajamos',
            data: income
        },
        {
            name: 'Išlaidos',
            data: expense
        }
    ]

    return (
        <>
            {!loading &&
                <div>
                    <ApexCharts options={options} series={series} type="bar" height={350} />
                </div>
            }
        </>
    )
}

export default YearsActivitiesChart