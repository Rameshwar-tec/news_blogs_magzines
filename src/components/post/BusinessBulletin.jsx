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
      style={{ background: "#06080B", color: "#DCE2EA" }}
    >
      <style jsx global>{`
        .business-bulletin-section .axil-title {
          color: #f3f5f7 !important;
        }

        .business-bulletin-section .btn-link {
          color: #b8c1cc !important;
        }

        .business-bulletin-section .btn-link:hover {
          color: #f3f5f7 !important;
        }

        .business-bulletin-section .post-block {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 10px;
        }

        .business-bulletin-section .post-cat.cat-btn {
          background: #2f2613 !important;
          border: 1px solid #6f5a2a !important;
          color: #f0d58a !important;
        }

        .business-bulletin-section .post-cat.cat-btn:hover {
          background: #d4af37 !important;
          color: #111315 !important;
          border-color: #d4af37 !important;
        }

        .business-bulletin-section .axil-post-title,
        .business-bulletin-section .axil-post-title a {
          color: #e8edf3 !important;
        }

        .business-bulletin-section .axil-post-title a:hover {
          color: #ffffff !important;
        }

        .business-bulletin-section .mid {
          color: #aeb6c1 !important;
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
