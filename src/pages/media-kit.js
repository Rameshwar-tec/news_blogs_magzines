import React from "react";
import Head from "next/head";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import MediaKit from "../components/media-kit/MediaKit";
import HeadMeta from "../components/elements/HeadMeta";

const MediaKitPage = () => {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="Hb-PBtfDrWImSPQKiNhfbw0JxtOLWsPKDEbfz_WJ8ZE" />
      </Head>
      <HeadMeta
        metaTitle="Media Kit - The Global Voice of Education Leadership and Innovation"
        metaDesc="Download our media kit with brand guidelines, logos, and promotional materials."
      />
      <HeaderOne />
      <MediaKit />
      <FooterTwo />
    </>
  );
};

export default MediaKitPage;
