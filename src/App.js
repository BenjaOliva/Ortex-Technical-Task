import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { SignIn } from './components/login/Login';
import Home from './components/Home';
import Footer from './components/common/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box top="0" zIndex={'999'} position="sticky">
          <Navbar />
        </Box>
        <Routes>
          <Route path={'/login'} element={<SignIn />} />
          <Route path={'/'} element={<Box pt={3}><Home /></Box>} />
        </Routes>
      </Router>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
