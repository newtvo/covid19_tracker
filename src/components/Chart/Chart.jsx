import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);
    
    const lineChart = (
        dailyData[0] ? ( 
            <Line 
                data = {{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#FF0000',
                        backgroundColor: 'rgba(255,1,0,0.38)',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: '#8A36FF',
                        backgroundColor: 'rgba(138,54,255,0.5)',
                        fill: true,
                    },  {
                        data: dailyData.map((data) => data.recovered),
                        label: 'Recovered',
                        borderColor: 'green',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        fill: true,
                      }],
                }}
            />) : null
    );

    const barChart = (
        confirmed ? (
            <Bar 
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(0, 179, 80, 0.5)',
                        'rgba(138,54,255,0.5)',
                    ],
                    data:[confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend: {display: false },
                title: { display: true, text:`Current State in ${country}`}
            }}
            />
        ) : null
    )

    return (
       <div className={styles.container}>
        {country ? barChart : lineChart }
       </div>
    )
}

export default Chart;