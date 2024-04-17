import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import LoginForm from "./UserComponents/LoginForm";
import RegisterForm from "./UserComponents/RegisterForm";

import CustomDialog from "./UserComponents/CustomDialog";

const HomePage = () => {
  useEffect(() => {
    const fetchDataAndCreateChart = async () => {
      const names = ["MSFT", "AAPL", "GOOG"];

      function createChart(series) {
        Highcharts.stockChart("container", {
          rangeSelector: {
            selected: 4,
          },
          yAxis: {
            labels: {
              format: "{#if (gt value 0)}+{/if}{value}%",
            },
            plotLines: [
              {
                value: 0,
                width: 2,
                color: "silver",
              },
            ],
          },
          plotOptions: {
            series: {
              compare: "percent",
              showInNavigator: true,
            },
          },
          tooltip: {
            pointFormat:
              '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true,
          },
          series,
        });
      }

      const promises = names.map((name) =>
        fetch(
          `https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/${name.toLowerCase()}-c.json`
        )
          .then((response) => response.json())
          .then((data) => ({ name, data }))
      );

      const series = await Promise.all(promises);
      createChart(series);
    };

    fetchDataAndCreateChart();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return <div id="container" />;
};

export default HomePage;
