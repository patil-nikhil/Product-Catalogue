import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import Form from "./Form"

const AddProducts = (props) => {

    const submitForm = async (formData) => {
        try {
            const product = await axios.post('http://localhost:3210/api/products', formData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <Form submitForm={submitForm}/>
        </div>
    )
}

export default AddProducts