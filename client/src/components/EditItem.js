import Form from "./Form"
import axios from "axios"

const EditItem = (props) => {
    
    const {data, handleEditClick} = props

    const submitForm = async (formData) => {
        try {
            const product = await axios.put(`http://localhost:3210/api/products/${data._id}`, formData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            handleEditClick()
        } catch(error) {
            alert(error)
        }
    }

    return (
        <div>
            <Form submitForm={submitForm} {...data} />
        </div>
    )
}

export default EditItem