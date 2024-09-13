import React from 'react';
import Header from '../../components/Header';
import Intro from './Intro';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import Certifications from './Certifications';
import Contact from './Contact';
import Footer from './Footer';
import LeftSider from './LeftSider';
import SideMover from './SideMover';
import SideMenu from './SideMenu';
import { useSelector } from 'react-redux';

function Home() {
  const { portfolioData } = useSelector((state) => state.root);

  return (
    <div>
      <Header />
      {portfolioData && (
        <div className='bg-primary px-40 sm:px-5'>
          <Intro />
          <About />
          <Experiences />
          <Projects />
          <Certifications/>
          <Contact />
          <LeftSider />
          <SideMover />
          <div className="sm:block hidden">
            <SideMenu />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;
