import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router';
import { useState } from 'react';
import SignUp from '../components/users/SignUp.jsx'
import SignIn from '../components/users/SignIn.jsx'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Home() {
 
  const [isSignup, setIsSignUp]= useState(false);

 function handleUserForm ()
 {
       setIsSignUp(!isSignup);
       console.log("clicked")
 }
  

 

  return (
     <Box sx={{display:'flex', justifyContent:'center', flexDirection:"column", backgroundColor:"red", alignItems:'center', width:'100%', margin:'0', padding:'0'}}>
   
    {isSignup?<SignUp handleUserForm = {handleUserForm}/>:<SignIn handleUserForm = {handleUserForm}/>}
   
     </Box>
  );
}
