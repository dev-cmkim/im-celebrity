import  React, { useEffect, useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [ userCount, setUserCount ] = useState(null);
    useEffect(() => {
        fetch("http://localhost:9000/projectRequests")
          .then(res => {
            return res.json();
          })
          .then(data => {
            setUsers(data)
          });
      }, []);
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
                        <div>{val.grade}</div>
                        <div>{val.name}</div>
                        <div>{val.yearOfBirth}</div>
                        <div>{val.gender}</div>
                        <div>{val.region}</div>
                        <div>{val.category}</div>
                        <div className='user_msg_wrap'>
                            {val.message ?
                             <div className='user_msg'>
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