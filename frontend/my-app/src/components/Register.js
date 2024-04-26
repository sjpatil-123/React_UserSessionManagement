import React, { useRef } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
function Register() {
    const x1 = useRef(null);
    const x2 = useRef(null);
    const x3 = useRef(null);
    const x4 = useRef(null);
    const userRole=useRef('user');
    const userStatus=useRef(0);
    // async function registerHandle() {
    //     const name = x1.current.value;
    //     const email = x2.current.value;
    //     const dob=x3.current.value;
    //     const password = x4.current.value;
    //     try {
    //         const res = await axios.post('http://localhost:4010/registerUser', {
    //           name:name,
    //           dob:dob,
    //           email:email,
    //           password:password
    //         });
    //         console.log(res);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

    async function registerHandle() {
        const name = x1.current.value;
        const email = x2.current.value;
        const dob = x3.current.value;
        const password = x4.current.value;
        const role=userRole.current.value;
        const status=userStatus.current.value;
        try {
            const res = await axios.post('http://localhost:4010/registerUser', {
                name, email, dob, password,role,status
            });
            alert(res.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className='login'>
            <div className='container' style={{ backgroundColor: '#394849' }}>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div className="form-floating mb-3 mt-3">
                            <input type="text" className="form-control text-white" id="name" placeholder="name" style={{ width: '350px', backgroundColor: '#394849' }} ref={x1} required />
                            <label htmlFor="name" className=''>Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control text-white" id="email" placeholder="email" style={{ width: '350px', backgroundColor: '#394849' }} ref={x2} required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control text-white" id="dob" placeholder="date of birth" style={{ width: '350px', backgroundColor: '#394849' }} ref={x3} required />
                            <label htmlFor="dob" className=''>Date of Birth</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control text-white" id="password" placeholder="Password" style={{ width: '350px', backgroundColor: '#394849' }} ref={x4} required />
                            <label htmlFor="password">Password</label>
                        </div>
                        <label className='drpdwn' htmlFor='userRole'>User Role</label><br />
                        <select className='drpdwn' ref={userRole}>
                            <option value="admin">Admin</option>
                            <option value="user" selected>User</option>
                        </select>
                        <label style={{marginLeft:'100px'}}>
                            <a><Link to='/'>login</Link>
                            </a>
                            </label>
                        <button type="button" className='form-control mt-5' onClick={registerHandle} style={{ backgroundColor: 'cyan' }}>
                            Register
                        </button>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </div>
    )
}
export default Register;
