import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import HeadMeta from "../components/elements/HeadMeta";
import Loader from "../components/common/Loader";
import { client } from "../client";

const MediaKit = dynamic(() => import("../components/media-kit/MediaKit"), {
  ssr: false,
});

const mediaKitQuery = `
  *[_type == "mediaKit"] | order(featured desc, publishedAt desc, _createdAt desc)[0]{
    title,
    description,
    keywords,
    altText,
    mediaKitTitle,
    "mediaKitPdfUrl": mediaKitPdf.asset->url,
    "mediaKitPdfName": mediaKitPdf.asset->originalFilename,
    publishedAt,
    featured,
    "coverImage": coverImage.asset->url
  }
`;

const fetchMediaKit = async () => client.fetch(mediaKitQuery);

const MediaKitPage = ({ initialMediaKit }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["mediaKit"],
    queryFn: fetchMediaKit,
    initialData: initialMediaKit,
  });

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <>
        <HeaderOne />
        <div style={{ color: "gold", textAlign: "center", padding: "6rem 1rem" }}>
          Error fetching media kit
        </div>
        <FooterTwo />
      </>
    );
  }

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="Hb-PBtfDrWImSPQKiNhfbw0JxtOLWsPKDEbfz_WJ8ZE" />
      </Head>
      <HeadMeta
        metaTitle={data?.title ? `${data.title} - The Entrepreneurial Chronicles` : "Media Kit - The Entrepreneurial Chronicles"}
        metaDesc={
          data?.description ||
          "Download our media kit with brand guidelines, logos, and promotional materials."
        }
      />
      <HeaderOne />
      <MediaKit mediaKit={data} />
      <FooterTwo />
    </>
  );
};

export default MediaKitPage;

export async function getStaticProps() {
  const initialMediaKit = await fetchMediaKit();

  return {
    props: {
      initialMediaKit: initialMediaKit || null,
    },
    revalidate: 60,
  };
}
