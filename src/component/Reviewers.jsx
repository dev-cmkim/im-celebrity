// import React, { useEffect, useState } from "react";

// const Reviewers = (props) => {
//   const [userCnt, setUserCnt] = useState(null);
//   const [selectedUserCnt, setSelectedUserCnt] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(false);

//   useEffect(() => {
//     //신청자 목록 get
//     fetch("http://localhost:9000/projectRequests")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         setUserCnt(data.length);
//       });

//     //선정자 목록 get
//     fetch("http://localhost:9000/projectRequests?isChosen=true")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         setSelectedUserCnt(data.length);
//       });
//   }, []);
//   return (
//     <div className="section">
//       <div className="top_menu">
//         <div
//           onClick={() => {
//             setSelectedUser(false);
//           }}
//           className="active"
//         >
//           신청 리뷰어({userCnt})
//         </div>
//         <div
//           onClick={() => {
//             setSelectedUser(true);
//           }}
//         >
//           선정 리뷰어({selectedUserCnt})
//         </div>
//       </div>
//         {/* <UserList/> */}
//     </div>
//   );
// };

// export { Reviewers };
