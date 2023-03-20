import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { Link } from 'react-router-dom';


const MainListItems = (props) => {
 

  return (
    <React.Fragment>
      <Link to="/afiliados" style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Afiliados" />
        </ListItemButton>
      </Link>
      <Link to="/ua" style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <AddHomeWorkIcon />
          </ListItemIcon>
          <ListItemText primary="U. Administrativas" />
        </ListItemButton>
      </Link>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Grados" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Localidades" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Parametros" />
      </ListItemButton>
    </React.Fragment>
  );

};

export default MainListItems;
