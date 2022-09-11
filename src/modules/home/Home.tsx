import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import AppLoaderOverlay from '../../components/app-loader-overlay';
// import NavMenu from '../../components';
// import Footer from '../../components/footer';
import { useAppDispatch, useAppSelector } from '../../store';
import { contractInfoLoadingSelector } from '../../store/selectors/contract-info-selectors';
import { mintPage } from '../../router/constants';
import MintSection from './components/mint-section';
import NavMenu from '../../components/nav-menu';
import StorySection from './components/story-section';
import Gallery from './components/gallery';
import Footer from '../../components/footer';
import LabSection from './components/lab-section';
import NewPortal from './components/new-portal';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Scroll = require('react-scroll');

const scroll = Scroll.animateScroll;

const Home = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const contractLoading = useAppSelector(contractInfoLoadingSelector);
  useEffect(() => {
    scroll.scrollToTop();
  }, []);
  return (
    <motion.div
      transition={{ opacity: { duration: 0.7 }, default: { ease: 'linear' } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
      className=" bg-fontBackground min-h-screen w-screen flex flex-col"
    >
      {contractLoading && <AppLoaderOverlay />}
      <NavMenu />

      <Element name="mint-section">
        <MintSection />
      </Element>
      <div style={{ backgroundSize: 'contain' }} className=" opacity-75 mt-10 bg-repeat-y sm:px-5 py-40 pb-20 px-20 bg-banner-image">
        <Element name="story-section">
          <StorySection />
        </Element>
        <Element name="gallery-section">
          <Gallery />
        </Element>

        <Element name="lab-section">
          <LabSection />
        </Element>
      </div>

      <Element name="new-portal">
        <NewPortal />
      </Element>

      <Footer />
    </motion.div>
  );
};

export default Home;
