import React from 'react';
import {ApexOptions} from "apexcharts";
import ReactApexChart from "react-apexcharts";


const DashBoard = () => {

    const chartOptions: ApexOptions = {
        chart: {
            type: 'line', // 'line'과 같은 리터럴 타입을 사용
        },
        // chartSeries data와 개수 맞추어야 카테고리 이름이 나온다.
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr'],
        },
        // 그래프의 커브에 대한 상태를 지정
        stroke: {
            curve: 'smooth'
        },
        dataLabels: {
            enabled: false
        }
    };

    const chartSeries = [
        {
            name: 'Desktops',
            data: [10, 41, 35, 51,],
        },

    ];


    return (
        <div>
            대쉬
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={500} />
        </div>
    );
};

export default DashBoard;
