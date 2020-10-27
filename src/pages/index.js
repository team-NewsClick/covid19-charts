import LineChart from "../components/chart.js";
import { useState, useEffect } from "react";

const Home = () => {
  const { covidData } = getData();
  return (
    <div>
      <h2>Graphical representation of confirmed cases of COVID-19</h2>
      <LineChart covidData={covidData} />
    </div>
  );
};

function getData() {
  const [covidData, setcovidData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.API_URL}/covid`)
      .then((res) => res.json())
      .then(setcovidData);
  }, []);
  return { covidData };
}

export default Home;
