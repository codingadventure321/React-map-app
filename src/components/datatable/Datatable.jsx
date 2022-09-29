import "./datatable.scss";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
      <GridToolbarExport
        csvOptions={{
          fileName: "employeesDataBase",
          delimiter: ";",
          utf8WithBom: true,
        }}
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const Datatable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get("https://plovput.li-st.net/getObjekti");
    // var featureNames = [];

    // for (var i = 0; i < data.features.length; i++) {
    //   var currentFeature = data.features[i];

    //   var featureObject = currentFeature.properties;

    //   featureNames.push({ id: i, ...featureObject });
    // }
    // setTableData(featureNames);
    function tip(objekt) {
      switch (objekt) {
        case 9:
          return "9 - Svjetionik bez posade";
        case 10:
          return "10 - Svjetionik s posadom";
        case 11:
          return "11 - Obalno svjetlo";
        case 12:
          return "12 - Svjetleća oznaka";
        case 13:
          return "13 - Signalna oznaka";
        case 14:
          return "14 - Svjetleća plutača";
        case 15:
          return "15 - Signalna plutača";
        case 16:
          return "16 - Lučko svjetlo";
        case 17:
          return "17 - Signalna postaja";
        case 22:
          return "22 - Svjetleća oznaka pokrivenog smjera";
        case 23:
          return "23 - Signalna oznaka pokrivenog smjera";
        case 25:
          return "25 - Oznaka zabranjenog sidrenja";
        case 27:
          return "27 - Oznaka mosta";
        default:
          return "";
      }
    }
    const table = data.features.map((feature, index) => ({
      id: index,

      ...feature.properties,
      tip_objekta: tip(feature.properties.tip_objekta || ""),
    }));
    setTableData(table);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Employees
        <Link to="/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        // sx={{
        //   "& .MuiDataGrid-virtualScrollerRenderZone": {
        //     "& .MuiDataGrid-row": {
        //       "&:nth-child(2n)": {
        //         backgroundColor: "rgba(143, 139, 139, 0.141)",
        //       },
        //     },
        //   },
        // "& .MuiDataGrid-columnHeaders": {
        //   backgroundColor: "darkblue",
        //   fontSize: 16,
        // },
        // }}
        className="datagrid"
        rows={tableData}
        columns={userColumns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default Datatable;
