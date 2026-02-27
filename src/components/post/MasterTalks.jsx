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
  <div className="container master-talks-section" style={{ marginTop: "8px", background: "#070A0E", color: "#DCE2EA" }}>
      <style jsx global>{`
        .master-talks-section .axil-title {
          color: #f3f5f7 !important;
        }

        .master-talks-section .btn-link {
          color: #b8c1cc !important;
        }

        .master-talks-section .btn-link:hover {
          color: #f3f5f7 !important;
        }

        .master-talks-section .axil-content .post-block {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 10px;
        }

        .master-talks-section .post-cat.cat-btn {
          background: #2f2613 !important;
          border: 1px solid #6f5a2a !important;
          color: #f0d58a !important;
        }

        .master-talks-section .post-cat.cat-btn:hover {
          background: #d4af37 !important;
          color: #111315 !important;
          border-color: #d4af37 !important;
        }

        .master-talks-section .axil-post-title,
        .master-talks-section .axil-post-title a {
          color: #e8edf3 !important;
        }

        .master-talks-section .axil-post-title a:hover {
          color: #ffffff !important;
        }

        .master-talks-section .mid {
          color: #aeb6c1 !important;
        }

        .master-talks-section .post-sidebar > * {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 12px;
        }

        .master-talks-section .category-widget h3,
        .master-talks-section .post-widget .nav-link {
          color: #e8edf3 !important;
        }

        .master-talks-section .category-widget .owl-nav button.custom-owl-prev,
        .master-talks-section .category-widget .owl-nav button.custom-owl-next {
          background: #1b212a !important;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .master-talks-section .category-widget .owl-nav button.custom-owl-prev i,
        .master-talks-section .category-widget .owl-nav button.custom-owl-next i {
          color: #cfd6df !important;
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
