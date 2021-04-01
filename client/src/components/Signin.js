import React from 'react'
import {TextField, Button} from '@material-ui/core';
import './styles.css';

const Signin = () => {
    return (
        <div className="signinContainer">
            <h1 className="title">Signin</h1>
            <form autoComplete="off">
                <TextField id="filled-basic" style={{width: '300px'}}  label="Email" variant="filled" /> <br />            
                <TextField id="filled-basic" style={{marginTop: '20px', marginBottom: '20px', width: '300px'}} label="Password" variant="filled" /> <br />                
                <Button variant="contained" color="primary" style={{position:'relative', left: '70%'}}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default Signin
