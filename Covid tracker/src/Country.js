import React, { useEffect, useState } from "react";
import "./Country.css";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "./axios";
import { fetchData } from "./axios";
import Chart from "./Chart";

function Country() {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [graphData, setGraphData] = useState({});
  const [mapCountry, setMapCountry] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchAPI();
  });

  useEffect(() => {
    const graph = async () => {
      const data = await fetchData();

      setGraphData(data);
    };

    graph();
  }, []);

  useEffect(() => {
    const graphsData = async (country) => {
      const data = await fetchData(country);

      setGraphData(data);
    };
    graphsData(mapCountry);
  }, [mapCountry]);

  console.log("Picked country is >>>>>>>>>>>>>>", mapCountry);
  console.log("The respective country data is", graphData);

  return (
    <div>
      <FormControl className="form__control">
        <NativeSelect
          defaultValue=""
          onChange={(e) => setMapCountry(e.target.value)}
          className="native__select"
        >
          <option vlaue="global"> Global </option>
          {fetchedCountries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      <Chart data={graphData} country={mapCountry} />
    </div>
  );
}

export default Country;
