// import "./single.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";

// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useParams } from "react-router-dom";
// import { useState } from "react";

// const Single = ({ inputs }) => {
//   const { userId } = useParams();

//   const [file, setFile] = useState("");
//   return (
//     <div className="single">
//       <Sidebar />
//       <div className="singleContainer">
//         <Navbar />

//         <div className="userTop">
//           <h1>Edit User</h1>
//         </div>
//         <div className="userBottom">
//           <form>
//             <div className="userLeft">
//               {inputs.map((input, index) => {
//                 const userContent = Object.values(userRows[userId - 1])[
//                   index + 2
//                 ];
//                 return (
//                   <div className="formInput" key={input.id}>
//                     <label>{input.label}</label>
//                     <input type={input.type} placeholder={userContent}></input>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="userRight">
//               <img
//                 className="userUpdateImg"
//                 src={
//                   file ? URL.createObjectURL(file) : userRows[userId - 1].img
//                 }
//                 alt=""
//               />
//               <div className="userImageSelector">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </div>
//               <button>Update</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Single;
