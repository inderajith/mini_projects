import React, { useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Reset = ({match}) => {

    const [values, setValues] = useState({
        name:'',
        token:'',
        newPassword:'',
        buttonText:'Reset Password'
    });

    useEffect(() => {
        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token){
            setValues({...values, name, token})
        }

    },[])


    const { name, token, newPassword, buttonText} = values;

    const handleChange = (event) =>{
        setValues({...values, newPassword: event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        // const abortController = new AbortController()
        // const signal = abortController.signal

        axios({
            method: 'PUT',
            url:`${process.env.REACT_APP_API}/reset-password`,
            data: { newPassword, resetPasswordLink : token }            
        })
        .then(response => {
            console.log('Reset password sucess ',response)
            toast.success(response.data.message)
            setValues({...values, buttonText: 'Done'})
        })
        .catch(error => {
            console.log('Reset password error', error.response)
            toast.error(error.response.data.error)
            setValues({...values, buttonText: 'Reset Password'})
        })

        // function cleanup() {
        //     abortController.abort()
        // }
    }

    const passwordResetForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">New password</label>
                <input onChange={handleChange} value={newPassword} type="password" placeholder="Type new password" className="form-control" required />
            </div>

        <div>
            <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
        </div>

        </form>
    )

    return(
        <Layout>
            <ToastContainer />
            <h1 className="p-5 text-center">Hey {name}, type your new password</h1>
            {passwordResetForm()}
        </Layout>
    )
}

export default Reset;

