import axios from "axios";
import React, { useEffect, useState } from "react";
import { strings } from "../configs";
import { CommonModal } from "./modal";
import { DetailModal } from "./modal/DetailModal";

const UserList = () => {
  const [userCnt, setUserCnt] = useState(null);
  const [selectedUserCnt, setSelectedUserCnt] = useState(null);

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const [modalOpenC, setModalOpenC] = useState(false);
  const [modalOpenD, setModalOpenD] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userNickName, setUserNickName] = useState(null);

  const [activedA, setActivedA] = useState(true);
  const [activedB, setActivedB] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [checkedCnt, setCheckedCnt] = useState(0);

  const [btnActive, setBtnActive] = useState(false);

  // console.log("server : ",process.env.PUBLIC_URL)
  useEffect(() => {
    async function getUsers() {
      const response = await axios.get(
        `${process.env.PUBLIC_URL}/projectRequests?isChosen=false`
      );
      setUserCnt(response.data.length);
      setUsers(response.data);
      //초깃값설정
      setUsersList(response.data);
    }
    getUsers();

    async function getSelectedUsers() {
      const response = await axios.get(
        `${process.env.PUBLIC_URL}/projectRequests?isChosen=true`
      );
      setSelectedUserCnt(response.data.length);
      setSelectedUsers(response.data);
    }
    getSelectedUsers();
  }, []);
  //체크박스 아이디값, 체크여부 판별후 버튼 활성화
  const checkedItem = (id, isChecked) => {
    if (isChecked && checkedItems.size < 3) {
      checkedItems.add(id);
      setCheckedCnt(checkedCnt + 1);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      setCheckedCnt(checkedCnt - 1);
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };
  const checkInputBox = ({target}) => {
    // input 1개이상 체크 되있을때 버튼활성화
    setIsChecked(!isChecked);
    checkedItem(target.id, target.checked);
    if (checkedItems.size > 0 ) {
      setBtnActive(true);
      setCheckedCnt(checkedItems.size);
    } else {
      setBtnActive(!btnActive)
    }
    //3이상 체크 못하도록
    if (checkedCnt == 3 || checkedCnt >3) {
      target.checked = false;
    }
  };
  //리뷰어 선정
  const selectUser = () => {
    setModalOpenC(true);
    setModalContent("select");
    checkedItems.forEach((val) => {
      async function patchUserId() {
        try {
          const response = await axios.patch(
            `${process.env.PUBLIC_URL}/projectRequests/${val}`,
            {
              isChosen: "true",
            }
          );
        } catch (err) {
          setModalContent(err.response);
        }
      }
      patchUserId();
    });
  };
  //리뷰어 취소
  const delateUser = () => {
    setModalOpenC(true);
    setModalContent("delete");
    checkedItems.forEach((val) => {
      async function patchUserId() {
        try {
          const response = await axios.patch(
            `${process.env.PUBLIC_URL}/projectRequests/${val}`,
            {
              isChosen: "false",
            }
          );
        } catch (err) {
          setModalContent(err.response);
        }
      }
      patchUserId();
    });
  };
  // 메세지 dropdown
  const showMessage = (e) => {
    e.target.classList.toggle("show_msg");
  };
  // 별표 이미지 토글
  const toggleStar = (e) => {
    e.target.classList.toggle("select_star");
  };
  // 리뷰어 등급
  const returnGrade = (prop) => {
    switch (prop) {
      case "a":
        return "브론즈";
      case "b":
        return "실버";
      case "c":
        return "골드";
      case "d":
        return "다이아";
      case "z":
        return "플레티넘";
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
            <div>{strings.keyword.id}</div>
            <div>{strings.keyword.grade}</div>
            <div>{strings.keyword.name}</div>
            <div>{strings.keyword.age}</div>
            <div>{strings.keyword.gender}</div>
            <div>{strings.keyword.region}</div>
            <div>{strings.keyword.category}</div>
            <div>{strings.keyword.userMessage}</div>
            <div>{strings.keyword.recommend}</div>
            <div>{strings.keyword.cancelRate}</div>
            <div>{strings.keyword.today}</div>
            <div>{strings.keyword.snsUrl}</div>
            <div>{strings.keyword.brandRequestCounts}</div>
          </li>
          {(usersList || []).map((val) => (
            <li key={val.id} id="liContent">
              <div>
                <input
                  type="checkBox"
                  id={val.id}
                  onChange={(e) => {
                    checkInputBox(e);
                  }}
                />
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
                  <div className="user_msg mgs_null">{strings.main.noMsg}</div>
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
                  {strings.button.show}
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
                      setModalOpenD(true);
                      // setModalType("detail");
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
        <DetailModal
          open={modalOpenD}
          close={(e) => {
            setModalOpenD(false);
          }}
          userId={userId}
          userName={userName}
          userNickName={userNickName}
          activedA={activedA}
        />
      </div>
      <button
        onClick={activedA ? selectUser : delateUser}
        className={
          btnActive
            ? "btn_select_user btnActive"
            : "btn_select_user btnDisabled"
        }
      >
        {btnActive ? checkedCnt + strings.button.count : ""}
        {activedA ? `${strings.button.select}` : `${strings.button.delete}`}
      </button>
      <CommonModal
        open={modalOpenC}
        close={(e) => {
          location.reload();
        }}
        userCnt={checkedItems.size}
        content={modalContent}
      />
    </div>
  );
};

export { UserList };
