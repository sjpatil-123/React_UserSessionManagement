import React, { useRef } from 'react';
import '../Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const x1 = useRef(null);
    const x2 = useRef(null);
    const navigate=useNavigate();

    async function loginHandle() {
        const email = x1.current.value;
        const password = x2.current.value;
        try {
            const res = await axios.post('http://localhost:4010/loginUser', {
              email,password
            });
            if(res.status===200){
                alert("user logged in successfully");
                sessionStorage.setItem('islogin',true);
                sessionStorage.setItem('username',res.data.name)
                sessionStorage.setItem('email',res.data.email)
                navigate('/users')
                window.location.reload();

            }
            else{
                alert("Invalid credentials");
                sessionStorage.clear()
            }

        } catch (error) {
            alert("Invalid credentials/user not found");
            console.error('Error:', error);
        }
    }

    return (
        <div className='login'>
            <div className='container'>
                <h1 style={{marginBottom:'100px'}}>SIGN IN</h1>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control text-white" id="email" placeholder="email" style={{ width: '350px', backgroundColor: '#394849' }} ref={x1} required />
                            <label htmlFor="email" className=''>Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control text-white" id="password" placeholder="Password" style={{ width: '350px', backgroundColor: '#394849' }} ref={x2} required />
                            <label htmlFor="password" className=''>Password</label>
                        </div>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" style={{ marginRight: '5px' }} />
                            <label className="form-check-label" htmlFor="flexCheckChecked" style={{ width: '250px', color: 'cyan' }}>
                                Remember me
                            </label>
                            <label>
                            <a><Link to='/register'>register</Link>
                            </a>
                            </label>
                        </div>
                        <button type="button" className='form-control mt-5' onClick={loginHandle} style={{ backgroundColor: 'cyan' }}>
                            LOGIN
                        </button>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </div>
    );
}
export default Login;