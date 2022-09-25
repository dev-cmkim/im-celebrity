import axios from "axios";
import React, { useEffect, useState } from "react";

import "../assets/style.scss";
import { me } from "../assets/images";
import { UserList } from "../component";
import { strings } from "../configs";

const Project = () => {
  const [projectId, setProjectId] = useState(null);
  useEffect(() => {
    async function getProjectInfo() {
      const response = await axios.get("http://localhost:9000/project");
      setProjectId(response.data.id);
    }
    getProjectInfo();
  }, []);

  return (
    <div>
      <div className="header">
        <img src={me}></img>
        <span className="header_txt">{strings.main.currentUser}</span>
        <div className="line"></div>
        <span className="header_tit"> {strings.main.project.no} : {projectId}</span>
      </div>
      <UserList />
    </div>
  );
};

export { Project };
