import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";

const ButtonNew = () => {
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
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );

}

export default ButtonNew;