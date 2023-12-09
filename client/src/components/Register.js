import { useState } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'

const Register = (props) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const formData = {
                username, email, password
            }
            const registered =  await axios.post('http://localhost:3210/api/users/register', formData)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Succesfully Registered',
                showConfirmButton: false,
                timer: 1000
            })
            props.history.push('/login')
            setUsername('')
            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card p-4 shadow my-4 col-md-4" >
                <h2> Register With Us! </h2> 
                <form onSubmit={handleSubmit}>

                    <label htmlFor="username" className="form-label"> Username </label> <br/>
                    <input id="username" className="form-control" type='text' placeholder="enter username" value={username} onChange={(e) => {setUsername(e.target.value)}} /> <br/>
                    <br/>
                    <label htmlFor="email" className="form-label"> Email </label> <br/>
                    <input id="email" className="form-control" type='text' placeholder="enter email" value={email} onChange={(e) => {setEmail(e.target.value)}} /> <br/>
                    <br/>
                    <label htmlFor="password" className="form-label"> Password </label> <br/>
                    <input id="password" className="form-control" type="password" placeholder="enter password" value={password} onChange={(e) => {setPassword(e.target.value)}} /> <br/>
                    <br/>
                    <input className="btn btn-primary" type="submit" value='Register' />

                </form>
            </div>
        </div>
    )
}

export default Register