import React from 'react';
import Carousel from 'react-material-ui-carousel'
import autoBind from 'auto-bind'
import './styles.scss';
import moment from 'moment';
import AuthService from '../../../../../services/AuthService'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader ,CardContent,CardActionArea, Divider,CardMedia, Typography, Grid, Button, Checkbox, FormControlLabel, Radio, RadioGroup, FormLabel } from '@material-ui/core';
const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    height:'100%'
  },
});
function Banner(props)
{
  const classes = useStyles();
  if (props.newProp) console.log(props.newProp)
  const {vehicule} = props;
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  let items = [];
  const imageVehicule = {
    "Auto Voiture": '/images/type_vehicules/voiture.jpg',
    "Bicyclette": '/images/type_vehicules/beka.jpg',
    "Moto":'/images/type_vehicules/moto.jpg',
    "Taxi-Bé" :'/images/type_vehicules/bus.jpg',
    "Taxi-Ville": '/images/type_vehicules/taxi.jpg',
    "Cammion":'/images/type_vehicules/cammion.jpg',
  };

  
  return (
    <Card
      className="Banner"
      raised
    >
      <Grid
        className="BannerGrid"
        container
        spacing={0}
      >
        <Grid
      item
      xs={12 / totalItems}
    >
      <Card className={classes.card} raised>
          <CardMedia
            className="Media"
            alt="Contemplative Reptile"
            height="140"
            image={imageVehicule[vehicule.genre_vehicule]}
            title="Contemplative Reptile"
          >
            <Typography className="MediaCaption">
               Vehicule {props.nb+1} : {vehicule.genre_vehicule}
            </Typography>
          </CardMedia>
          <CardContent>
            <Grid container  spacing={2}>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Matricule
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {vehicule.matricule}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Marque
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.marque}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Genre
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.genre_vehicule}
                </Typography>
              </Grid>
              
            </Grid>

            <Grid container  spacing={2}>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Usage
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.usage_vehicule}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Volume 
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.volume_chargement}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  conduite à droit
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.conduite_droite}
                </Typography>
              </Grid>
              
            </Grid>
            <Divider variant="middle" />
            <Typography gutterBottom variant="body1">
              Propriétaire
            </Typography>
            <Grid container  spacing={2}>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                Nom coplet 
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.nom_proprietaire}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Adresse 
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.adresse_proprietaire}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                 Téléphone
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.telephone_proprietaire}
                </Typography>
              </Grid>
              
            </Grid>
              <Divider variant="middle" />
              <Typography gutterBottom variant="body1" component="h3">
                Dommages : {vehicule.dommage}
              </Typography>

          </CardContent>
      </Card>
    </Grid>
    <Grid
      item
      xs={12 / totalItems}
    >
      <Card className={classes.card}>
        
          <CardMedia
            className="Media"
            alt="Conducteur"
            height="140"
            image='/images/type_vehicules/conducteur.jpg'
            title="Conducteur"
          >
            <Typography className="MediaCaption">
            Conducteur
            </Typography>
          </CardMedia>
          <CardContent>
            <Grid container  spacing={2}>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Nom complet
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.nom}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Adresse
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.adresse}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Téléphone
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.telephone}
                </Typography>
              </Grid>
              
            </Grid>

            <Grid container  spacing={2}>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Sexe
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.sexe}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Nationalité
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.nationalite}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Date de naissance
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {moment(vehicule.date_naissance).format('DD/MM/YYYY')}
                </Typography>
              </Grid>
              
            </Grid>
            <Grid container  spacing={2}>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Etat
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.etat}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Ebriete
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.ebriete}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h3">
                  Caseque ou centure
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.casque_centure}
                </Typography>
              </Grid>
              
            </Grid>
            {/* <Divider variant="middle" />
            <Typography gutterBottom variant="body1">
              Permis
            </Typography>
            
             {
              vehicule.num_permis ==="" ? 
              (
                <Typography gutterBottom variant="h6" component="h3">
                      Aucun permis 
                </Typography>
              )
              :
              (
                <Grid container  spacing={2}>
                  <Grid item xs={6}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Numero : {vehicule.num_permis}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Catégorie : {vehicule.categories_permis}
                    </Typography>
                  </Grid>
                </Grid>
              )
             } 
             */}
            
            <Divider variant="middle" />
            <Typography gutterBottom variant="h6" component="h3">
                  Déclarations : {vehicule.declaration}
            </Typography>
          </CardContent>
        
      </Card>
    </Grid>
    <Grid
      item
      xs={12 / totalItems}
    >
      <Card className={classes.card}>
        
          <CardMedia
            className="Media"
            alt="Assurance"
            height="140"
            image='/images/type_vehicules/assurance.jpg'
            title="Assurance"
          >
            <Typography className="MediaCaption">
            Assurance
            </Typography>
          </CardMedia>
          <CardContent>
            <Grid container  spacing={2}>
              <Grid item xs={6}>
                <Typography gutterBottom variant="h6" component="h3">
                  Nom assureur
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.nom_assurance}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom variant="h6" component="h3">
                  Circonstance
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {vehicule.circonstance}
                </Typography>
              </Grid>
              
            </Grid>
            <Grid container  spacing={2}>
              <Grid item xs={6}>
                <Typography gutterBottom variant="h6" component="h3">
                  Du
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {moment(vehicule.date_assurance_du).format('DD/MM/YYYY')}
                
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom variant="h6" component="h3">
                  Au
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {moment(vehicule.date_assurance_au).format('DD/MM/YYYY')}
                
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
      </Card>
    </Grid>
      </Grid>
    </Card>
  )
}



class SlideVehicule extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      autoPlay: true,
      timer: 1000,
      animation: 'slide',
      indicators: false,
      id:props.id,
      data:[]
    }

    autoBind(this);
    console.log(this.state.id)
  }
  getVehicule = async ()=>{
    const data = await AuthService.getVehiculesByAccidentID(this.state.id);
    this.setState({data:data});
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    this.getVehicule();
  }
  toggleAutoPlay()
  {
    this.setState({
      autoPlay: !this.state.autoPlay
    })
  }

  toggleIndicators()
  {
    this.setState({
      indicators: !this.state.indicators
    })
  }

  changeAnimation(event)
  {
    this.setState({
      animation: event.target.value
    })
  }

  render()
  {
    return (
      <div style={{textAlign: "center"}}>
        <h2>Liste Vehicule ( {this.state.data.length} )</h2>
        <Carousel 
          animation={this.state.animation}
          autoPlay={this.state.autoPlay}
          className="Example"
          indicators={this.state.indicators}
          timer={this.state.timer}
        >
          {
            this.state.data.map( (item, index) => {
              return <Banner
                
                vehicule={item}
                nb={index}
                key={index}
                     />
            })
          }
        </Carousel>
      </div>
        
    )
  }
}

export default SlideVehicule;
