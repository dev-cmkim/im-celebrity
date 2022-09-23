import axios from "axios";
import React, { useEffect, useState } from "react";
import { strings } from "../configs";
import { Modal } from "./Modal";

const UserList = () => {
  const [userCnt, setUserCnt] = useState(null);
  const [selectedUserCnt, setSelectedUserCnt] = useState(null);

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userNickName, setUserNickName] = useState(null);

  const [activedA, setActivedA] = useState(true);
  const [activedB, setActivedB] = useState(false);

  const [bChecked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const [btnActive, setBtnActive] = useState(false);

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get(
        "http://localhost:9000/projectRequests?isChosen=false"
      );
      setUserCnt(response.data.length);
      setUsers(response.data);
      //초깃값설정
      setUsersList(response.data);
    }
    getUsers();

    async function getSelectedUsers() {
      const response = await axios.get(
        "http://localhost:9000/projectRequests?isChosen=true"
      );
      setSelectedUserCnt(response.data.length);
      setSelectedUsers(response.data);
    }
    getSelectedUsers();
  }, []);
  //리뷰어 선정
  // useEffect(() => {
  //   if (click) {
  //     async function selecteUser(prop) {
  //       const response = await axios.patch(
  //         `http://localhost:9000/projectRequests/${prop}`,
  //         { isChosen: "true" }
  //       );
  //       console.log("res >>>>>>>>>>:", response);
  //     }
  //     selecteUser();
  //   }
  // }, [userId]);

  // 메세지 dropdown
  const showMessage = (e) => {
    e.target.classList.toggle("show_msg");
  };
  // 별표 이미지 토글
  const toggleStar = (e) => {
    e.target.classList.toggle("select_start");
  };
  // 리뷰어 등급
  const returnGrade = (prop) => {
    switch (prop) {
      case "a":
        return "화이트";
      case "b":
        return "실버";
      case "c":
        return "골드";
      case "d":
        return "다이아";
      case "z":
        return "블랙";
      default:
    }
  };
  // 리뷰어 나이
  const today = new Date();
  const returnAge = (prop) => {
    return today.getFullYear() - prop + 1;
  };
  // 새창으로 snsUrl open
  const openSnsUrl = (e, prop) => {
    e.preventDefault();
    window.open(prop);
  };
  //체크박스 아이디값, 체크여부 판별후 버튼 활성화
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };
  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(target.id, target.checked);
    // input 1개이상 체크 되있을때 버튼활성화
    if (checkedItems.size > 0) {
      setBtnActive(true)
    }else {
      setBtnActive(false)
    }
    // console.log(target.id, target.checked);
  };
  const selectUser = ({ target }) => {
    console.log(checkedItems);
  };
  // 버튼활성화
  useEffect(() => {
    console.log(checkedItems);
    if (btnActive) {
      console.log("active");
    } else {
      console.log("disabled");
    }
  }, [checkedItems]);

  // 모달 close
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="section">
      <div className="top_menu">
        <div
          onClick={() => {
            setActivedA(true);
            setActivedB(false);
            //신청리뷰어 리스트
            setUsersList(users);
          }}
          className={activedA ? "active" : ""}
        >
          {strings.user.applied}({userCnt})
        </div>
        <div
          onClick={() => {
            setActivedA(false);
            setActivedB(true);
            //선정리뷰어 리스트
            setUsersList(selectedUsers);
          }}
          className={activedB ? "active" : ""}
        >
          {strings.user.selected}({selectedUserCnt})
        </div>
      </div>
      <div className="user_list_box">
        <ul>
          <li className="top_line">
            <div>
              <input type="checkBox"></input>
            </div>
            <div>별표</div>
            <div>NO</div>
            <div>등급</div>
            <div>이름(닉네임)</div>
            <div>나이</div>
            <div>성별</div>
            <div>지역</div>
            <div>활동 분야</div>
            <div>전략</div>
            <div>추천수</div>
            <div>취소율</div>
            <div>평균 투데이</div>
            <div>SNS 계정</div>
            <div>내 브랜드 참여</div>
          </li>
          {(usersList || []).map((val) => (
            <li key={val.id}>
              <div>
                <input
                  type="checkBox"
                  id={val.id}
                  // checked={bChecked}
                  onChange={(e) => {
                    checkHandler(e);
                  }}
                />
              </div>
              <div>
                <div className="star_img" onClick={toggleStar}></div>
              </div>
              <div>{val.id}</div>
              <div>{returnGrade(val.grade)}</div>
              <div>
                {val.name} ({val.nickName})
              </div>
              <div>{returnAge(val.yearOfBirth)}</div>
              <div>{val.gender === "Female" ? "여" : "남"}</div>
              <div>{val.region}</div>
              <div>{val.category}</div>
              <div className="user_msg_wrap">
                {val.message ? (
                  <div className="user_msg msg_exists" onClick={showMessage}>
                    {val.message}
                  </div>
                ) : (
                  <div className="user_msg mgs_null">내용이 없습니다.</div>
                )}
              </div>
              <div>{val.recommend}회</div>
              <div>{val.cancelRate}%</div>
              <div>{Number(val.today).toLocaleString()}</div>
              <div>
                <button
                  className="btn_open_sns"
                  onClick={(e) => {
                    openSnsUrl(e, val.snsUrl);
                  }}
                >
                  보기
                </button>
              </div>
              <div>
                {val.brandRequestCounts === 0 ? (
                  "-"
                ) : (
                  <button
                    className="brand_count"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalOpen(true);
                      setUserId(val.id);
                      setUserName(val.name);
                      setUserNickName(val.nickName);
                    }}
                  >
                    {val.brandRequestCounts}회
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <Modal
          open={modalOpen}
          close={closeModal}
          userId={userId}
          userName={userName}
          userNickName={userNickName}
        />
      </div>
      <button
        onClick={selectUser}
        className={
          btnActive
            ? "btn_select_user btnActive"
            : "btn_select_user btnDisabled"
        }
      >
        {strings.button.select}
      </button>
    </div>
  );
};

export { UserList };
