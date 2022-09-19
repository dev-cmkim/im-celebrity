import  React, { useEffect, useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9000/projectRequests")
          .then(res => {
            return res.json();
          })
          .then(data => {
            setUsers(data)
            // console.log(data.yearOfBirth)
          });
      }, []);
      
    // 메세지 dropdown
    const showMessage = (e) => {
        e.target.classList.toggle('show_msg')
    }

    // 리뷰어 등급 
    const returnGrade = (prop) => {
        switch (prop) {
            case 'a' :
                return '화이트' 
            case 'b' :
                return '실버'
            case 'c' :
                return '골드'
            case 'd' :
                return '다이아' 
            case 'z' :
                return '블랙'
            default :
        }
    }
    // 리뷰어 나이 
    const today = new Date();
    const returnAge = (prop) => {
        return today.getFullYear() - prop + 1;
    }
    return (
        <div className='user_list_box'>
            <ul>
                <li className='top_line'>
                    <div><input type='checkBox'></input></div>
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
                {users.map((val, index) => (
                    <li key={val.id}>
                        <div><input type='checkBox'></input></div>
                        <div>별표</div>
                        <div>{val.id}</div>
                        <div>{ returnGrade(val.grade) }</div>
                        <div>{val.name} ({val.nickName})</div>
                        <div>{ returnAge(val.yearOfBirth) }</div>
                        <div>{val.gender}</div>
                        <div>{val.region}</div>
                        <div>{val.category}</div>
                        <div className='user_msg_wrap'>
                            {val.message ?
                             <div className='user_msg msg_exists' onClick={ showMessage }>
                                {val.message}
                             </div> 
                            :
                            <div className='user_msg mgs_null'>
                                내용이 없습니다.
                            </div>
                            }
                        </div>
                        <div>{val.recommend}</div>
                        <div>{val.cancelRate}</div>
                        <div>{val.today}</div>
                        <div><a href={val.snsUrl}>click</a></div>
                        <div>{val.brandRequestCounts}</div> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { UserList }