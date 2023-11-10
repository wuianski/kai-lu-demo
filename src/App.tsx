import React, { useState } from "react";
import "./App.css";
/* MUI */
import Box from '@mui/material/Box';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./pages/NavBar";
import MyWallet from "./pages/MyWallet";
import Home from "./pages/Home"

const App = () => {
  return (
    <>
      <Box>
        <BrowserRouter>
          <Routes>  
            <Route path="/" element={<NavBar />}>           
              <Route index element={<Home />}/>
              <Route path="mywallet" element={<MyWallet />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  )
};

export default App;
