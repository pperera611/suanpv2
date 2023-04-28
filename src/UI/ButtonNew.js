import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

const ButtonNew = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        borderRadius: 1,
        color: "text.secondary",
        "& svg": {
          m: 1.5,
        },
        "& hr": {
          mx: 0.5,
        },
      }}
    >
      <Tooltip title= {props.title}>
        <Fab color="secondary" aria-label="add">
          <AddIcon/>
        </Fab>
      </Tooltip>
    </Box>
  );

}

export default ButtonNew;