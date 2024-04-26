import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Header() {

    const logoutHandle=()=>{
        const email=sessionStorage.getItem('email')
        try {
            const res = axios.post('http://localhost:4010/updateUser', {
               email
            });
            
        } catch (error) {
            console.error('Error:', error);
        }
        sessionStorage.clear();
        window.location.reload();
    }
    return (
        <div>
            <ul class="nav justify-content-end mt-3">
              {
                (sessionStorage.getItem('islogin'))?(<li class="nav-item">
                <button onClick={logoutHandle} className='form-control' style={{border:'2px solid'}}><Link to='/'>Log out</Link></button>
            </li>):("")
              }
                                
            </ul>
        </div>
    )
}
