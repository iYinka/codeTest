import React, { useState, useEffect } from "react";
import styles from "./styles/Barchart.module.css";
import { Bar } from "react-chartjs-2";
import { Spin } from "antd";
import Chart from "chart.js/auto";

const BarChart = () => {
    const [awardsData, setAwardsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const AwardChartData = async () => {
        setIsLoading(true);

        try {
            await fetch(
                "https://imdb8.p.rapidapi.com/actors/get-awards?nconst=nm0001667",
                {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                        "x-rapidapi-key":
                            "01a4ada577msh532d0e17b10df82p191e8fjsnacbe8403426e",
                    },
                }
            )
                .then((response) => response.json())
                .then((json) => {
                    setAwardsData(json?.resource?.awards);
                    // console.log(json.resource.awards.year);
                });
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const result = awardsData.map((x) => x.year);
    const awardYear = result.filter((item, i, ar) => ar.indexOf(item) === i);

    const numArray = result.sort(function (a, b) {
        return a - b;
    });

    function awardCounts(array) {
        let a = [],
            b = [],
            numArray = [...array], // clone array so we don't change the original when using .sort()
            prev;

        numArray.sort();
        for (let element of numArray) {
            if (element !== prev) {
                a.push(element);
                b.push(1);
            } else ++b[b.length - 1];
            prev = element;
        }

        return [a, b];
    }

    const new_result = awardCounts(numArray);
    const numberOfAwards = new_result[1];
    // console.log("newCurr", "[" + new_result[1] + "]");
    // console.log("......", numArray);

    // console.log({ awardYear });

    useEffect(() => {
        AwardChartData();
    }, []);

    const data = {
        labels: awardYear,
        datasets: [
            {
                label: "Awards received",
                backgroundColor: "#0A8E26",
                borderColor: "#BBF3C7",
                borderWidth: 1,
                data: numberOfAwards,
            },
        ],
    };

    // console.log("AWARDS", awardsData);

    return (
        <div className={styles.charts}>
            <div className={styles.topBar}>
                <h4>Performance Awards by Year</h4>
            </div>

            <div className={styles.chartContainer}>
                {isLoading ? (
                    <div className={styles.loader}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <Bar
                        data={data}
                        options={{
                            reponsive: true,
                            maintainAspectRatio: false,
                            title: {
                                display: false,
                                text: "Performace Report",
                                fontSize: 14,
                            },
                            options: {
                                legend: {
                                    display: true,
                                    position: "top",
                                    fontColor: "white",
                                    fontSize: 20,
                                    labels: {
                                        fontColor: "white",
                                        fontSize: 20,
                                    },
                                },
                                responsive: true,
                                scales: {
                                    yAxes: [
                                        {
                                            stacked: false,
                                            scaleLabel: {
                                                display: true,
                                                fontColor: "white",
                                                fontSize: 25,
                                                labelString: "Faction Points",
                                            },
                                            ticks: {
                                                fontColor: "white",
                                                fontSize: 20,
                                                min: 0,
                                            },
                                            gridLines: {
                                                color: "white",
                                            },
                                        },
                                    ],
                                    xAxes: [
                                        {
                                            stacked: false,
                                            scaleLabel: {
                                                display: true,
                                                fontColor: "white",
                                                fontSize: 25,
                                                labelString: "Day",
                                            },
                                            ticks: {
                                                fontColor: "white",
                                                fontSize: 20,
                                                min: 0,
                                            },
                                        },
                                    ],
                                },
                            },
                        }}
                    />
                )}
            </div>
            <div className={styles.bottomBar}>
                <h4>Powered by RapidAPI </h4>
            </div>
        </div>
    );
};

export default BarChart;
