import Head from "next/head";
import styles from "../styles/Home.module.css";
import LineChart from "../components/chart.js";

export default function Home() {
  return (
    <div>
      Hello World!
      <LineChart />
    </div>
  );
}
