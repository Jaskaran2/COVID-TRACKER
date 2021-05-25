import React, { useEffect, useState } from "react";
import "./Chart.css";
import { fetchDailyData } from "./axios";
import { Line, Bar } from "react-chartjs-2";

function Chart({ data, country }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const lineChart =
    dailyData.length !== 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["orange", "greenyellow", "red"],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: {
          dipslay: false,
        },
        title: {
          display: true,
          text: `${country}`,
        },
      }}
    />
  ) : null;

  return (
    <div className="container">
      <h1> Graphical Representation of cases and deaths </h1>{" "}
      {country ? barChart : lineChart}{" "}
    </div>
  );
}

export default Chart;
