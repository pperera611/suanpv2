import { Autocomplete, TextField} from "@mui/material";
import React from "react";

const SelectLocalidad = (props) => {
    
  return (
      <Autocomplete
        //value= {props.value}
        name="localidad"
        onChange ={(event,value) => props.onSelected(value)}
        disablePortal
        id="localidad"
        options={props.localidades}
        size="small"
        fullWidth
        renderInput={(params) => <TextField {...params} label="Localidad" />}
      />
    );
    
}

export default SelectLocalidad;