import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { createUser } from '../../Reducers/user/userthunks/createUserThunk';
import { toast } from 'react-toastify';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function SignUp(props) {

  const { handleUserForm } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(
    {
      name: '',
      email: '',
      password: '',
    })


  async function handleSubmit(e) {
    e.preventDefault();
    try {

      console.log("dhhhd")
      const response = await dispatch(createUser(user)).unwrap();
      console.log(response);
      if (response?.message === 'user created successfully') {
        toast.success('Sign up successfully',
          {
            position: "top-right",
            autoClose: 1500,
          })
        navigate('/user/dashboard');
      } else {
        toast.error('Sign In failed', {
          position: "top-right",
          autoClose: 1500,
        });

        navigate('/');
      }

    } catch (error) {
      toast.error('Sign In failed', {
        position: "top-right",
        autoClose: 1500,
      });
      navigate('/')
    }


  }


  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });

  }



  return (
    <Box
      sx={{
        flexGrow: 0,
        height: '100%',
        width: '100%',
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          width: '100%',
          height: '97vh',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#e0ebeb54',
        }}
      >
        <Grid
          size={{ md: 6 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4DB6AC',
            padding: 2,
          }}
        >
          <Item
            elevation={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h2" sx={{ color: 'grey' }}>
              USER REGISTRATION
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl
                sx={{
                  margin: 0,
                  padding: 0,
                  width: '100%',
                  gap: 2,
                }}
              >
                <TextField
                  type="text"
                  name="name"
                  label="Enter Name"
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
                <TextField
                  type="email"
                  name="email"
                  label="Enter Email"
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
                <TextField
                  type="text"
                  name="password"
                  label="Enter Password"
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Sign Up
                </Button>
                <Typography
                  onClick={handleUserForm}
                  color='purple'
                >
                  Existing User?&nbsp; Login

                </Typography>

              </FormControl>
            </form>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
