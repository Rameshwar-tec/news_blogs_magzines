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
        }

        .master-talks-section .btn-link {
          color: #7a5a24 !important;
        }

        .master-talks-section .btn-link:hover {
          color: #8b641d !important;
        }

        .master-talks-section .axil-content .post-block {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border: 1px solid rgba(126, 92, 35, 0.14);
          border-radius: 12px;
          padding: 10px;
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

        .master-talks-section .post-block__mid .axil-post-title {
          font-size: var(--type-h4);
          line-height: 1.3;
        }

        .master-talks-section .axil-post-title a:hover {
          color: #8b641d !important;
        }

        .master-talks-section .mid {
          color: #5e6876 !important;
          font-size: var(--type-body);
          font-family: var(--secondary-font);
          line-height: 1.65;
        }

        .master-talks-section .post-sidebar > * {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border: 1px solid rgba(126, 92, 35, 0.14);
          border-radius: 12px;
          padding: 12px;
        }

        .master-talks-section .category-widget h3,
        .master-talks-section .post-widget .nav-link {
          color: #1d2430 !important;
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
          .master-talks-section .post-block__mid .axil-post-title {
            font-size: var(--type-h5);
            line-height: 1.4;
          }

          .master-talks-section .mid {
            font-size: var(--type-small);
          }
        }
      `}</style>
      <div className="row">
        <div className="col-lg-8">
          <SectionTitle
            title={data[0]?.category.title || "Master Talks"}
            btnText="ALL Posts"
            btnUrl={`/category/${data[0]?.category?.slug}`}
            pClass="m-b-xs-10"
          />
          <div className="axil-content">
            {data.slice(0, 8).map((post, index) => (
              <div key={index} style={{ marginBottom: "8px" }}>
                <PostLayoutTwo data={post} postSizeMd={true} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <SharedSidebarWidgets className="post-sidebar" />
        </div>
      </div>
    </div>
  );
};

export default MasterTalks;
