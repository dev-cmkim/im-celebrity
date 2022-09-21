import axios from "axios";
import React, { useEffect, useState } from "react";

const Modal = (props) => {
  const { open, close, userName, userNickName } = props;
  const [brandCnt, setBrandCnt] = useState(null);
  const [brandRequestsHistory, setBrandRequestHistory] = useState([]);

  useEffect(() => {
    async function getBrandHistory() {
      const response = await axios.get(
        "http://localhost:9000/brandRequestsHistory?"
      )
      setBrandRequestHistory(response.data);
      setBrandCnt(response.data.length);
    }
    getBrandHistory()
  }, []);

  return (
    <div className={open ? "open_modal modal" : "modal"}>
      {open ? (
        <div className="section">
          <h2>
            {userName}({userNickName})님\n 내 브랜드 참여 횟수
          </h2>
          <button className="btn_close" onClick={close}>
            닫기
          </button>
          <span>총 {brandCnt}회</span>
          <div className="brand_list_area">
            <ul>
              <li>
                <div>프로젝트</div>
                <div>제출결과물</div>
              </li>
              {brandRequestsHistory.map((val) => (
                <li key={brandCnt}>
                  <div>
                    {val.list.sns}
                    {val.list.title}
                  </div>
                  <div>{val.list.reviewUrl}</div>
                </li>
              ))}
            </ul>
          </div>
          <button>선정하기</button>
        </div>
      ) : null}
    </div>
  );
};

export { Modal };
