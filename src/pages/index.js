import Head from "next/head";
import { useEffect, useState } from "react";
import HeadMeta from "../components/elements/HeadMeta";
import FooterTwo from "../components/footer/FooterTwo";
import HeaderOne from "../components/header/HeaderOne";
import MasterTalks from "../components/post/MasterTalks";
import LogoSlider from "../components/post/LogoSlider";
import Magazines from "../components/post/Magazines";
import BusinessBulletin from "../components/post/BusinessBulletin";
import SliderOne from "../components/slider/SliderOne";
import WebProfiles from "../components/post/WebProfiles";
import MarketNews from "../components/post/MarketNews";
import MagazineHero from "../components/hero/MagazineHero";
import ScrollToTop from "../components/common/ScrollToTop";

const Home = () => {
  console.log("Home component rendering");

  useEffect(() => {
    return () => {};
  }, []);
  
  return (
    <div suppressHydrationWarning style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Head>
        <meta name="google-site-verification" content="Hb-PBtfDrWImSPQKiNhfbw0JxtOLWsPKDEbfz_WJ8ZE" />
      </Head>
      <HeadMeta
        metaTitle="The Entrepreneurial Chronicles: A Business Magazine for Inspiring Entrepreneur Stories"
        metaDesc="The Entrepreneurial Chronicles is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality."
      />
      <HeaderOne />

      <MagazineHero />
      <div className="home-main-fullwidth">
        <BusinessBulletin />
        {/* <LogoSlider /> */}
        <SliderOne />
        <LogoSlider title="Our Partner Brands" showTitle={true} />
        <WebProfiles />
        <MarketNews />
        <Magazines />
        <MasterTalks />
      </div>
      <FooterTwo />
      <ScrollToTop />

      <style jsx global>{`
        .home-main-fullwidth .container,
        .home-main-fullwidth .container-fluid {
          max-width: 100% !important;
          width: 100% !important;
          padding-left: 10px !important;
          padding-right: 10px !important;
        }

        .home-main-fullwidth .row {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }

        .home-main-fullwidth .row > [class*="col"] {
          padding-left: 6px !important;
          padding-right: 6px !important;
        }

        @media (min-width: 768px) {
          .home-main-fullwidth .container,
          .home-main-fullwidth .container-fluid {
            padding-left: 14px !important;
            padding-right: 14px !important;
          }
          .home-main-fullwidth .row > [class*="col"] {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
        }

        @media (min-width: 1200px) {
          .home-main-fullwidth .container,
          .home-main-fullwidth .container-fluid {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
          .home-main-fullwidth .row > [class*="col"] {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }
        }

      `}</style>
    </div>
  );
};

export default Home;
