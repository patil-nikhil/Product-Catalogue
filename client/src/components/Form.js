import { useState } from "react"

const Form = (props) => {

    const {submitForm, name:n, price:p} = props

    const [name, setName] = useState(n?n:'')
    const [price, setPrice] = useState(p?p:0)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name, price
        }
       submitForm(formData)
    }

    return (
        <div className="d-flex justify-content-center" >
            <div className="card p-4 shadow my-4 col-md-4">
                <h2> Add Products </h2>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="name" className="form-label" > Name </label> <br/>
                    <input id="name" className="form-control" type="text" placeholder="enter product name" value={name} onChange={(e) => {setName(e.target.value)}} /> <br/>
                    <br/>
                    <label htmlFor="price" className="form-label" > Price </label> <br/>
                    <input id="price" className="form-control" type="number"  value={price} onChange={(e) => {setPrice(e.target.value)}} /> <br/>
                    <br/>
                    <input className="btn btn-primary" type='submit' value='Add Product' />

                </form>
            </div>
        </div>
    )
}

export default Form