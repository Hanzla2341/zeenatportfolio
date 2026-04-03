import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';

function App() {
  const isAdmin = window.location.pathname === '/admin';

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Services />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
