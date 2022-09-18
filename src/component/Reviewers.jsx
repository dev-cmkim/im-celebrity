import React, { useEffect, useState } from 'react';
import { UserList } from './UserList';


const Reviewers = () => {
    const [ userCount, setUserCount ] = useState(null);
    useEffect(() => {
        fetch("http://localhost:9000/projectRequests")
          .then(res => {
            return res.json();
          })
          .then(data => {
            setUserCount(data.length)
          });
      }, []);
    return (
        <div className='section'>
            <div className='top_menu'>
                <div className='active'>신청 리뷰어({userCount})</div>
                <div>선정 리뷰어(0)</div>
            </div>
            <UserList/>
        </div>
    );
};

export {Reviewers} 