import SectionTitle from "../elements/SectionTitle";
import PostLayoutOne from "./layout/PostLayoutOne";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const MarketNews = () => {
  const query = `
*[
  _type == "post" &&
  "market-news" in categories[]->slug.current
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
    'title': categories[0]->title,
    'slug': categories[0]->slug.current
  }

} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...4]
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["market-news-home"],
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
    className="recent-news-wrapper section-gap p-t-xs-15 p-t-sm-60 market-news-section"
    style={{ background: "#070A0E", color: "#DCE2EA", paddingTop: "8px", paddingBottom: "8px" }}
  >
      <style jsx global>{`
        .market-news-section .axil-title {
          color: #f3f5f7 !important;
        }

        .market-news-section .btn-link {
          color: #b8c1cc !important;
        }

        .market-news-section .btn-link:hover {
          color: #f3f5f7 !important;
        }

        .market-news-section .post-block {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 10px;
        }

        .market-news-section .post-cat.cat-btn {
          background: #2f2613 !important;
          border: 1px solid #6f5a2a !important;
          color: #f0d58a !important;
        }

        .market-news-section .post-cat.cat-btn:hover {
          background: #d4af37 !important;
          color: #111315 !important;
          border-color: #d4af37 !important;
        }

        .market-news-section .axil-post-title,
        .market-news-section .axil-post-title a {
          color: #e8edf3 !important;
        }

        .market-news-section .axil-post-title a:hover {
          color: #ffffff !important;
        }
      `}</style>
      <div className="container">
        <SectionTitle
          title={`${data[0]?.category.title}` || "Market News"}
          btnUrl={`/category/${data[0]?.category?.slug}`}
          btnText="all posts"
          pClass="m-b-xs-10"
        />
        <div className="row align-items-stretch">
          <div className="col-lg-6" style={{ display: "flex" }}>
            <div style={{ marginBottom: "2px", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
              <PostLayoutOne data={data[0]} />
            </div>
          </div>
          <div className="col-lg-6" style={{ display: "flex" }}>
            <div className="axil-recent-news" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
              <div className="axil-content" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                {data.slice(1).map((post, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <PostLayoutTwo data={post} />
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

export default MarketNews;
