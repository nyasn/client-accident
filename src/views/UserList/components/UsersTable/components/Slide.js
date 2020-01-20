import React from 'react';
import Carousel from 'react-material-ui-carousel';
import autoBind from 'auto-bind';
import {
    FormLabel,
    FormControlLabel,
    CardContent,
    Typography,
    RadioGroup,
    Divider,
    Button,
    CardMedia,
    Grid,
    Card
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import AuthService from '../../../../../services/AuthService'

import "./styles.scss"
const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    height:'100%'
  },
});
function Project(props)
{
    const { item,type } = props;
    const classes = useStyles();
    const content_die = (
      <Card className={classes.card}>
            
              <CardMedia
                className="Media"
                alt={type}
                height="140"
                image={imageListe[type]}
                title={type}
              >
                <Typography className="MediaCaption">
                {item.sexe} de {item.age} ans
                </Typography>
              </CardMedia>
              <CardContent>
                <Grid container  spacing={2}>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Nom 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.nom}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Prenom
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.prenom}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Adresse
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.adresse}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Divider variant="middle" />
                <Grid container  spacing={2}>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Partie toucher
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.partie_toucher}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
          </Card>
    );
    const content_hill = (
          <Card className={classes.card}>
              <CardMedia
                className="Media"
                alt={type}
                height="140"
                image={imageListe[type]}
                title={type}
              >
                <Typography className="MediaCaption">
                {item.sexe} de {item.age} ans
                </Typography>
              </CardMedia>
              <CardContent>
                <Grid container  spacing={2}>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Nom 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.nom}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Prenom
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.prenom}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Adresse
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.adresse}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container  spacing={2}>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Téléphone 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.telephone}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Prenom
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.prenom}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Adresse
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.adresse}
                    </Typography>
                  </Grid> */}
                </Grid>
                
                <Divider variant="middle" />
                <Grid container  spacing={2}>
                  <Grid item xs={6}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Partie toucher
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.partie_toucher}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Déclaration
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.declaration}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
          </Card>
    );
    const content_other = (
      <Card className={classes.card}>
            
              <CardMedia
                className="Media"
                alt={type}
                height="140"
                image={imageListe[type]}
                title={type}
              >
                <Typography className="MediaCaption">
                Bien ou Autre
                </Typography>
              </CardMedia>
              <CardContent>
                <Grid container  spacing={2}>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Nom propriétaire
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.nom_proprietaire}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Age
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.age} ans
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Sexe
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.sexe}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container  spacing={2}>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Téléphone 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.telephone_proprietaire}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Adresse
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.adresse_proprietaire}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Adresse
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.adresse}
                    </Typography>
                  </Grid> */}
                </Grid>
                
                <Divider variant="middle" />
                <Grid container  spacing={2}>
                  <Grid item xs={6}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Description Dêgat
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.description_degat}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Déclaration
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.declaration}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
          </Card>
    );
    const content_temoin= (
      <Card className={classes.card}>
            
              <CardMedia
                className="Media"
                alt={type}
                height="140"
                image={imageListe[type]}
                title={type}
              >
                <Typography className="MediaCaption">
                Temoin
                </Typography>
              </CardMedia>
              <CardContent>
                <Grid container  spacing={2}>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Nom 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.nom}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Prénom
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.prenom} 
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Sexe
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.sexe}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container  spacing={2}>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Téléphone 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.telephone}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Adresse
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.adresse}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Age
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.age} ans
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container  spacing={2}>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      CIN 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.cin}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Date CIN
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {moment(item.date_cin).format('DD/MM/YYYY')}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Lieu CIN
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.lieu_cin} 
                    </Typography>
                  </Grid>
                </Grid>
                <Divider variant="middle" />
                <Grid container  spacing={2}>
                  
                  <Grid item xs={6}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Déclaration
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.declaration}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
          </Card>
    );

    return (
      <Card
      className="Banner"
      
        >
        <Grid
          className="BannerGrid"
          container
          spacing={0}
        >
          <Grid
              item
              xs={12}
            >
            {type=='die' ? content_die : null}
            {type=='hill' ? content_hill : null}
            {type=='other' ? content_other : null}
            {type=='temoin' ? content_temoin : null}


          </Grid>
        </Grid>
      </Card>
      
    )
}


const listeText = {
  "die": 'Personne déceder',
  "hill": 'Personne blésser',
  "other": 'Bien ou autres',
  "temoin" :'Temoins',
};
const imageListe = {
  "die": '/images/type_vehicules/die.jpg',
  "hill": '/images/type_vehicules/hill.jpg',
  "other":'/images/type_vehicules/other.jpg',
  "temoin":'/images/type_vehicules/temoin.jpg',
};
export default class Slide extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            autoPlay: false,
            timer: 1000,
            animation: "slide",
            indicators: true,
            id:props.id,
            data:[],
        }

        autoBind(this);
    }
    getTemoins = async ()=>{
      const data = await AuthService.getTemoinsByAccidentID(this.state.id);
      this.setState({data:data});
      console.log(data)
    }
    getDie = async ()=>{
      const data = await AuthService.getPersonedieByAccidentID(this.state.id);
      this.setState({data:data});
      
    }
    getHill = async ()=>{
      const data = await AuthService.getPersonnehillByAccidentID(this.state.id);
      this.setState({data:data});
    }
    getOther = async ()=>{
      const data = await AuthService.getBienByAccidentID(this.state.id);
      this.setState({data:data});
      console.log(data)
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
      switch(this.props.type) {
        case "die":
          this.getDie();
          break;
        case "hill":
          this.getHill();
          break;
        case "other":
          this.getOther();
          break;
        case "temoin":
          this.getTemoins();
          break;
        default:
          break;
      }
      //this.getTemoins();
    }
    
    render()

    {
        return (
            <div style={{marginTop: "50px", }}>
                <h2 style={{marginLeft: "50px", }}>{listeText[this.props.type]} ( {this.state.data.length} )</h2>

                <Carousel 
                    className="SecondExample"
                    autoPlay={this.state.autoPlay}
                    timer={this.state.timer}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                >
                    {
                        this.state.data.map( (item, index) => {
                            return <Project item={item} key={index} type={this.props.type}/>
                        })
                    }
                </Carousel>
            </div>
        )
    }
}
