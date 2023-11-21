import React from 'react';
/* Routing */
import {useLocation } from 'react-router-dom';
/* MUI */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

// Style Grid Item 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MyWallet = () => {

    /* Receive data from NavBar */
    const { state } = useLocation();

    return (
      <>
        {!state ? "please connect your wallet" : "" }
        {state && 
          <Container maxWidth="lg">
            <Box p={2}>
              <Box>My Wallet</Box>
              <Box>
                <p>
                  <i className="far fa-address-card"></i>&nbsp;
                  <a
                    href={`https://ghostnet.tzkt.io/${state.userAddress}/operations/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {state.userAddress}
                  </a>
                </p>
              </Box>
              <Box>
                <p>
                  <i className="fas fa-piggy-bank"></i>&nbsp;
                  {(state.userBalance / 1000000).toLocaleString("en-US")} ꜩ
                </p>
              </Box>
            </Box>
          </Container>
        }
      </>
    );
  };
  
  export default MyWallet;