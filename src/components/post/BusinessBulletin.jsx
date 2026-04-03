import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import Loader from "../common/Loader";
import PostLayoutOne from "./layout/PostLayoutOne";
import Link from "next/link";

const BusinessBulletin = () => {
  const query = `
*[
  _type == "post" &&
  "business-bulletin" in categories[]->slug.current
]
{
  title,
  slug,
   altText,
  'featureImg': mainImage.asset->url,
  publishedAt,
  _updatedAt,
  description,
  'category': {
    'title': "Business Bulletin",
    'slug': "business-bulletin"
  }
} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...4]
`;
  const { data, isLoading, error } = useQuery({
    queryKey: ["business-bulletin-home"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching posts</div>;

  if (!data) return null;

  return (
    <div
      className="section-gap section-gap-top__with-text trending-stories business-bulletin-section"
      style={{
        background: "#f6f2e8",
        color: "#1d2430",
      }}
    >
      <style jsx global>{`
        .business-bulletin-section {
          padding-top: 18px !important;
          padding-bottom: 18px !important;
        }

        .business-bulletin-section .business-bulletin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }

        .business-bulletin-section .business-bulletin-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex: 1;
        }

        .business-bulletin-section .business-bulletin-heading::after {
          content: "";
          flex: 1;
          min-width: 40px;
          height: 3px;
          background: #dfc167;
          border-radius: 999px;
        }

        .business-bulletin-section .business-bulletin-heading h2 {
          margin: 0;
          font-size: var(--type-h3);
          font-family: var(--primary-font);
          line-height: 1;
          font-weight: 700;
          color: #181818;
          white-space: nowrap;
        }

        .business-bulletin-section .business-bulletin-heading-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #f0a313;
          flex-shrink: 0;
        }

        .business-bulletin-section .business-bulletin-view-all {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          padding: 0 16px;
          border-radius: 999px;
          background: #f5ead3;
          color: #7a5a24 !important;
          font-size: var(--type-caption);
          font-family: var(--secondary-font);
          font-weight: 700;
          border: 1px solid #d8bc7b;
          transition: background 0.2s ease;
        }

        .business-bulletin-section .business-bulletin-view-all:hover {
          background: #d4af37;
          color: #3f2c0d !important;
          transform: none;
        }

        .business-bulletin-section .post-block {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border: none;
          border-radius: 0;
          padding: 10px;
        }

        .business-bulletin-section .axil-recent-news .post-block {
          margin-bottom: 0 !important;
        }

        .business-bulletin-section .post-cat.cat-btn {
          background: #f5ead3 !important;
          border: 1px solid #d8bc7b !important;
          color: #7a5a24 !important;
          font-size: var(--type-caption) !important;
        }

        .business-bulletin-section .post-cat.cat-btn:hover {
          background: #d4af37 !important;
          color: #3f2c0d !important;
          border-color: #d4af37 !important;
        }

        .business-bulletin-section .axil-post-title,
        .business-bulletin-section .axil-post-title a {
          color: #1d2430 !important;
        }

        .business-bulletin-section .axil-latest-post .axil-post-title {
          font-size: var(--type-h2);
          line-height: 1.2;
        }

        .business-bulletin-section .post-block .axil-post-title {
          font-size: var(--type-h5);
          line-height: 1.45;
        }

        .business-bulletin-section .axil-post-title a:hover {
          color: #8b641d !important;
        }

        .business-bulletin-section .axil-recent-news {
          margin-top: 0 !important;
        }

        .business-bulletin-section .business-bulletin-grid {
          align-items: stretch;
          margin-left: 0;
          margin-right: 0;
        }

        .business-bulletin-section .business-bulletin-grid > [class*="col"] {
          padding-left: 0;
          padding-right: 0;
        }

        .business-bulletin-section .business-bulletin-feature {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .business-bulletin-section .business-bulletin-feature .axil-latest-post {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .business-bulletin-section .business-bulletin-feature .axil-latest-post .post-block {
          display: flex;
          flex-direction: column;
          margin-bottom: 0 !important;
          background: transparent;
          padding: 0;
        }

        .business-bulletin-section .business-bulletin-feature .fig-container {
          width: 100%;
          margin: 0 0 18px !important;
        }

        .business-bulletin-section .business-bulletin-feature .fig-container .post-cat-group {
          display: none !important;
        }

        .business-bulletin-section .business-bulletin-feature .fig-container > a {
          display: block;
          margin: 0 !important;
        }

        .business-bulletin-section .business-bulletin-feature .fig-container img {
          width: 100% !important;
          aspect-ratio: 16 / 8.6;
          object-fit: cover !important;
          display: block;
        }

        .business-bulletin-section .business-bulletin-feature .media-body {
          margin-top: 8px !important;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .business-bulletin-section .business-bulletin-feature .axil-post-title {
          margin-bottom: 12px !important;
        }

        .business-bulletin-section .market-news-feature-desc {
          margin: 0;
          color: rgba(29, 36, 48, 0.78);
          font-size: var(--type-small);
          line-height: 1.75;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
        }

        .business-bulletin-section .market-news-feature-more {
          color: #7a5a24 !important;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
        }

        .business-bulletin-section .business-bulletin-stack {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }

        .business-bulletin-section .business-bulletin-stack .axil-content {
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          border-bottom: 1px solid rgba(126, 92, 35, 0.12);
        }

        .business-bulletin-section .business-bulletin-stack-item {
          margin-bottom: 0 !important;
          display: flex;
        }

        .business-bulletin-section .business-bulletin-stack-item + .business-bulletin-stack-item {
          border-top: 1px solid rgba(126, 92, 35, 0.12);
        }

        .business-bulletin-section .business-bulletin-stack .post-block {
          background: transparent;
          padding: 12px;
          width: 100%;
          margin-bottom: 0 !important;
        }

        .business-bulletin-section .business-bulletin-stack-item:first-child .post-block {
          padding-top: 0;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        .business-bulletin-section .business-bulletin-stack-item:last-child .post-block {
          padding-bottom: 0;
        }

        .business-bulletin-section .business-bulletin-stack-item:last-child {
          flex: 1;
        }

        .business-bulletin-section .business-bulletin-stack-item:last-child .post-block {
          min-height: 100%;
          display: flex;
          align-items: flex-start;
        }

        .business-bulletin-section .business-bulletin-stack .market-news-stack-card {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 10px 0;
        }

        .business-bulletin-section .business-bulletin-stack .market-news-stack-card > a {
          margin-right: 18px;
          align-self: flex-start;
        }

        .business-bulletin-section .business-bulletin-stack .market-news-stack-card > a :global(img) {
          width: 190px !important;
          height: 130px !important;
          max-width: none;
          object-fit: cover !important;
        }

        .business-bulletin-section .business-bulletin-stack .market-news-stack-card .media-body {
          flex: 1;
          min-width: 0;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          align-self: flex-start;
        }

        .business-bulletin-section .business-bulletin-stack .market-news-stack-card .axil-post-title {
          margin-bottom: 10px;
        }

        .business-bulletin-section .business-bulletin-stack .market-news-stack-desc {
          margin: 0;
          color: rgba(29, 36, 48, 0.72);
          font-size: calc(var(--type-small) - 1px);
          line-height: 1.65;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        @media (max-width: 991px) {
          .business-bulletin-section .business-bulletin-header {
            margin-bottom: 16px;
          }

          .business-bulletin-section .business-bulletin-heading h2 {
            font-size: var(--type-h3);
          }

          .business-bulletin-section .axil-latest-post .axil-post-title {
            font-size: var(--type-h3);
            line-height: 1.25;
          }

          .business-bulletin-section .post-block .axil-post-title {
            font-size: var(--type-small);
            line-height: 1.5;
          }

          .business-bulletin-section .business-bulletin-feature .fig-container img {
            aspect-ratio: 16 / 10;
          }

          .business-bulletin-section .market-news-feature-desc {
            -webkit-line-clamp: 4;
          }

          .business-bulletin-section .business-bulletin-stack .market-news-stack-card > a {
            margin-right: 14px;
          }

          .business-bulletin-section .business-bulletin-stack .market-news-stack-card > a :global(img) {
            width: 160px !important;
            height: 110px !important;
          }
        }

        @media (max-width: 767px) {
          .business-bulletin-section .business-bulletin-header {
            align-items: stretch;
            flex-direction: column;
            gap: 12px;
          }

          .business-bulletin-section .business-bulletin-view-all {
            width: 100%;
          }
        }
      `}</style>
      <div className="container">
        <div className="business-bulletin-header">
          <div className="business-bulletin-heading">
            <span className="business-bulletin-heading-dot" />
            <h2>{data[0]?.category.title || "Business Bulletin"}</h2>
          </div>
          <Link
            href={`/category/${data[0]?.category?.slug}`}
            className="business-bulletin-view-all"
          >
            View All
          </Link>
        </div>
        <div className="row no-gutters business-bulletin-grid">
          <div className="col-lg-6" style={{ display: "flex" }}>
            <div className="business-bulletin-feature">
              <PostLayoutOne data={data[0]} />
            </div>
          </div>
          <div className="col-lg-6" style={{ display: "flex" }}>
            <div className="axil-recent-news business-bulletin-stack">
              <div className="axil-content">
                {data.slice(1).map((post, index) => (
                  <div key={index} className="business-bulletin-stack-item">
                    <PostLayoutTwo
                      data={post}
                      tagAboveImage
                      showDescription
                      hideCategory
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessBulletin;
