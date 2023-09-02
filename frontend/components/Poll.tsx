import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface props {
    candidates: string[]
    votes: number[]
}

const Poll: React.FC<props> = ({ candidates, votes }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Poll Results',
            },
        },
    };

    const data = {
        labels:candidates ,
        datasets: [
            {
                label: 'Candidates',
                data: votes,
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
            }
        ],
    };

    console.log(votes, candidates)

    return (
        candidates && votes &&
        <Bar options={options} data={data} />
    );
}

export default Poll
