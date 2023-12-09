import { useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'


const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            email, password
        }
        const login = await axios.post('http://localhost:3210/api/users/login', formData)
        if(!login.data.errors) {
            localStorage.setItem('token',login.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Succesfully Logged In',
                showConfirmButton: false,
                timer: 1000
            })
            props.history.push('/dashboard')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${login.data.errors}`,
              })
            
        }
        setEmail('')
        setPassword('')
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card p-4 shadow my-4 col-md-4">
                <h2> Login to Proceed Further </h2>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="email" className="form-label"> Email </label> <br/>
                    <input id="email" className="form-control" type="text" placeholder="enter email" value={email} onChange={(e) => {setEmail(e.target.value)}} /> <br/>
                    <br/>
                    <label htmlFor="password" className="form-label"> Password </label> <br/>
                    <input id="password" className="form-control" type="password" placeholder="enter password" value={password} onChange={(e) => {setPassword(e.target.value)}} /> <br/>
                    <br/>
                    <input className="btn btn-primary" type="submit" value='Login' />

                </form>
            </div>
        </div>
    )
}

export default Login