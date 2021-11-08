# Covid19-Charts

[![Netlify Status](https://api.netlify.com/api/v1/badges/59b044df-0adb-4c86-a56a-50351724a7e8/deploy-status)](https://app.netlify.com/sites/covid19-charts-newsclick/deploys)

This project is a live and customizable version of Newsclick's COVID-19 trajectory Charts and Maps

## Environment Variables

Place the environment variables in **.env** file in the root of the project folder. Please refer **.env.example** for example.

Following are the environment variables used in the project:
- **API_URL_COUNTRY**: Country wise daily stats in csv
- **API_URL_STATE**: State wise daily stats in csv
- **API_URL_CITY**: City wise daily stats in csv
- **API_URL_STATE_VACCINES**: State wise daily stats for vaccine in csv
- **API_URL_COVIDSUMMARY**: Summarised stats for India and World with time stamp in json
- **API_URL_STATES_GEOJSON**: States and UTs geojson
- **API_URL_DISTRICTS_GEOJSON**: Districts geojson
- **API_URL_STATE_COVID_JSON**: Latest covid stats for every state
- **API_URL_DISTRICT_COVID_JSON**: Latest covid stats for every district
- **MAPBOX_BOX_ACCESS_TOKEN**: This can be obtained by signing in to [Mapbox](https://www.mapbox.com).

## Getting Started

- First, install all the **node_modules** 

  ```bash
  npm install
  #or
  yarn install
  ```

- Secondly, run the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  ```

To get COVID-19 article open [http://localhost:9000/covid19-cases-graphs-maps-india-world](http://localhost:9000/covid19-cases-graphs-maps-india-world) from the browser to see the result.


## Deployement

While deploying on netlify:
- Publish directory ahould be **.next**.
- Provide environment variable on netlify.

Please refer to the [Netlify Blog post](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/) for more information 

## License

AGPL-3.0 License
