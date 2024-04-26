import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function () {
    const [users,setUsers]=useState([]);
    const navigate=useNavigate()
  useEffect(() =>{
    if(!sessionStorage.getItem('islogin')){
        navigate('/')
    }
  })
    useEffect(() => {
        axios
            .get("http://localhost:4010/getUsers")
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
  return (
    <div className='container' style={{width:'auto',height:'auto'}}>
       <div className="row text-center">
                            <h2>Users Details</h2>
                        </div>
                        <table className="table table-striped mt-3">
                            <thead>
                                <tr className='border'>
                                    <th>Name</th>
                                    <th>date of birth</th>
                                    <th>Role</th>
                                    <th>email</th>
                                    <th>status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user) => (
                                    <tr>
                                        <td className='border'>{user.name}</td>
                                        <td className='border'>{user.dob}</td>
                                        <td className='border'>{user.role}</td>
                                        <td className='border'>{user.email}</td>
                                        <td className='border'>{(user.status==1)?(<p>&#128994;</p>):(<p>&#128308;</p>)}</td>
                                        <td className='border'><button><i class="fa-solid fa-gear"></i></button><button><i class="fa-solid fa-xmark"></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
    </div>
  )
}
