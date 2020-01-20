import React, { useState ,useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import validate from 'validate.js';
import AuthService from '../../../../services/AuthService'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  IconButton,
  CircularProgress,InputAdornment,
} from '@material-ui/core';
import {  withSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {},
  signInButton: {
    margin: theme.spacing(2, 0)
  }
  
}));

const AccountDetails = props => {

  const { user_id,edit,close,enqueueSnackbar,closeSnackbar,className, ...rest } = props;
  const pswd = {
    password: {
      presence: { allowEmpty: false, message: 'est requis' },
      length: {
        minimum: 6,
        message: "Doit être au moins 6 caractères"
      }
    },
    confirmPassword: {
      presence: { allowEmpty: false, message: 'est requis' },
      equality: {
        attribute: "password",
        message: "ne correspond pas au mot de passe ",
      }
    },
    nom: {
      presence: { allowEmpty: false, message: 'est requis' },
      length: {
        maximum: 64
      }
    },
    prenom: {
      presence: { allowEmpty: false, message: 'est requis' },
      length: {
        maximum: 64
      }
    },
    phone: {
      presence: { allowEmpty: false, message: 'est requis' },
      format: {
        pattern: "[0-9]{10}",
        flags: "i",
        message: "doit être 10 chiffres"
      }
    },
    email: {
      presence: { allowEmpty: false, message: 'est requis' },
      email: {
        message: "ne ressemble pas à un e-mail valide"
      },
      length: {
        maximum: 64
      }
    },
    roles:{
      presence: { allowEmpty: false, message: 'est requis' },
    }
  }
  const schema = {
    nom: {
      presence: { allowEmpty: false, message: 'est requis' },
      length: {
        maximum: 64
      }
    },
    prenom: {
      presence: { allowEmpty: false, message: 'est requis' },
      length: {
        maximum: 64
      }
    },
    phone: {
      presence: { allowEmpty: false, message: 'est requis' },
      format: {
        pattern: "[0-9]{10}",
        flags: "i",
        message: "doit être 10 chiffres"
      }
    },
    email: {
      presence: { allowEmpty: false, message: 'est requis' },
      email: {
        message: "ne ressemble pas à un e-mail valide"
      },
      length: {
        maximum: 64
      }
    },
    roles:{
      presence: { allowEmpty: false, message: 'est requis' },
    }
  };
  const states = [
    {
      value: ' ',
      label: 'Rôles'
    },
    {
      value: 'ADMIN',
      label: 'Admin'
    },
    {
      value: 'ASSURANCE',
      label: 'Assurance'
    },
    {
      value: 'POLICE',
      label: 'Police'
    },
    {
      value: 'GENDARMERIE',
      label: 'Gendarmerie'
    }
  ];
  const classes = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    load:false,
    showPassword:false,
    close:false
  });
  const [user,setUser] = useState([])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setFormState({ ...formState, close: !formState.close });

  };
  // const handleChange = event => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };
  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const handleClickShowPassword = () => {
    setFormState({ ...formState, showPassword: !formState.showPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  useEffect(() => {
    
    let sema = pswd;
    if(edit){
      getUser(user_id);
      sema = schema;
    }
    
    const errors = validate(formState.values, sema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

    async function getUser(id){
      if(user.length==0){
        const data = await AuthService.getUserById(id)
        setUser(data);
        setFormState(formState=>({
          ...formState,
          values:{
            nom:data.nom,
            prenom:data.prenom,
            roles:data.roles,
            email:data.email,
            phone:data.phone
          }
        }))
      }
      
    }
  }, [formState.values]);
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  
  const handleAdd = async (event) => {
    event.preventDefault();
    
    setFormState(formState => ({
      ...formState,
      load:true,
      isValid:false
    }));
    let result;
    if(edit){
      result = await AuthService.editUserById(user_id,formState.values);
    }else{
      result = await AuthService.createNewUser(formState.values);
    }
    console.log(result)
    if(!result.error){
        setFormState(formState => ({
          ...formState,
          isValid: false,
          values: {},
          touched: {},
          errors: {},
          load:false,
          showPassword:false,
          close: true
        }));
        enqueueSnackbar(edit?'Moditication utilisateur avec success.':'Ajout utilisateur avec success.', {
          variant: 'success',
        });
        close();
    }else{
      setFormState(formState => ({
        ...formState,
        isValid: true,
        load:false,
      }));
      enqueueSnackbar(result.message, {
        variant: 'error',
      });
      
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        onSubmit={handleAdd}
        noValidate
      >
        <CardHeader
          subheader="Completer toutes les informations"
          title={edit?"Modification utilisateur":"Nouvel utilisateur"}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={hasError('nom')}
                fullWidth
                helperText={
                  hasError('nom') ? formState.errors.nom[0] : null
                }
                label="Nom"
                margin="dense"
                name="nom"
                onChange={handleChange}
              
                value={formState.values.nom || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                error={hasError('prenom')}
                helperText={
                  hasError('prenom') ? formState.errors.prenom[0] : null
                }
                label="Prenom"
                margin="dense"
                name="prenom"
                onChange={handleChange}
                value={formState.values.prenom || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              
              <TextField
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Adresse email"
                  name="email"
                  onChange={handleChange}
                  margin="dense"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={hasError('phone')}
                fullWidth
                helperText={
                  hasError('phone') ? formState.errors.phone[0] : null
                }
                label="Telephone"
                margin="dense"
                name="phone"
                onChange={handleChange}
                //type="number"
                value={formState.values.phone || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={hasError('roles')}
                fullWidth
                helperText={
                  hasError('roles') ? formState.errors.roles[0] : null
                }
                label="Rôle"
                margin="dense"
                name="roles"
                onChange={handleChange}
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={formState.values.roles || ''}
                variant="outlined"
              >
                {states.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            {!edit? <Grid
              item
              md={6}
              xs={12}
            >
              
              <TextField
                error={hasError('password')}
                fullWidth
                helperText={
                  hasError('password') ? formState.errors.password[0] : null
                }
                margin="dense"
                label="Mot de passe"
                name="password"
                onChange={handleChange}
                type={formState.showPassword ? 'text' : 'password'}
                value={formState.values.password || ''}
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {formState.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
                }}
                
              />
              <TextField
                error={hasError('confirmPassword')}
                fullWidth
                helperText={
                  hasError('confirmPassword') ? formState.errors.confirmPassword[0] : null
                }
                margin="dense"
                label="Confirmez le mot de passe"
                name="confirmPassword"
                onChange={handleChange}
                type={formState.showPassword ? 'text' : 'password'}
                style={{ marginTop: '1rem' }}
                value={formState.values.confirmPassword || ''}
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {formState.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
                }}
              />
            </Grid>:null}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
        <Button
            className={classes.signInButton}
            color="secondary"
            fullWidth
            size="large"
            variant="contained"
            onClick={close}
          >
            Annuler
          </Button>
          <Button
            className={classes.signInButton}
            color="primary"
            disabled={!formState.isValid}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            { formState.load ?
            <CircularProgress
              variant="indeterminate"
              disableShrink
              size={24}
              thickness={4}
              color="primary"
            /> :
            (edit?"Modifier":"Ajouter")}
          </Button>
          
        </CardActions>
      </form>

    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default withSnackbar(AccountDetails);
