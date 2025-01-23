import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SuccessBar({ open, handleClose }) {
    return (
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
         sx={{ 
                width: '100%', 
                height: '10%',  // Adjust height
                maxWidth: '600px',  // Adjust the width of the snackbar
                mx: 'auto',  // Center it horizontally
                mt: 2  ,
                 marginBottom:"6%"
            }}
        message="Your profile has been updated successfully!">
            
            <Alert
            
             severity="success"
            variant="filled"
           sx={{ 
                    width: '100%', 
                    fontSize: { xs: '14px', sm: '16px' },  // Adjust font size for small screens
                    borderRadius: '8px',  // Rounded corners
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.2)',  // Custom shadow
                    textAlign: 'center',
                    padding: { xs: '8px', sm: '12px' }  // Responsive padding
                }}
          >
        <strong> Saved Changes </strong><br/> Your profile has been updated successfully!
  </Alert>
        </Snackbar>
        
        
    );
}