import axios from "axios";
import React, { useEffect, useState } from "react";
import { strings } from "../configs";

const Modal = (props) => {
  const { open, close, userId, userName, userNickName } = props;
  const [brandCnt, setBrandCnt] = useState(null);
  const [brandRequestsHistory, setBrandRequestHistory] = useState([]);

  useEffect(() => {
    // 모달팝업 open 시에 api 호출
    if (open) {
      async function getBrandHistory() {
        const response = await axios.get(
          "http://localhost:9000/brandRequestsHistory?usrId=",
          {
            params: {
              userId: userId,
            },
          }
        );
        setBrandRequestHistory(response.data[0].list);
        setBrandCnt(response.data[0].list.length);
      }
      getBrandHistory();
    }
  }, [userId]);

  const openSnsUrl = (prop) => {
    window.open(prop);
  };

  //sns icon 셋팅값
  const settingSnsBtn = (prop) => {
    switch (prop) {
      case "Instagram":
        return <span className="icon_sns icon_insta">I</span>;
      case "NaverBlog":
        return <span className="icon_sns icon_blog">N</span>;
      default:
    }
  };

  return (
    <div className={open ? "open_modal modal" : "modal"}>
      {open ? (
        <div className="content_wrap">
          <div className="content">
            <h2>
              {userName}({userNickName}){strings.popup.title}
            </h2>
            <button className="btn_close" onClick={close}>
              {strings.button.close}
            </button>
            <h3>
              {strings.popup.all}
              {brandCnt}
              {strings.popup.count}
            </h3>
            <div className="brand_list_area">
              <table>
                <thead>
                  <tr>
                    <td>{strings.popup.project}</td>
                    <td>{strings.popup.result}</td>
                  </tr>
                </thead>
                <tbody>
                  {(brandRequestsHistory || []).map((val, index) => (
                    <tr key={index}>
                      <td>
                        {settingSnsBtn(val.sns)}
                        <span>{val.title}</span>
                      </td>
                      <td>
                        {val.reviewUrl ? (
                          <button
                            onClick={() => {
                              openSnsUrl(val.reviewUrl);
                            }}
                          >
                            {strings.popup.button.abled}
                          </button>
                        ) : (
                          <button className="btn_disabled" disabled>
                            {strings.popup.button.disabled}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bottom_btn_area">
              <button onClick={() => {console.log('리뷰어 선정 !!!!')}} className="btn_select_user">
                {strings.button.select}
              </button>
            </div>
          </div>

        </div>
      ) : null}
    </div>
  );
};

export { Modal };
