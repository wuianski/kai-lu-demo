import React, { useState } from "react"
/* Routing - The <Outlet> renders the current route selected. */
import { Outlet, Link, useNavigate} from "react-router-dom";
/* Taquito */
import { TezosToolkit } from "@taquito/taquito";
import ConnectButton from "../components/ConnectWallet";
import DisconnectButton from "../components/DisconnectWallet";
/* MUI */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

enum BeaconConnection {
  NONE = "",
  LISTENING = "Listening to P2P channel",
  CONNECTED = "Channel connected",
  PERMISSION_REQUEST_SENT = "Permission request sent, waiting for response",
  PERMISSION_REQUEST_SUCCESS = "Wallet is connected",
}

/* Style Grid Item */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const NavBar = () => {

  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit("https://ghostnet.ecadinfra.com")
  );
  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);
  const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("transfer");
  
  /* Ghostnet Increment/Decrement contract */
  const contractAddress: string = "KT1QMGSLynvwwSfGbaiJ8gzWHibTCweCGcu8";

  /* Routing - Navigate and send data to MyWallet */
  const navigate = useNavigate();
  function handleClick() {
    navigate('/mywallet', { state: {userAddress, userBalance} });
  }

  return (
    <>
      <Container maxWidth="lg">      
          <Box p={2} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={2}>
                <Item><Link to="/"><Box sx={{color:"#000", textAlign:"left"}} pl={2}>Home</Box></Link></Item>
              </Grid>
              <Grid xs={4} xsOffset={4}>
                {/* <Item>Menu</Item> */}
              </Grid>
              <Grid xs>
                <Item>
                <>
                  {(() => {
                      if (userAddress && !isNaN(userBalance)) {
                      return (
                        <>                    
                          <Box p={2} sx={{cursor:"pointer", color: "royalblue"}} onClick={handleClick}>My Wallet</Box>      
                          <DisconnectButton
                            wallet={wallet}
                            setPublicToken={setPublicToken}
                            setUserAddress={setUserAddress}
                            setUserBalance={setUserBalance}
                            setWallet={setWallet}
                            setTezos={setTezos}
                            setBeaconConnection={setBeaconConnection}
                          />
                          <Box>wallet connected</Box>
                        </>
                      );
                    } else if (!userAddress && !userBalance) {
                      return (
                        <>                       
                          <ConnectButton
                            Tezos={Tezos}
                            setContract={setContract}
                            setPublicToken={setPublicToken}
                            setWallet={setWallet}
                            setUserAddress={setUserAddress}
                            setUserBalance={setUserBalance}
                            setStorage={setStorage}
                            contractAddress={contractAddress}
                            setBeaconConnection={setBeaconConnection}
                            wallet={wallet}
                          />
                          <Box>wallet disconnected</Box>
                        </>
                      );
                    } else {
                      return <div>An error has occurred</div>;
                    }
                  })()}
                </>
                </Item>
              </Grid>
            </Grid>
          </Box>  
      </Container>
       
      <Outlet />
    </>
  )
};

export default NavBar;