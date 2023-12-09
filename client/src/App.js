import { Link, Route } from "react-router-dom/cjs/react-router-dom.min"
import PrivateRoute from "./helper/PrivateRoute"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import AddProducts from "./components/Add-Products"
import jwt_decode from "jwt-decode"
import ManageRoles from "./components/ManageRoles"
import Swal from "sweetalert2"

const App = () => {

  let decodedToken
  if(localStorage.getItem('token')) {
    decodedToken = jwt_decode(localStorage.getItem('token'))
  }

  const handleLogout = (props)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to logout",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "",
            'Successfully logged out',
            'success'
          )
          localStorage.removeItem("token")
        }
      }) 
  }
  
  return (
    <div>
      <h2> Product Catalouge Task </h2>
      <hr/>
      <div className="d-flex flex-row gap-5" >
        {
          localStorage.getItem('token') ? (
            <>
              <div className="d-flex flex-row gap-5" >
                <li> <Link to='/' > Home </Link> </li>
                <li> <Link to='/dashboard' > DashBoard </Link> </li>
                {
                  decodedToken.role === 'admin' && (
                    <>
                      <li> <Link to='/add-products' > Add Products </Link> </li>
                      <li> <Link to='/manage-roles' > Manage Roles </Link> </li>
                    </>
                  )
                }
                {
                  decodedToken.role === 'moderator' && (
                    <>
                      <li> <Link to='/add-products' > Add Products </Link> </li>
                    </>
                  )
                }
                <li> <Link to='/logout' onClick={handleLogout} > Logout </Link> </li>
              </div>            
            </>
          ) : (
            <>
              <>
                <div className="d-flex flex-row gap-5">
                    <li> <Link to='/' > Home </Link> </li>
                    <li> <Link to='/register' > Register </Link> </li>
                    <li> <Link to='/login' > Login </Link></li>
                </div>
              </>
            </>
          )
        }
      </div>
        <PrivateRoute path='/' component={Home} exact={true} />
        <Route path='/register' component={Register} exact={true} />
        <Route path='/login' component={Login} exact={true} />
        <PrivateRoute path='/dashboard' component={Dashboard} exact={true} />
        <PrivateRoute path='/add-products' component={AddProducts} exact={true} />
        <PrivateRoute path='/manage-roles' component={ManageRoles} exact={true} />
    </div>
  )
}

export default App