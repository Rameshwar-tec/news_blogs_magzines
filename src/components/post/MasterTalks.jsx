import PostLayoutTwo from "./layout/PostLayoutTwo";
import SharedSidebarWidgets from "../widget/SharedSidebarWidgets";

import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import SectionTitle from "../elements/SectionTitle";
import Loader from "../common/Loader";

const MasterTalks = ({ postData, adBanner, pClass }) => {
  const query = `
*[
  _type == "post" &&
  "master-talks" in categories[]->slug.current
]
{
  title,
   altText,
  slug,
  'featureImg': mainImage.asset->url,
  description,
  _updatedAt,
  'category': {
    'title': "Master Talks",
    'slug': "master-talks"
  },
  publishedAt
} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...7]
`;
  const { data, isLoading, error } = useQuery({
    queryKey: ["master-talks-home"],
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
    className="container master-talks-section"
    style={{
      marginTop: "8px",
      background: "#f6f2e8",
      color: "#1d2430",
      fontFamily: "var(--secondary-font)",
    }}
  >
      <style jsx global>{`
        .master-talks-section .axil-title {
          color: #1d2430 !important;
          font-size: var(--type-h3);
        }

        .master-talks-section .btn-link {
          color: #7a5a24 !important;
        }

        .master-talks-section .btn-link:hover {
          color: #8b641d !important;
        }

        .master-talks-section .axil-content .post-block {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 6px 0;
          margin-bottom: 0 !important;
        }

        .master-talks-section .axil-content {
          border-top: 1px solid rgba(126, 92, 35, 0.12);
          border-bottom: 1px solid rgba(126, 92, 35, 0.12);
        }

        .master-talks-section .axil-content > div {
          margin-bottom: 0 !important;
        }

        .master-talks-section .axil-content > div + div {
          border-top: 1px solid rgba(126, 92, 35, 0.12);
        }

        .master-talks-section .post-cat.cat-btn {
          background: #f5ead3 !important;
          border: 1px solid #d8bc7b !important;
          color: #7a5a24 !important;
          font-size: var(--type-caption) !important;
          font-family: var(--secondary-font) !important;
        }

        .master-talks-section .post-cat.cat-btn:hover {
          background: #d4af37 !important;
          color: #3f2c0d !important;
          border-color: #d4af37 !important;
        }

        .master-talks-section .axil-post-title,
        .master-talks-section .axil-post-title a {
          color: #1d2430 !important;
          font-family: var(--primary-font) !important;
        }

        .master-talks-section .axil-content .post-block .axil-post-title {
          font-size: var(--type-h5);
          line-height: 1.45;
          margin-bottom: 0.35rem;
        }

        .master-talks-section .axil-post-title a:hover {
          color: #8b641d !important;
        }

        .master-talks-section .market-news-stack-desc {
          color: #5e6876 !important;
          font-size: var(--type-small);
          font-family: var(--secondary-font);
          line-height: 1.4;
          margin-bottom: 0;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .master-talks-section .axil-content .post-block > a,
        .master-talks-section .axil-content .post-block figure > a {
          margin-right: 1rem;
        }

        .master-talks-section .axil-content .post-block img {
          max-width: 9.5rem;
        }

        .master-talks-section .axil-content .post-block .media-body {
          align-self: flex-start;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }

        .master-talks-section .axil-content .post-block p {
          margin-bottom: 0 !important;
        }

        .master-talks-section .post-sidebar > * {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border: 1px solid rgba(126, 92, 35, 0.14);
          border-radius: 12px;
          padding: 8px;
        }

        .master-talks-section .category-widget h3,
        .master-talks-section .post-widget .nav-link {
          color: #1d2430 !important;
          font-size: 12px !important;
        }

        .master-talks-section .post-sidebar .section-title {
          font-size: var(--type-small) !important;
          line-height: 1.35 !important;
          margin-bottom: 0.8rem !important;
        }

        .master-talks-section .post-sidebar .post-widget .media.post-block {
          padding: 0 !important;
        }

        .master-talks-section .post-sidebar .post-widget .axil-post-title {
          font-size: 13px !important;
          line-height: 1.45 !important;
        }

        .master-talks-section .post-sidebar .post-widget .post-cat.cat-btn {
          font-size: 10px !important;
          padding: 2px 6px !important;
        }

        .master-talks-section .post-sidebar .post-widget img {
          max-width: 8.2rem !important;
        }

        .master-talks-section .post-sidebar .shared-sidebar-panel {
          gap: 0.7rem !important;
        }

        .master-talks-section .post-sidebar .sidebar-post-widget .nav-pills {
          gap: 6px !important;
          margin-bottom: 0.9rem !important;
        }

        .master-talks-section .post-sidebar .sidebar-post-widget .nav-pills .nav-item a {
          font-size: 10px !important;
          padding: 0.65rem 0.35rem !important;
          border-radius: 10px !important;
        }

        .master-talks-section .post-sidebar .sidebar-post-widget .tab-content {
          padding-top: 0.35rem !important;
        }

        .master-talks-section .post-sidebar .sidebar-post-widget .post-block.post-block__small {
          margin-bottom: 0.2rem !important;
          padding-bottom: 0.2rem !important;
        }

        .master-talks-section .post-sidebar .sidebar-post-widget .post-block.post-block__small > a,
        .master-talks-section .post-sidebar .sidebar-post-widget .post-block.post-block__small figure > a {
          margin-right: 1rem !important;
        }

        .master-talks-section .post-sidebar .sidebar-post-widget .post-block.post-block__small .media-body {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }

        .master-talks-section .post-sidebar .newsletter-widget .axil-title,
        .master-talks-section .post-sidebar .newsletter-widget h3,
        .master-talks-section .post-sidebar .category-widget .widget-title {
          font-size: var(--type-small) !important;
          line-height: 1.35 !important;
        }

        .master-talks-section .post-sidebar .newsletter-widget p,
        .master-talks-section .post-sidebar .newsletter-widget input,
        .master-talks-section .post-sidebar .newsletter-widget button,
        .master-talks-section .post-sidebar .category-widget li,
        .master-talks-section .post-sidebar .widget-social-share a {
          font-size: 12px !important;
        }

        .master-talks-section .post-sidebar .category-widget .single-cat {
          padding: 8px !important;
        }

        .master-talks-section .post-sidebar .category-widget .single-cat .inner {
          padding: 8px !important;
        }

        .master-talks-section .post-sidebar .category-widget .cat-content {
          padding: 8px 10px !important;
        }

        .master-talks-section .post-sidebar .category-widget .cat-content .cat-title,
        .master-talks-section .post-sidebar .category-widget .cat-content h4,
        .master-talks-section .post-sidebar .category-widget .cat-content a {
          font-size: 12px !important;
          line-height: 1.35 !important;
        }

        .master-talks-section .post-sidebar .category-widget .category-slider {
          height: calc((145px * 4) + (0.9rem * 3)) !important;
        }

        .master-talks-section .post-sidebar .category-widget .category-item {
          margin-bottom: 0.9rem !important;
        }

        .master-talks-section .post-sidebar .category-widget .category-item > a,
        .master-talks-section .post-sidebar .category-widget .category-item :global(a.d-block.position-relative) {
          height: 145px !important;
          border-radius: 10px !important;
        }

        .master-talks-section .post-sidebar .category-widget .category-card-title {
          font-size: var(--type-small) !important;
          line-height: 1.25 !important;
          padding: 0 10px !important;
        }

        .master-talks-section .category-widget .owl-nav button.custom-owl-prev,
        .master-talks-section .category-widget .owl-nav button.custom-owl-next {
          background: #fffaf1 !important;
          border: 1px solid rgba(126, 92, 35, 0.14);
        }

        .master-talks-section .category-widget .owl-nav button.custom-owl-prev i,
        .master-talks-section .category-widget .owl-nav button.custom-owl-next i {
          color: #4d5b6c !important;
        }

        @media (max-width: 991px) {
          .master-talks-section .axil-content .post-block .axil-post-title {
            font-size: var(--type-small);
            line-height: 1.5;
          }

          .master-talks-section .market-news-stack-desc {
            font-size: var(--type-caption);
          }

          .master-talks-section .axil-content .post-block {
            padding: 6px 0;
          }

          .master-talks-section .axil-content .post-block > a,
          .master-talks-section .axil-content .post-block figure > a {
            margin-right: 0.8rem;
          }

          .master-talks-section .axil-content .post-block img {
            max-width: 7.2rem;
          }
        }
      `}</style>
      <div className="row">
        <div className="col-lg-9">
          <SectionTitle
            title={data[0]?.category.title || "Master Talks"}
            btnText="ALL Posts"
            btnUrl={`/category/${data[0]?.category?.slug}`}
            pClass="m-b-xs-10"
          />
          <div className="axil-content">
            {data.slice(0, 8).map((post, index) => (
              <div key={index}>
                <PostLayoutTwo data={post} showDescription />
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-3">
          <SharedSidebarWidgets className="post-sidebar" />
        </div>
      </div>
    </div>
  );
};

export default MasterTalks;
