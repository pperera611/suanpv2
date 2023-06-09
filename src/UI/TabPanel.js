import Box from '@mui/material/Box';
import PropTypes from 'prop-types';


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


function TabPanel(props) {
    const { children, value, index, ...other } = props;
 
    return (
      
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          
          <Box sx={{ p: 2}}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  export default TabPanel;