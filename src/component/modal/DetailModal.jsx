import axios from "axios";
import React, { useEffect, useState } from "react";
import { strings } from "../../configs";
import { CommonModal } from "./CommonModal";

const DetailModal = (props) => {
  const { open, close, userId, userName, userNickName, activedA } = props;
  const [brandCnt, setBrandCnt] = useState(null);
  const [brandRequestsHistory, setBrandRequestHistory] = useState([]);
  const [modalOpenC, setModalOpenC] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    // 모달 open 일때만 api 호출하도록
    if (open) {
      async function getBrandHistory() {
        const response = await axios.get(
          `${process.env.PUBLIC_URL}/brandRequestsHistory?usrId=`,
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
  //신청자일경우 선정버튼 , 선정자일경우 취소버튼 분기처리
  //리뷰어 선정
  const selectUser = (prop) => {
    setModalOpenC(true);
    setModalContent("select");
    async function patchUserId() {
      try {
        const response = await axios.patch(
          `${process.env.PUBLIC_URL}/projectRequests/${prop}`,
          {
            isChosen: "true",
          }
        );
      } catch (err) {
        setModalContent(err.response);
      }
    }
    patchUserId();
  };
  //리뷰어 취소
  const delateUser = (prop) => {
    setModalOpenC(true);
    setModalContent("delete");
    async function patchUserId() {
      try {
        const response = await axios.patch(
          `${process.env.PUBLIC_URL}/projectRequests/${prop}`,
          {
            isChosen: "false",
          }
        );
      } catch (err) {
        setModalContent(err.response);
      }
    }
    patchUserId();
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
              <button
                onClick={(e) => {
                  activedA ? selectUser(userId) : delateUser(userId);
                }}
                className="btn_select_user"
              >
                {activedA
                  ? `${strings.button.select}`
                  : `${strings.button.delete}`}
              </button>
            </div>
          </div>
          <CommonModal
            open={modalOpenC}
            close={(e) => {
              location.reload();
            }}
            userCnt={1}
            content={modalContent}
          />
        </div>
      ) : null}
    </div>
  );
};

export { DetailModal };
