import React from "react";

import "../assets/style.scss";
import { me } from "../assets/images";
import { UserList } from "../component";
import { strings } from "../configs";

const Project = () => {
  return (
    <div>
      <div className="header">
        <img src={me}></img>
        <span className="header_txt">{strings.main.currentUser}</span>
        <div className="line"></div>
        <span className="header_tit">{strings.main.project.name}</span>
      </div>
      <UserList />
    </div>
  );
};

export { Project };
