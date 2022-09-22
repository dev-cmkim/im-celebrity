import axios from "axios";
import React, { useEffect, useState } from "react";

const Modal = (props) => {
  const { open, close, userId, userName, userNickName } = props;
  const [brandCnt, setBrandCnt] = useState(null);
  const [brandRequestsHistory, setBrandRequestHistory] = useState([]);

  // 모달 팝업이 오픈했을떼만 api를 호출하고싶음
  const getBrandHistory = async () => {
    try {
      console.log(userId);
      const response = await axios.get(
        "http://localhost:9000/brandRequestsHistory?userId",
        {
          params: {
            userId: userId,
          },
        }
      );
      // console.log(response)
      setBrandRequestHistory(response.data[0]);
      console.log(brandRequestsHistory)
      // setBrandCnt(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };
  if (open) {
    getBrandHistory();
  }


  return (
    <div className={open ? "open_modal modal" : "modal"}>
      {open ? (
        <div className="content">
          <h2>
            {userName}({userNickName})님\n 내 브랜드 참여 횟수
          </h2>
          <button className="btn_close" onClick={close}>
            닫기
          </button>
          <span>총 {brandCnt}회</span>
          <div className="brand_list_area">
            <table>
              <thead>
                <tr>
                  <td>프로젝트</td>
                  <td>제출결과물</td>
                </tr>
              </thead>
              <tbody>
                {(brandRequestsHistory || []).map((val, index) => (
                  <tr key={index}>
                    <td>
                      {val.sns}
                      {val.title}
                    </td>
                    <td>{val.reviewUrl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button>선정하기</button>
        </div>
      ) : null}
    </div>
  );
};

export { Modal };
