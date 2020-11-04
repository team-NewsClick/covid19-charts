// import CovidDashboard from "../components/CovidDashboard.js";
import Dummy from "../components/Dummy.js";

const Home = () => {
  const jsonData = {
    labels: ["activeCases", "totalDeaths"],
    covidData: [
      {
        country: "India",
        data: {
          activeCases: [
            {
              x: new Date("04/28/2020"),
              y: 5,
            },
            {
              x: new Date("04/29/2020"),
              y: 15,
            },
            {
              x: new Date("04/30/2020"),
              y: 6,
            },
          ],
          totalDeaths: [
            {
              x: new Date("04/28/2020"),
              y: 4,
            },
            {
              x: new Date("04/29/2020"),
              y: 8,
            },{
              x: new Date("04/30/2020"),
              y: 10,
            },
          ],
        },
      },
      {
        country: "China",
        data: {
          activeCases: [
            {
              x: new Date("04/28/2020"),
              y: 2,
            },
            {
              x: new Date("04/29/2020"),
              y: 20,
            },{
              x: new Date("04/30/2020"),
              y: 15,
            },
          ],
          totalDeaths: [
            {
              x: new Date("04/28/2020"),
              y: 1,
            },
            {
              x: new Date("04/29/2020"),
              y: 2,
            },
          ],
        },
      },
    ],
  };

  return (
    <div>
      <Dummy data={jsonData} />
    </div>
  );
};

export default Home;
