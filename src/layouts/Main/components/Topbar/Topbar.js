import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import AuthService from '../../../../services/AuthService';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  logo:{
    filter: 'invert(48%) sepia(86%) saturate(349%) hue-rotate(86deg) brightness(100) contrast(119%)'
  }
}));

const Topbar = props => {

  const {  className, onSidebarOpen, ...rest  } = props;

  const classes = useStyles();

  const [notifications] = useState([]);
  const LogOUT = async () => {
    const LogOut =  await AuthService.logout()
    if(LogOut.ok){
      window.location.reload();
    }

  };
  const get = async ()=> {
    const data =  await AuthService.getuser();
    console.log(data)
  }
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img className={classes.logo}
            alt="Logo"
            src="/images/logos/crash.svg"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {/* <IconButton color="inherit"
          onClick={get}
          >

            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton
            className={classes.signOutButton}
            onClick={LogOUT}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
