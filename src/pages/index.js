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
              y: 10,
            },
            {
              x: new Date("04/29/2020"),
              y: 20,
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

  const countryData = jsonData.covidData.map((d) => {
    if(d.country === 'India') {
      return d.data.activeCases
    }
  })

  const data = {
    country: 'India',
    cases: countryData
  }
  // console.log(countryData)

  return (
    <div>
      <Dummy data={data} />
    </div>
  );
};

export default Home;
