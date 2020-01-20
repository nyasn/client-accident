import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Grid,
  CardActions,
  CardContent,
  Avatar,
  ExpansionPanel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getInitials } from 'helpers';
import AuthService from '../../../../services/AuthService'
import SlideVehicule from './components/SlideVehicule'
import Slide from './components/Slide'


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Detail = props => {
  const { className, id, ...rest } = props;
  
  const classes = useStyles();
  const [data,setData] =useState([]);

  const getAccident = async () =>{
    const data = await AuthService.getAccidentById(id);
    setData(data);
    console.log(data.id)
  }
  useEffect(()=>{
    getAccident();
  },[])

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <SlideVehicule id={id}/>
      {data.id ? 
      <Grid container spacing={3}>
        {data.nombre_deceder!=0 ? (<Grid item xs={6}>
          <Slide type={'die'} id={id}/>
        </Grid>):null}
        {data.nombre_blesser !=0 ? (<Grid item xs={6}>
          <Slide type={'hill'} id={id}/>
        </Grid>):null}
        {data.nombre_autre != 0 ?  (<Grid item xs={6}>
          <Slide type={'other'} id={id}/>
        </Grid>):null}
        {data.nombre_temoins!=0 ? (<Grid item xs={6}>
          <Slide type={'temoin'} id={id}/>
        </Grid>):null}
      </Grid> : null}
        
    </Card>
  );
};

Detail.propTypes = {
  className: PropTypes.string,
};

export default Detail;
