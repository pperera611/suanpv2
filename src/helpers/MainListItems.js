import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { Link } from 'react-router-dom';


const MainListItems = (props) => {
 

  return (
    <React.Fragment>
      <Link to="/afiliados" style={{ textDecorationLine: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Afiliados"
            primaryTypographyProps={{
              style: { color: "#CC4545" },
              fontWeight: "bold",
            }}
          />
        </ListItemButton>
      </Link>
      <Link to="/mantenimiento/ua" style={{ textDecorationLine: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <AddHomeWorkIcon />
          </ListItemIcon>
          <ListItemText
            primary="Mantenimiento"
            primaryTypographyProps={{
              style: { color: "#CC4545" },
              fontWeight: "bold",
            }}
          />
        </ListItemButton>
      </Link>
      
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText
          primary="Parametros"
          primaryTypographyProps={{
            style: { color: "#CC4545", fontWeight: "bold" },
          }}
        />
      </ListItemButton>
    </React.Fragment>
  );

};

export default MainListItems;
