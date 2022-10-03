import "./datatable.scss";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import axios from "axios";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
      <GridToolbarExport
        csvOptions={{
          fileName: "objektiSigurnostiPlovidbe",
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

  const fetchData = () => {
    // const { data } = await axios.get("https://rosp.plovput.hr/getObjekti/");
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
    const table = userRows[0].features.map((feature, index) => ({
      id: index,

      ...feature.properties,
      tip_objekta: tip(feature.properties.tip_objekta || ""),
    }));
    setTableData(table);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">Objekti sigurnosti plovidbe</div>
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
        rows={tableData ? tableData : <CircularProgressbar value={66} />}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default Datatable;
