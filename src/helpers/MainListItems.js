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
      <Link to="/ua" style={{ textDecorationLine: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <AddHomeWorkIcon />
          </ListItemIcon>
          <ListItemText
            primary="U. Administrativas"
            primaryTypographyProps={{
              style: { color: "#CC4545" },
              fontWeight: "bold",
            }}
          />
        </ListItemButton>
      </Link>
      <Link to="/grados" style={{ textDecorationLine: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText
          primary="Grados"
          primaryTypographyProps={{
            style: { color: "#CC4545", fontWeight: "bold" },
          }}
        />
      </ListItemButton>
      </Link>
      <Link to="/localidades" style={{ textDecorationLine: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText
          primary="Localidades"
          primaryTypographyProps={{
            style: { color: "#CC4545", fontWeight: "bold" },
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
