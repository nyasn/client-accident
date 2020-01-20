import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTabl } from './components';
import mockData from './data';
import AuthService from '../../services/AuthService'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [accident,setAccident] = useState();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data  = await AuthService.getAllAccident();
      //console.log();
      setAccident(accident=>data)
      // ...
    }
    fetchData();
  },[] )
  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTabl users={accident} />
      </div>
    </div>
  );
};

export default UserList;
