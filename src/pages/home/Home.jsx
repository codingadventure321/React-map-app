import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import markerIconPng from "../../images/star-icon.png";
import { Icon } from "leaflet";

const Home = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get("https://plovput.li-st.net/getObjekti");
    setTableData(data);
  };

  const layers = [
    null,
    "Split",
    "Pula",
    "Ploče",
    "Rijeka",
    "Dubrovnik",
    "Senj",
    "Zadar",
    "Šibenik",
  ];
  var southWest = [41.50943, 13.09819],
    northEast = [46.49537, 18.83504];
  // bounderies = L.latLngBounds(southWest, northEast);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <MapContainer
          className="markercluster-map"
          center={[44.815, 15.967]}
          zoom={7.4}
          minZoom={7}
          maxBounds={[southWest, northEast]}
          maxBoundsViscosity={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LayersControl>
            {layers.map((layer, index) => (
              <LayersControl.Overlay
                key={`layer-${index}`}
                checked
                name={layer ? `Lučka kapetanija ${layer}` : ""}
              >
                <LayerGroup>
                  <MarkerClusterGroup>
                    {tableData.features
                      ? tableData.features
                          .filter(
                            (features) =>
                              features.properties.lucka_kapetanija === layer
                          )
                          .map((feature, index) => {
                            const tipObjekta =
                              feature.properties.tip_objekta || "";
                            function tip(objekt) {
                              switch (objekt) {
                                case 9:
                                  return "Svjetionik bez posade";
                                case 10:
                                  return "Svjetionik s posadom";
                                case 11:
                                  return "Obalno svjetlo";
                                case 12:
                                  return "Svjetleća oznaka";
                                case 13:
                                  return "Signalna oznaka";
                                case 14:
                                  return "Svjetleća plutača";
                                case 15:
                                  return "Signalna plutača";
                                case 16:
                                  return "Lučko svjetlo";
                                case 17:
                                  return "Signalna postaja";
                                case 22:
                                  return "Svjetleća oznaka pokrivenog smjera";
                                case 23:
                                  return "Signalna oznaka pokrivenog smjera";
                                case 25:
                                  return "Oznaka zabranjenog sidrenja";
                                case 27:
                                  return "Oznaka mosta";
                                default:
                                  return "";
                              }
                            }

                            return (
                              <Marker
                                key={index}
                                position={[
                                  feature.geometry.coordinates[1],
                                  feature.geometry.coordinates[0],
                                ]}
                                icon={
                                  new Icon({
                                    iconUrl: markerIconPng,
                                    iconSize: [30, 30],
                                    iconAnchor: [15, 15],
                                  })
                                }
                              >
                                <Popup className="popup">
                                  <div
                                    style={{
                                      color: "blue",
                                      textAlign: "center",
                                    }}
                                  >
                                    <h4>{feature.properties.naziv_objekta} </h4>
                                    <div
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        marginBottom: "2px",
                                      }}
                                    >
                                      <p>
                                        PS broj:{" "}
                                        {feature.properties.ps_br || ""}
                                      </p>
                                      <p>
                                        E broj: {feature.properties.e_br || ""}{" "}
                                      </p>
                                      <p>{tip(tipObjekta)} </p>
                                      <p>
                                        {feature.properties.lucka_kapetanija}
                                      </p>
                                    </div>
                                  </div>
                                </Popup>
                              </Marker>
                            );
                          })
                      : ""}
                  </MarkerClusterGroup>
                </LayerGroup>
              </LayersControl.Overlay>
            ))}
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
