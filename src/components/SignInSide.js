import React, { useState,useEffect  } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from "../UI/Copyright";
import { auth } from "../auth/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "../UI/Spinner";




export default function SignInSide() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, loading] = useAuthState(auth);
  const [validationErrors, setValidationErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  
  const validateEmail = () => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return "Por favor, ingresa un correo electrónico válido.";
    }
    return null;
  };
  
  const validatePassword = () => {
    if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    return null;
  };

  const updateValidationError = (errorType, errorMessage) => {
    setValidationErrors((prevErrors) => {
      const filteredErrors = prevErrors.filter((error) => !error.startsWith(errorType));
      if (errorMessage) {
        return [...filteredErrors, `${errorType}: ${errorMessage}`];
      }
      return filteredErrors;
    });
  };

  const validateInputs = () => {
    const errors = [];
  
    const emailError = validateEmail();
    if (emailError) {
      errors.push(`email: ${emailError}`);
    }

    const passwordError = validatePassword();
    if (passwordError) {
      errors.push(`password: ${passwordError}`);
    }
  
    return errors;
  };

  const handleEmailBlur = () => {
    const emailError = validateEmail();
    updateValidationError("email", emailError);
  };
  
  const handlePasswordBlur = () => {
    const passwordError = validatePassword();
    updateValidationError("password", passwordError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    const errors = validateInputs();

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
};

  if (loading) {
    return <Spinner/>;
  }

  return (
    
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                value={email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
              />
              <TextField
                margin="normal"
                valu={password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {error && <p>{error}</p>}
              {validationErrors.map((error, index) => (
                <p key={index}>{error.split(": ")[1]}</p>
              ))}

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    
  );
}