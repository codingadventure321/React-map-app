import "./sidebar.scss";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">React karta</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">NAVIGACIJA</p>

          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <MapOutlinedIcon className="icon" />
              <span>Karta</span>
            </li>
          </Link>
          <Link to="/table" style={{ textDecoration: "none" }}>
            <li>
              <TableRowsOutlinedIcon className="icon" />
              <span>Tablični prikaz</span>
            </li>
          </Link>
          <p className="title">USLUGE</p>

          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Zapisi</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Postavke</span>
          </li>
          <p className="title">KORISNIK</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profil</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Odjava</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
