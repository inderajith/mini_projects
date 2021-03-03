import React, { useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Forgot = ({history}) => {

    const [values, setValues] = useState({
        email:'',
        buttonText:'Request password reset link'
    });

    const { email, buttonText} = values;

    const handleChange = (name) => (event) =>{
        setValues({...values, [name]:event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        // const abortController = new AbortController()
        // const signal = abortController.signal

        axios({
            method: 'PUT',
            url:`${process.env.REACT_APP_API}/forgot-password`,
            data: { email}            
        })
        .then(response => {
            console.log('Forgot password sucess ',response)
            toast.success(response.data.message)
            setValues({...values, buttonText: 'Requested'})
        })
        .catch(error => {
            console.log('Forgot password error', error.response)
            toast.error(error.response.data.error)
            setValues({...values, buttonText: 'Request password reset link'})
        })

        // function cleanup() {
        //     abortController.abort()
        // }
    }

    const passwordForgotForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>

        <div>
            <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
        </div>

        </form>
    )

    return(
        <Layout>
            <ToastContainer />
            <h1 className="p-5 text-center">Forgot password</h1>
            {passwordForgotForm()}
        </Layout>
    )
}

export default Forgot;

