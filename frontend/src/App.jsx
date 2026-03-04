import React from 'react'
import './app.css';
import Layout from "./layout/Layout"
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Layout />
    </>
  )
}

export default App