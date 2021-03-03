import React, { useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {authenticate, isAuth} from './helpers'
import {ToastContainer, toast} from 'react-toastify'
import Google from './Google'
import 'react-toastify/dist/ReactToastify.min.css'
import Facebook from './Facebook'

const Signin = ({history}) => {

    const [values, setValues] = useState({
        email:'',
        password:'',
        buttonText:'Submit'
    });

    const { email, password, buttonText} = values;

    const handleChange = (name) => (event) =>{
        setValues({...values, [name]:event.target.value})
    }

    const informParent = response => {
        authenticate(response, () => {                        
            isAuth() && isAuth().role === 'admin' ? history.pushState('/admin') : history.pushState('/private')
        })
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})

        axios({
            method: 'POST',
            url:`${process.env.REACT_APP_API}/signin`,
            data: { email, password}            
        })
        .then(response => {
            console.log('signin sucess ',response)
            authenticate(response, () => {
                setValues({...values, name:'', email:'', password:'', buttonText: 'Submitted'})
                // toast.success(`Hey ${response.data.user.name}, Welcome back!`)
                isAuth() && isAuth().role === 'admin' ? history.pushState('/admin') : history.pushState('/private')
            })
        })
        .catch(error => {
            console.log('signin error', error.response)
            setValues({...values, buttonText: 'Submit'})
            toast.error('Provide valid email and password')            
        })
    }

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

        <div>
            <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
        </div>

        </form>
    )

    return(
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Redirect to="/"/> : null}
                <h1 className="p-5 text-center">Signin</h1>
                <Google informParent={informParent} />
                <Facebook informParent={informParent} />
                {signinForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
            </div>
        </Layout>
    )
}

export default Signin;

