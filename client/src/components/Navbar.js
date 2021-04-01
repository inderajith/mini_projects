import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Authcontext } from '../contexts/Authcontext';
import {Link} from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const {verified} = useContext(Authcontext)
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>          
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{color:'white', textDecoration: 'none'}}>Home</Link>
          </Typography>
          {verified 
                ? <Button color="inherit"><Link to="/" style={{color:'white', textDecoration: 'none'}}>Settings</Link></Button> 
                : (
                    <>
                    <Button color="inherit"><Link to="/signin" style={{color:'white', textDecoration: 'none'}}>Signin</Link></Button>
                    {/* <Button color="inherit">Signup</Button> */}
                    </>
                )
            }   
        </Toolbar>
      </AppBar>
    </div>
  );
}
