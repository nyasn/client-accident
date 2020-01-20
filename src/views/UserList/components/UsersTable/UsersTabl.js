import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';
import { forwardRef } from 'react';
import { 
  IconButton,
  Button,
  Typography,
  DialogContent,
  Card,
  AppBar ,
  Toolbar,
  Slide,
  Dialog
} from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Pageview from '@material-ui/icons/Pageview';
import moment from 'moment';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import AuthService from '../../../../services/AuthService'
import Detail from './Detail'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

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
    avatar: {
      marginRight: theme.spacing(2)
    },
    exportButton: {
      marginRight: theme.spacing(1)
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

const UsersTabl = props => {
  const {renderData, className, users, ...rest } = props;
  const classes = useStyles();
  const [state] = useState({
    columns: [
      { title: 'Date et Heure', 
        field: 'date_accident',
        type: 'date',
        render: _data => (
            <span>
              {moment(_data.date_accident).format('DD/MM/YYYY')} <br/>à <br/>{_data.heure_accident}
            </span>
          ),
        cellStyle: rowData => ({fontSize:"12px",textAlign:'center'})
      },
      { title: 'Lieu', field: 'district',
        render: _data => (
          <span>
              {_data.district}, {_data.commune}, {_data.arrondissement}
          </span>
        ),
        cellStyle: rowData => ({fontSize:"12px"})
      },
      { title: 'Luminosite', field: 'luminosite',
        lookup: { 
            "Plein Jour": "Plein Jour",
            "Nuit,éclairage public allumé":"Nuit,éclairage public allumé",
            "Nuit,éclairage public éteint":"Nuit,éclairage public éteint",
            "Nuit sans éclairage public":"Nuit sans éclairage public"
           },
        cellStyle: rowData => ({fontSize:"12px"})
      },
      { title: 'Temps', field: 'temps',
        cellStyle: rowData => ({fontSize:"12px"}),
        lookup: { 
          "Clair": "Clair",
          "Pluie":"Pluie",
          "Tempête":"Tempête",
          "Brouillard poussière":"Brouillard poussière"
        },
      },
      { title: 'Type de route', field: 'type_route',
        cellStyle: rowData => ({fontSize:"12px"}),
        lookup: { 
          "Voie Urbaine": "Voie Urbaine",
          "Route Nationale":"Route Nationale",
          "Route Secondaire":"Route Secondaire",
          "Piste":"Piste",
          "Autre":"Autre",
        },
      },
      { title: 'Type de chauseé', field: 'type_chausee',
      cellStyle: rowData => ({fontSize:"12px"}),
        lookup: { 
          "Bitumées": "Bitumées",
          "Pavée":"Pavée",
          "En gravier":"En gravier",
          "En Terre":"En Terre",
          "Autre":"Autre",
        },
      },
      { title: 'Trace', field: 'trace',
      cellStyle: rowData => ({fontSize:"12px"}),
        lookup: { 
          "Ligne droite": "Ligne droite",
          "Virage":"Virage",
          "Pont":"Pont",
        },
      },
      { title: 'Etat surface', field: 'etat_surface' ,
      cellStyle: rowData => ({fontSize:"12px"}),
        lookup: { 
          "Sec": "Sec",
          "Mouillé":"Mouillé",
          "Glissant":"Glissant",
        },
      },
      { title: 'Type d\'intersection', field: 'type_intersection',
      cellStyle: rowData => ({fontSize:"12px"}),
        lookup: { 
          "Type X": "Type X",
          "Type T":"Type T",
          "Type Y":"Type Y",
          "Rond point":"Rond point",
          "Autre":"Autre",
        },
      },
      
    ]
  });
  const [open, setOpen] = useState(false);
  const [scroll] = useState('paper');
  const [accidentID,setAccidentID] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const exportCsv = (colums,data) => {
    console.log(data)
  }
  const getVehicule = async (id)=>{
    // console.log(id)
    setAccidentID(id);
    handleClickOpen();
  }
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} scroll={scroll}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            
          </Toolbar>
        </AppBar>
        <DialogContent dividers={scroll === 'paper'}>
        <Detail id={accidentID}/>
        </DialogContent>
        
      </Dialog>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
      {/* <Button className={classes.exportButton} onClick={exportCsv}>Export</Button> */}
        <MaterialTable

          localization={{
              body: {
                emptyDataSourceMessage: 'Aucun enregistrement à afficher'
              },
              toolbar: {
                searchTooltip: 'Recherche',
                searchPlaceholder: 'Recherche',
                exportTitle:'Export',
                exportAriaLabel: 'Export',
                exportName: 'Export',
                addRemoveColumns:'Ajouter ou supprimer des colonnes',
                showColumnsTitle:'Afficher les colonnes',
                showColumnsAriaLabel:'Afficher les colonnes',
              },
              pagination: {
                labelRowsSelect: 'ligne',
                labelDisplayedRows: '{count} lignes {from}-{to} ',
                firstTooltip: 'Première page',
                previousTooltip: 'Page Précédente',
                nextTooltip: 'Page suivante',
                lastTooltip: 'Dernière page'
              }
          }}
          options={{
            filtering: true,
            columnsButton: true, 
            // exportCsv: (columns, data) => { exportCsv(columns, data) }, 
            // exportButton: true,
            filterCellStyle: {fontSize:'13px'},
            headerStyle: {backgroundColor: '#ddd',lineHeight:"15px", textAlign:'center',fontSize:'13px'}
          }}
          icons={tableIcons}
          title=" "
          columns={state.columns}
          data={users}
          components={{
              Action: props => 
              <IconButton
                className={classes.signOutButton}
                onClick={() => {getVehicule(props.data.id)}}
                color="inherit"
              >
                <Pageview />
              </IconButton>
              }}
          editable={{
              onRowDelete: oldData =>{
            }
          }}
        />
      
      </Card>
    </div>
    
  );
};

UsersTabl.propTypes = {
  className: PropTypes.string,
};

export default UsersTabl;
