import { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist";

const Plot = ({ data }) => {
  const chartRef = useRef(null);

  // console.log("data: ", data);

  useEffect(() => {
    const chartNode = chartRef.current;

    // const data = [
    //   {
    //     x: ["Residential", "Non-Residential", "Utility"],
    //     y: [2.2, 26, 55],
    //     type: "bar",
    //   },
    // ];

    const layout = {
      title: "",
      height: 450,
      width: 700,
      paper_bgcolor: "black", // Background color outside the plot
      plot_bgcolor: "black", 
      font: {color: "white"},
      xaxis: {
        title: {
          text: "",
        },
        type: "category",
      },
      yaxis: {
        title: {
          text: "",
        },
      },
    };

    const config = {
      displayModeBar: false, // Disable the mode bar (includes zoom and pan icons)
      responsive: false, // Disable auto resizing
      showSendToCloud: false, // Disable the 'send to cloud' link
    };

    Plotly.newPlot(chartNode, data, layout, config);

    // Cleanup on unmount
    return () => {
      Plotly.purge(chartNode);
    };
  }, [data]);

  return (
    <>
      <div ref={chartRef} />
    </>
  );
};

export default Plot;
