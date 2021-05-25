import React from "react";
import { MapContainer as LeasfletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, center, zoom, casesType }) {
  return (
    <div className="map">
      <h1> World Map </h1>
      <LeasfletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http:osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeasfletMap>
    </div>
  );
}

export default Map;
