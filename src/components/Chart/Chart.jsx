import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    });
    
    const lineChart = (
        dailyData[0] ? ( 
            <Line 
                data = {{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#FF0000',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: '#8A36FF',
                        backgroundColor: 'rgba(138,54,255,0.5)',
                        fill: true,
                    }],
                }}
            />) : null
       
    );

    return (
       <div className={styles.container}>
        { lineChart }
       </div>
    )
}

export default Chart;