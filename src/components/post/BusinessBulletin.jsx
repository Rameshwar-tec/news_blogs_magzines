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
    <div className="section-gap section-gap-top__with-text trending-stories" style={{ background: '#000', color: '#fff' }}>
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
