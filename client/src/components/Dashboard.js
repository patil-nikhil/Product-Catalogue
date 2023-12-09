import axios from "axios"
import { useEffect, useState } from "react"
import jwt_Decode from "jwt-decode"
import Swal from 'sweetalert2'
import AddProducts from "./Add-Products"
import EditItem from "./EditItem"

const Dashboard = () => {

    const [products, setProducts] = useState([])
    const [selected, setSelected] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [show, setShow] = useState({})

    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('http://localhost:3210/api/products', {
            headers: {
                'Authorization': token
            }
        })
            .then((products) => {
                setProducts(products.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [selected])

    const handleViewClick = async (id) => {
        try {
            const product = await axios.get(`http://localhost:3210/api/products/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log(product.data)
            Swal.fire(`${product.data.name}, ${product.data.price}Rs`)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        }
    }

    const handleRemoveClick = async (id) => {
        try {
            const product = await axios.delete(`http://localhost:3210/api/products/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Succesfully Removed Product',
                showConfirmButton: false,
                timer: 1000             
            })
            setSelected(!selected)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        }
    }

    const handleEditClick = (product) => {
        setShow(product)
        setToggle(!toggle)
    }

    return (
        <div className="container">
            <div className="row">
                {
                    toggle && <EditItem data={show} handleEditClick={handleEditClick} />
                }
                    {
                        products.map((ele) => {
                            return (
                                <div className="col-md-4 my-4" key={ele._id}>
                                    <li className="card p-4 fs-3"> Name : {ele.name} <br/>
                                        Price : {ele.price} Rs 
                                        <div className="d-flex my-2 flex-row p-2 gap-1">
                                            {
                                                jwt_Decode(localStorage.getItem('token')).role === 'admin' ? (
                                                    <div className="d-flex my-2 flex-row p-2 gap-2">
                                                        <button className="btn btn-primary" onClick={() => {handleViewClick(ele._id)}} > view </button>
                                                        <button className="btn btn-primary" onClick={() => handleEditClick(ele)} > edit </button>
                                                        <button className="btn btn-danger"onClick={() => {handleRemoveClick(ele._id)}}> remove </button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <button className="btn btn-primary" onClick={() => {handleViewClick(ele._id)}}> view </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </li>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default Dashboard