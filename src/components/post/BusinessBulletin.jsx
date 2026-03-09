import SectionTitle from "../elements/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import Loader from "../common/Loader";
import PostLayoutTwo1 from "./layout/PostLayoutTwo1";

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
} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...6]
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
        background:
          "linear-gradient(180deg, #fffdf7 0%, #f7f3e8 52%, #f2ebda 100%)",
        color: "#1d2430",
      }}
    >
      <style jsx global>{`
        .business-bulletin-section {
          border-top: 1px solid rgba(126, 92, 35, 0.12);
          border-bottom: 1px solid rgba(126, 92, 35, 0.12);
        }

        .business-bulletin-section .axil-title {
          color: #1a2230 !important;
        }

        .business-bulletin-section .btn-link {
          color: #7a5a24 !important;
        }

        .business-bulletin-section .btn-link:hover {
          color: #3f2c0d !important;
        }

        .business-bulletin-section .post-block {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(120, 90, 40, 0.14);
          border-radius: 16px;
          padding: 14px;
          box-shadow: 0 18px 45px rgba(73, 54, 22, 0.08);
          backdrop-filter: blur(6px);
        }

        .business-bulletin-section .post-block > a {
          background: #fbf7ee;
          border-radius: 12px;
          padding: 8px;
        }

        .business-bulletin-section .post-cat.cat-btn {
          background: #f4ead2 !important;
          border: 1px solid #dbc089 !important;
          color: #775317 !important;
        }

        .business-bulletin-section .post-cat.cat-btn:hover {
          background: #b88a2f !important;
          color: #fffaf0 !important;
          border-color: #b88a2f !important;
        }

        .business-bulletin-section .axil-post-title,
        .business-bulletin-section .axil-post-title a {
          color: #1f2937 !important;
        }

        .business-bulletin-section .axil-post-title a:hover {
          color: #8b641d !important;
        }

        .business-bulletin-section .mid {
          color: #667085 !important;
        }

        .business-bulletin-section img {
          background: transparent !important;
        }

        @media (max-width: 767px) {
          .business-bulletin-section .post-block {
            padding: 12px;
            border-radius: 14px;
          }
        }
      `}</style>
      <div className="container">
        <SectionTitle
          title={data[0]?.category.title || "Business Bulletin"}
          btnText="ALL Posts"
          btnUrl={`/category/${data[0]?.category?.slug}`}
          pClass="title-white m-b-xs-40"
        />
        <div className="row">
          {data.map((post, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <PostLayoutTwo1 data={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessBulletin;
