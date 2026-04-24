import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import RelatedArticles from "../../components/post/RelatedArticles";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { client } from "../../client";
import Loader from "../../components/common/Loader";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";

const getEmbeddedPublicationUrl = (publicationUrl) => {
  if (!publicationUrl) return "";

  try {
    const url = new URL(publicationUrl);
    const hostname = url.hostname.toLowerCase();
    const pathname = url.pathname.replace(/\/+$/, "");

    // PubHTML5 recommends using the index.html path for secure embeds.
    if (hostname === "online.pubhtml5.com") {
      return `https://s3.amazonaws.com${url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`}index.html`;
    }

    if (hostname.includes("pubhtml5.com") && !pathname.endsWith("/index.html")) {
      url.pathname = `${pathname}/index.html`;
      return url.toString();
    }

    return url.toString();
  } catch (error) {
    return publicationUrl;
  }
};

const fetchMagazineContent = async (slug) => {
  const magazineContentQuery = `*[_type == "magazine" && slug.current == $slug]{
    title,
    slug,
    keywords,
    description,
    'featureImg': mainImage.asset->url,
    issuuLink
  }`;
  return await client.fetch(magazineContentQuery, { slug });
};

const fetchAllArticles = async () => {
  const allArticlesQuery = `*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "web-profiles"][0]._id] {
    title,
    slug,
    publishedAt,
    'featureImg': mainImage.asset->url,
    'category': {
      'title': categories[0]->title,
      'slug': categories[0]->slug.current
    }
  } | order(publishedAt desc)[0...3]`;
  return await client.fetch(allArticlesQuery);
};

const fetchCurrentMagArticle = async (slug) => {
  const currentMagArticleQuery = `*[_type == "post" && _id == *[_type == "magazine" && slug.current == $slug][0].linkedArticle[0]._ref]{
    title,
    slug,
    'featureImg': mainImage.asset->url
  }`;
  return await client.fetch(currentMagArticleQuery, { slug });
};

const MagazineDetails = ({
  initialMagazineContent,
  initialAllArticles,
  initialCurrentMagArticle,
}) => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: magazineContent,
    isLoading: isLoadingMagazine,
    error: errorMagazine,
  } = useQuery({
    queryKey: ["magazineContent", slug],
    queryFn: () => fetchMagazineContent(slug),
    enabled: !!slug,
    initialData: initialMagazineContent,
  });

  const {
    data: allArticles,
    isLoading: isLoadingAllArticles,
    error: errorAllArticles,
  } = useQuery({
    queryKey: ["web-profiles"],
    queryFn: fetchAllArticles,
    initialData: initialAllArticles,
  });

  const {
    data: currentMagArticle,
    isLoading: isLoadingCurrentArticle,
    error: errorCurrentArticle,
  } = useQuery({
    queryKey: ["currentMagArticle", slug],
    queryFn: () => fetchCurrentMagArticle(slug),
    enabled: !!slug,
    initialData: initialCurrentMagArticle,
  });

  if (isLoadingMagazine || isLoadingAllArticles || isLoadingCurrentArticle)
    return <Loader />;
  if (errorMagazine)
    return <div>Error fetching magazine content: {errorMagazine.message}</div>;
  if (errorAllArticles)
    return <div>Error fetching articles: {errorAllArticles.message}</div>;
  if (errorCurrentArticle)
    return (
      <div>
        Error fetching current magazine article: {errorCurrentArticle.message}
      </div>
    );
  if (!magazineContent || magazineContent.length === 0)
    return <div>No magazine content found</div>;

  const { issuuLink } = magazineContent[0];
  const embeddedPublicationUrl = getEmbeddedPublicationUrl(issuuLink);

  return (
    <>
      <HeadMetaDynamic metaData={magazineContent[0]} />

      <HeaderOne />
      <div className="magazine-reader-shell">
        <iframe
          allow="clipboard-write"
          sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
          allowFullScreen={true}
          className="magazine-reader-frame"
          referrerPolicy="strict-origin-when-cross-origin"
          src={embeddedPublicationUrl}
          title={magazineContent[0]?.title || "Publication"}
        />
      </div>
      <div className="magazine-detail-footer">
        <RelatedArticles
          currentMagArticle={currentMagArticle}
          allMagazinesArticles={allArticles}
        />
        <FooterTwo />
      </div>

      <style jsx>{`
        .magazine-reader-shell {
          position: relative;
          height: 90vh;
          width: 100%;
          padding-bottom: 0;
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border-top: 1px solid rgba(126, 92, 35, 0.12);
          border-bottom: 1px solid rgba(126, 92, 35, 0.12);
        }

        .magazine-reader-frame {
          position: absolute;
          inset: 0;
          border: none;
          width: 100%;
          height: 100%;
          background: #fffdf8;
        }

        .magazine-detail-footer {
          margin-top: 0;
          background: #f6f2e8;
        }
      `}</style>
    </>
  );
};

export default MagazineDetails;

export async function getStaticProps({ params }) {
  const { slug } = params;

  const initialMagazineContent = await fetchMagazineContent(slug);
  const initialAllArticles = await fetchAllArticles();
  const initialCurrentMagArticle = await fetchCurrentMagArticle(slug);

  return {
    props: {
      initialMagazineContent,
      initialAllArticles,
      initialCurrentMagArticle,
    },
  };
}

export async function getStaticPaths() {
  const slugsQuery = `*[_type == "magazine"].slug.current`;
  const slugs = await client.fetch(slugsQuery);

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
