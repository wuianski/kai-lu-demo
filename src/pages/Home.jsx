/* MUI */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
/* Fetch data */
import { useState, useEffect } from "react";
import axios from "axios";
/* MUI - card */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/* Style Grid Item */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {

  /* Fetch data */
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://api.akaswap.com/v2/fa2tokens?limit=10`
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box p={6} sx={{textAlign:"center", fontSize: "2rem"}}>fa2 tokens minted on akaSwap</Box>
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
          {data &&
            data.tokens.map(({ tokenId, name, amount, creators, thumbnailUri,tags }) => (
              <Grid key={tokenId} xs={4} sm={4} md={4}>
                <Item>
                  {/* {console.log(tokenId)} */}
                  <Card sx={{ maxWidth: 380 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={`https://assets.akaswap.com/ipfs/${thumbnailUri.replace("ipfs://", "")}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {name}
                      </Typography>
                      <Typography gutterBottom variant="body2" color="text.secondary">
                        Edition of {amount}
                      </Typography>
                      <Typography gutterBottom fontSize="12px" color="text.secondary">
                        {creators && creators.map(( creator, index ) => (
                          <Box key={index} component="span">
                            by {creator}
                          </Box>
                        ))}
                      </Typography>
                      <Typography fontSize="12px" color="text.secondary">
                          {tags.length > 0 ? "tags:" : ""}
                          <Box component="span">
                            {tags && tags.map(( tag, index ) => (
                              <Box key={index} component="span" ml={1}>
                                {tag}
                              </Box>
                            ))}
                          </Box>
                      </Typography>
                    </CardContent>
                  </Card>
                </Item>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};
  
  export default Home;