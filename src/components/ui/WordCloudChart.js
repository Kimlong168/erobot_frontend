"use client";
import { useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";

const WordCloudChart = (props) => {
  const [data, setData] = useState([]);
  const [max, setMax] = useState(200);

  useEffect(() => {
    // const values = props.data.map((r) => {
    //   return r.value;
    // });
    // setMax(Math.max(...values));
    console.log("props", props.data);
    setData(props.data);
  }, [props.data]);

  // @ts-ignore
  const fontSize = (word) => (100 * word.value) / max;
  // @ts-ignore
  const rotate = () => 0; // word.value % 90;

  if (data === undefined) {
    return <div className="text-red-600">Loading..</div>;
  }

  return (
    <WordCloud
      width={props.width}
      height={200}
      data={data}
      fontStyle="italic"
      fontWeight="bold"
      rotate={rotate}
      fontSize={fontSize}
      padding={2}
      spiral="rectangular" // "archimedean" or "rectangular"
      random={Math.random}
    />
  );
};

export default WordCloudChart;
