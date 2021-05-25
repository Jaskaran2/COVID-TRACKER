import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStats } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import Country from "./Country";
import Widgets from "./Widgets";
import Header from "./Header";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.476,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  //Runs a code based on a particular condition
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        //All the info regarding the countries
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  function cases(e) {
    setCasesType("cases");
  }

  function deaths(e) {
    setCasesType("deaths");
  }

  function recovered(e) {
    setCasesType("recovered");
  }

  return (
    <div className="app">
      <Header />
      <a name="top">
        <div className="app__left">
          <div className="app__header">
            <h1 className="heading"> COVID - 19 TRACKER </h1>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem value="worldwide"> Worldwide </MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}> {country.name} </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox
              active={casesType === "cases"}
              onClick={cases}
              casesType={casesType}
              title="Coronavirus cases"
              cases={prettyPrintStats(countryInfo.todayCases)}
              total={countryInfo.cases}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={recovered}
              casesType={casesType}
              title="Recovered"
              cases={prettyPrintStats(countryInfo.todayRecovered)}
              total={countryInfo.recovered}
            />
            <InfoBox
              active={casesType === "deaths"}
              onClick={deaths}
              casesType={casesType}
              title="Deaths"
              cases={prettyPrintStats(countryInfo.todayDeaths)}
              total={countryInfo.deaths}
            />
          </div>
        </div>
      </a>

      <Card className="app__right">
        <CardContent>
          <h3> Worldwide New {casesType} </h3>
          <LineGraph casesType={casesType} /> <h3> Live Cases By County </h3>
          <a name="table">
            <Table countries={tableData} />
          </a>
        </CardContent>
      </Card>

      <a name="graphs">
        <Country />
      </a>

      <a name="map">
        <Map
          className="app__right"
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </a>

      <a name="resources">
        <h2
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "royalblue",
          }}
        >
          From covid19india.org
        </h2>
        <Widgets />
      </a>
    </div>
  );
}

export default App;

// https://disease.sh/v3/covid-19/countries
