import React, { useState, useEffect} from 'react'
// import {Link, Redirect} from 'react-router-dom'
import Layout from './Layout'
import axios from 'axios'
import {getCookie, isAuth, signout, updateUser} from '../auth/helpers'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Private = ({history}) => {

    const [values, setValues] = useState({
        role:'',
        name:'',
        email:'',
        password:'',
        buttonText:'Submit'
    });

    const token = getCookie('token')

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('private profile update', response)
            const {role, name, email} = response.data
            setValues({...values, role, name, email})
        })
        .catch(err => {
            console.log('update error',err )
            if(err.response.status === 401){
                signout(() => {
                    history.push("/")
                })
                
            }
        })
    }

    const {role, name, email, password, buttonText} = values;

    const handleChange = (name) => (event) =>{
        setValues({...values, [name]:event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url:`${process.env.REACT_APP_API}/user/update`,
            headers:{
                'Authorization': `Bearer ${token}`
            },
            data: {name, password}
        })
        .then(response => {
            console.log('Private Profile Update sucess ',response)
            updateUser(response, () => {
                setValues({...values, buttonText: 'Submitted'})
                toast.success("Profile updated successfully")
            })
            
        })
        .catch(error => {
            console.log('Private Profile Update error ', error.response.data.error)
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.response.data.error)
        })
    }

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">role</label>
                <input onChange={handleChange('name')} value={role} type="text" className="form-control" disabled />
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" disabled />
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
            <ToastContainer />
            <h1 className="pt-5 text-center">Private</h1>
            <p className="lead text-center">Profile update</p>
            {updateForm()}
        </Layout>
    )
}

export default Private;

