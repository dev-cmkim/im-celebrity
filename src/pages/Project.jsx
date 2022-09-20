import React, { useEffect, useState } from "react";
import "../assets/style.scss";
import { UserList } from "../component";

const Project = () => {
  const [projectId, setProjectId] = useState(null);
  useEffect(() => {
    fetch("http://localhost:9000/project")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProjectId(data.id);
      });
  }, []);

  return (
    <div>
      <div className="header">
        <span className="header_txt">모집현황</span>
        <div className="line"></div>
        <span className="header_tit"> 프로젝트번호 : {projectId}</span>
      </div>
      <UserList />
    </div>
  );
};

export { Project };
