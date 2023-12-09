import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const ManageRoles = () => {

    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3210/api/users', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => {
                alert(error)
            })
    }, [refresh])

    const handlePromoteClick = async (id) => {
        const users = await axios.put(`http://localhost:3210/api/users/${id}`, {
            role: 'moderator'
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${users.data.username} is the Moderator`,
            showConfirmButton: false,
            timer: 1200
          })
        setRefresh(!refresh)
    }

    const handleDemoteClick = async (id) => {
        try {
            const users = await axios.put(`http://localhost:3210/api/users/${id}`, {
                role: 'customer'
            }, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${users.data.username} is the Customer`,
                showConfirmButton: false,
                timer: 1200
              })
            setRefresh(!refresh)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 my-5">
                    <h2> Listing Customers  </h2>
                     <table className="table table-hover" border='10px'>
                        <thead>
                            <tr>
                                <th> Name </th>
                                <th> Email </th>
                                <th> Role </th>
                                <th> Promote to </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.filter((ele1) => ele1.role === 'customer').map((ele2) => {
                                    return (
                                        <tr key={ele2._id}>
                                            <td> {ele2.username} </td>
                                            <td> {ele2.email} </td>
                                            <td> {ele2.role} </td>
                                            <td> <button className="btn btn-primary" onClick={() => {handlePromoteClick(ele2._id)}}> Moderator  </button> </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <br/>
                </div>

            <div className="col-md-5 my-5">
                <h2> Listing Moderators </h2>
                <table className="table table-hover" border='10px'>
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Role </th>
                            <th> Demote to </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.filter((ele1) => ele1.role === 'moderator').map((ele2) => {
                                return (
                                    <tr key={ele2._id}>
                                        <td> {ele2.username} </td>
                                        <td> {ele2.email} </td>
                                        <td> {ele2.role} </td>
                                        <td> <button className="btn btn-primary" onClick={() => {handleDemoteClick(ele2._id)}}> Customer  </button> </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
        
    )
}

export default ManageRoles