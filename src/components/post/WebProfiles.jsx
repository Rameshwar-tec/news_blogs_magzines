import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Loader from "../common/Loader";
import { client } from "../../client";
import PostLayoutOne from "./layout/PostLayoutOne";
import PostLayoutTwo from "./layout/PostLayoutTwo";

const WebProfiles = () => {
  const query = `
*[
  _type == "post" &&
  "web-profiles" in categories[]->slug.current
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
    'title': "Web Profiles",
    'slug': "web-profiles"
  }
} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...5]
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["web-profiles-home"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching posts</div>;
  if (!data?.length) return null;

  return (
    <section className="web-profiles-section section-gap section-gap-top__with-text">
      <div className="container">
        <div className="web-profiles-header">
          <div className="web-profiles-heading">
            <span className="heading-dot" />
            <h2>{data[0]?.category?.title || "Web Profiles"}</h2>
          </div>
          <Link
            href={`/category/${data[0]?.category?.slug || "web-profiles"}`}
            className="header-pill-button"
          >
            View All
          </Link>
        </div>

        <div className="row no-gutters web-profiles-grid">
          <div className="col-lg-7" style={{ display: "flex" }}>
            <div className="web-profiles-feature">
              <PostLayoutOne
                data={data[0]}
                descriptionLimit={1200}
                separateMoreLink
              />
            </div>
          </div>
          <div className="col-lg-5" style={{ display: "flex" }}>
            <div className="axil-recent-news web-profiles-stack">
              <div className="axil-content">
                {data.slice(1).map((post, index) => (
                  <div key={post.slug?.current || index} className="web-profiles-stack-item">
                    <PostLayoutTwo
                      data={post}
                      tagInContent
                      showDescription
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .web-profiles-section {
          background: #f6f3ec;
          padding-top: 18px !important;
          padding-bottom: 18px !important;
          font-family: var(--secondary-font);
        }

        .web-profiles-section .container {
          max-width: 1180px;
        }

        .web-profiles-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }

        .web-profiles-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex: 1;
        }

        .web-profiles-heading::after {
          content: "";
          flex: 1;
          min-width: 40px;
          height: 3px;
          background: #dfc167;
          border-radius: 999px;
        }

        .web-profiles-heading h2 {
          margin: 0;
          font-size: var(--type-h3);
          font-family: var(--primary-font);
          line-height: 1;
          font-weight: 700;
          color: #181818;
          white-space: nowrap;
        }

        .heading-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #f0a313;
          flex-shrink: 0;
        }

        .header-pill-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          padding: 0 16px;
          border-radius: 999px;
          background: #f7a400;
          color: #1f1606 !important;
          font-size: var(--type-caption);
          font-family: var(--secondary-font);
          font-weight: 700;
          border: none;
          transition: background 0.2s ease;
        }

        .header-pill-button:hover {
          background: #eb9800;
          color: #1f1606 !important;
          transform: none;
        }

        .web-profiles-section .post-block {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border: none;
          border-radius: 0;
          padding: 10px;
        }

        .web-profiles-section .axil-recent-news .post-block {
          margin-bottom: 0 !important;
        }

        .web-profiles-section .post-cat.cat-btn {
          background: #f7a400 !important;
          border: 1px solid #f7a400 !important;
          color: #1f1606 !important;
          font-size: var(--type-caption) !important;
        }

        .web-profiles-section .post-cat.cat-btn:hover {
          background: #eb9800 !important;
          color: #1f1606 !important;
          border-color: #eb9800 !important;
        }

        .web-profiles-section .post-block > a:hover img,
        .web-profiles-section .post-block figure > a:hover img,
        .web-profiles-section .featured-profile-image:hover img,
        .web-profiles-section .profile-list-thumb:hover img {
          transform: none !important;
        }

        .web-profiles-section .post-block:hover > a img,
        .web-profiles-section .post-block:hover figure > a img,
        .web-profiles-section .featured-profile-card:hover img,
        .web-profiles-section .profile-list-item:hover img {
          transform: none !important;
        }

        .web-profiles-section .axil-post-title,
        .web-profiles-section .axil-post-title a {
          color: #161616 !important;
        }

        .web-profiles-section .axil-latest-post .axil-post-title {
          font-size: var(--type-h2);
          line-height: 1.2;
        }

        .web-profiles-section .post-block .axil-post-title {
          font-size: var(--type-h5);
          line-height: 1.45;
        }

        .web-profiles-section .axil-post-title a:hover {
          color: #7e5310 !important;
        }

        .web-profiles-section .axil-recent-news {
          margin-top: 0 !important;
        }

        .web-profiles-section .web-profiles-grid {
          align-items: stretch;
          margin-left: 0;
          margin-right: 0;
        }

        .web-profiles-section .web-profiles-grid > [class*="col"] {
          padding-left: 0;
          padding-right: 0;
        }

        .web-profiles-section .web-profiles-feature {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .web-profiles-section .web-profiles-feature .axil-latest-post {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .web-profiles-section .web-profiles-feature .axil-latest-post .post-block {
          display: flex;
          flex-direction: column;
          margin-bottom: 0 !important;
          background: transparent;
          padding: 0;
        }

        .web-profiles-section .web-profiles-feature .fig-container {
          width: 100%;
          margin: 0 !important;
        }

        .web-profiles-section .web-profiles-feature .fig-container .post-cat-group {
          position: static !important;
          left: auto !important;
          bottom: auto !important;
          z-index: auto !important;
          margin: 12px 0 4px !important;
        }

        .web-profiles-section .web-profiles-feature .fig-container > a {
          display: block;
          margin: 0 !important;
        }

        .web-profiles-section .web-profiles-feature .fig-container img {
          width: 100% !important;
          aspect-ratio: 16 / 10.6;
          object-fit: cover !important;
          display: block;
        }

        .web-profiles-section .web-profiles-feature .media-body {
          margin-top: 0 !important;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .web-profiles-section .web-profiles-feature .media-body .post-cat-group {
          order: -1;
          align-self: flex-start;
        }

        .web-profiles-section .web-profiles-feature .axil-post-title {
          margin-bottom: 5px !important;
        }

        .web-profiles-section .market-news-feature-desc {
          margin: 0;
          color: #7a746a;
          font-size: var(--type-small);
          line-height: 1.75;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }

        .web-profiles-section .market-news-feature-more {
          display: inline-flex;
          margin-top: 6px;
          color: #e4a123 !important;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
        }

        .web-profiles-section .market-news-feature-more:hover {
          color: #7e5310 !important;
          text-decoration: underline;
        }

        .web-profiles-section .web-profiles-stack {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }

        .web-profiles-section .web-profiles-stack .axil-content {
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          border-top: 1px solid #e7e0d2;
          border-bottom: 1px solid #e7e0d2;
        }

        .web-profiles-section .web-profiles-stack-item {
          margin-bottom: 0 !important;
          display: flex;
        }

        .web-profiles-section .web-profiles-stack-item + .web-profiles-stack-item {
          border-top: 1px solid #e7e0d2;
        }

        .web-profiles-section .web-profiles-stack .post-block {
          background: transparent;
          padding: 12px;
          width: 100%;
        }

        .web-profiles-section .web-profiles-stack-item:first-child .post-block {
          padding-top: 12px;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        .web-profiles-section .web-profiles-stack-item:last-child .post-block {
          padding-bottom: 0;
        }

        .web-profiles-section .web-profiles-stack-item:last-child {
          flex: 1;
        }

        .web-profiles-section .web-profiles-stack-item:last-child .post-block {
          min-height: 100%;
          display: flex;
          align-items: flex-start;
        }

        .web-profiles-section .web-profiles-stack .market-news-stack-card {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 10px 0;
        }

        .web-profiles-section .web-profiles-stack .market-news-stack-card > a {
          margin-right: 18px;
          align-self: flex-start;
        }

        .web-profiles-section .web-profiles-stack .market-news-stack-card > a :global(img) {
          width: 190px !important;
          height: 130px !important;
          max-width: none;
          object-fit: cover !important;
        }

        .web-profiles-section .web-profiles-stack .market-news-stack-card .media-body {
          flex: 1;
          min-width: 0;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          align-self: flex-start;
        }

        .web-profiles-section .web-profiles-stack .market-news-stack-card .post-cat-group {
          margin-bottom: 8px !important;
        }

        .web-profiles-section .web-profiles-stack .market-news-stack-card .axil-post-title {
          margin-bottom: 10px;
        }

        .web-profiles-section .web-profiles-stack .market-news-stack-desc {
          margin: 0;
          color: #7a746a;
          font-size: calc(var(--type-small) - 1px);
          line-height: 1.65;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        @media (max-width: 991px) {
          .web-profiles-header {
            margin-bottom: 16px;
          }

          .web-profiles-heading h2 {
            font-size: var(--type-h3);
          }

          .web-profiles-section .axil-latest-post .axil-post-title {
            font-size: var(--type-h3);
            line-height: 1.25;
          }

          .web-profiles-section .post-block .axil-post-title {
            font-size: var(--type-small);
            line-height: 1.5;
          }

          .web-profiles-section .web-profiles-feature .fig-container img {
            aspect-ratio: 16 / 10;
          }

          .web-profiles-section .market-news-feature-desc {
            -webkit-line-clamp: 4;
          }

          .web-profiles-section .web-profiles-stack .market-news-stack-card > a {
            margin-right: 14px;
          }

          .web-profiles-section .web-profiles-stack .market-news-stack-card > a :global(img) {
            width: 160px !important;
            height: 110px !important;
          }
        }

        @media (max-width: 767px) {
          .web-profiles-section {
            padding-top: 24px;
            padding-bottom: 24px;
          }

          .web-profiles-header {
            align-items: stretch;
            flex-direction: column;
            gap: 12px;
          }

          .header-pill-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default WebProfiles;
