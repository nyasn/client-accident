import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  Fab
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useTheme } from '@material-ui/core/styles';
import AccountDetails  from '../AccountDetails'

import mockData from './data';
import { StatusBullet } from 'components';
import AuthService from '../../../../services/AuthService'
const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const statusColors = {
  1: 'success',
  0: 'danger'
};
const statusColorsBtn = {
  1: 'secondary',
  0: 'primary'
};
const statusColorslibelle = {
  1: 'Activer',
  0: 'Désactiver'
};
const statusColorslibelleBtn = {
  0: 'Activer',
  1: 'Désactiver'
};

const LatestOrders = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [users,setUsers] = useState([]);
  const [edit,setEdit] = useState(false);
  const [user_id,setUserID] = useState(0);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  //const [users,setUsers] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
    setEdit(false);
  };
  async function fetchData() {
    const data  = await AuthService.getAllUser();
    setUsers(users=>data)
  }
  useEffect(() => {
    
    fetchData();
    console.log("ato")
  }, [])

  async function deleteUser(id){
    if( window.confirm('Voulez-vous vraiment supprimer cet utilisateur?')){
      const data = await AuthService.deleteUserById(id);
      console.log("data");
      fetchData(); 
    }
    
  }
  const activeUser = async (id,status)=>{
    let nb = {enabled:0};
    if(status == 0) nb = {enabled:1};
    const data = await AuthService.activeUser(id,nb);
    console.log(data);
    fetchData();
  }
  const editUser = (id)=>{
    console.log(id);
    setUserID(id)
    setEdit(true);
    setOpen(true);
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={handleClickOpen}
          >
           Nouvel utilisateur
          </Button>
        }
        title="Tous les utilisateurs"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Roles
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow
                    hover
                    key={user.id}
                  >
                    <TableCell>{user.nom} {user.prenom}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.roles}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[user.enabled]}
                          size="sm"
                        />
                        {statusColorslibelle[user.enabled]}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Fab color="primary" onClick={()=>{editUser(user.id)}} size="small" className={classes.margin} aria-label="edit">
                        <EditIcon />
                      </Fab>
                      <Fab color="secondary" size="small" onClick={()=>{deleteUser(user.id)}} className={classes.margin} aria-label="edit">
                        <DeleteIcon />
                      </Fab>
                      <Button
                        color={statusColorsBtn[user.enabled]}
                        size="small"
                        variant="outlined"
                        onClick={()=>{activeUser(user.id,user.enabled)}}
                      >
                        {statusColorslibelleBtn[user.enabled]}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        {/* <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button> */}
      </CardActions>


      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <AccountDetails close={handleClose} edit={edit} user_id = {user_id}/>
      </Dialog>
      
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
