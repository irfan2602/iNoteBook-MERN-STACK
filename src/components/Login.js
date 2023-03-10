import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

const Login = (props) => {
    const navigate = useNavigate()
    const [credential, setCredential] = useState({ email: "", password: "" })
    let host = `http://localhost:5000`

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        })
        const json = await res.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            navigate('/')
            props.showAlert("Successfully Login", "success")
        }
        else {
            /* props.showAlert("Invalid Details","danger") */
            props.showAlert(credential.email && credential.password === null ? "Please Fill details" : json.error, "danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setTimeout(() => {
            <Loading />
        },1000)
    },[])

    return (
        <div className='mt-3'>
            <h2>Please login to continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credential.email} className="form-control" onChange={onChange} name='email' id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credential.password} className="form-control" onChange={onChange} name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary"  >Submit</button>
            </form>
                                 
        </div>
    )
}

export default Login