import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button,Typography } from '@material-ui/core';

import { SearchInput } from 'components';
import AuthService from '../../../../services/AuthService'

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const get = async ()=> {
    const data =  await AuthService.getuser();
    console.log(data)
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    > 
      
      <div className={classes.row}>
      <Typography
        gutterBottom
        variant="h2"
      >
            Listes des accidents
      </Typography>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton} onClick={get}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add user
        </Button> */}
      </div>
     
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
