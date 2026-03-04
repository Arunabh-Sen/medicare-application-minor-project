import React from 'react'
import './app.css';
import Layout from "./layout/Layout"
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer theme="colored" autoClose={3000} closeOnClick pauseOnHover />
      <ScrollToTop />
      <Layout />
    </>
  )
}

export default App