import { Tab, Nav } from "react-bootstrap";
import PostVideoTwo from "../post/layout/PostVideoTwo";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const WidgetPost = () => {
  const queryWebProfiles = `
*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "web-profiles"][0]._id] 
 {
    title,
    slug,
    'featureImg': mainImage.asset->url,
     'category': {
    'title': categories[0]->title,
    altText,
    'slug': categories[0]->slug.current,
    },
    publishedAt

} | order(publishedAt desc)[0...5] 
`;
  const { data: webProfileData } = useQuery({
    queryKey: ["web-profile"],
    queryFn: async () => {
      const response = await client.fetch(queryWebProfiles);
      return response;
    },
  });

  const queryMarketNews = `
*[
  _type == "post" &&
  "market-news" in categories[]->slug.current
]
 {
    title,
    slug,
    'featureImg': mainImage.asset->url,
     'category': {
    'title': categories[0]->title,
    altText,
    'slug': categories[0]->slug.current,
    },
    publishedAt,
    _updatedAt

} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...5]
`;
  const { data: marketNewsData } = useQuery({
    queryKey: ["market-news-widget"],
    queryFn: async () => {
      const response = await client.fetch(queryMarketNews);
      return response;
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const queryBusinessBulletins = `
*[
  _type == "post" &&
  "business-bulletin" in categories[]->slug.current
]
 {
    title,
    slug,
    'featureImg': mainImage.asset->url,
     'category': {
    'title': "Business Bulletin",
    altText,
    'slug': "business-bulletin",
    },
    publishedAt,
    _updatedAt

} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...5]
`;
  const { data: businessBulletinData } = useQuery({
    queryKey: ["business-bulletin-widget"],
    queryFn: async () => {
      const response = await client.fetch(queryBusinessBulletins);
      return response;
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  return (
    <div className="post-widget sidebar-post-widget m-b-xs-40">
      <Tab.Container id="widget-post" defaultActiveKey="recent">
        <Nav variant="pills" className="row no-gutters">
          <Nav.Item className="col">
            <Nav.Link eventKey="recent">Web Profiles</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col">
            <Nav.Link eventKey="popular">Market News</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col">
            <Nav.Link eventKey="comments">Business Bulletins</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="recent">
            {webProfileData && webProfileData?.length > 0 ? (
              webProfileData
                .slice(0, 4)
                .map((data, index) => (
                  <PostVideoTwo data={data} key={index} />
                ))
            ) : (
              <p>No posts found.</p>
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="popular">
            {marketNewsData && marketNewsData?.length > 0 ? (
              marketNewsData
                .slice(0, 4)
                .map((data, index) => (
                  <PostVideoTwo data={data} key={index} />
                ))
            ) : (
              <p>No posts found.</p>
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="comments">
            {businessBulletinData && businessBulletinData.length > 0 ? (
              businessBulletinData
                .slice(0, 4)
                .map((data, index) => (
                  <PostVideoTwo data={data} key={index} />
                ))
            ) : (
              <p>No posts found.</p>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <style jsx>{`
        :global(.sidebar-post-widget .nav-pills) {
          border-color: rgba(255, 255, 255, 0.14);
          margin-bottom: 1.25rem;
        }

        :global(.sidebar-post-widget .nav-pills .nav-item a) {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.12);
          color: #b9c3cf;
          font-size: 1.05rem;
          letter-spacing: 0.05em;
          padding: 0.9rem 0.5rem;
        }

        :global(.sidebar-post-widget .nav-pills .nav-item a:hover),
        :global(.sidebar-post-widget .nav-pills .nav-item a.active) {
          background-color: rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.42);
          color: #f1e0b0;
        }

        :global(.sidebar-post-widget .tab-content) {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 0.8rem;
        }

        :global(.sidebar-post-widget .post-block.post-block__small) {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        :global(.sidebar-post-widget .post-block.post-block__small:last-child) {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        :global(.sidebar-post-widget .post-block__on-dark-bg .axil-post-title a) {
          color: #e7edf4;
        }

        :global(.sidebar-post-widget .post-block__on-dark-bg .axil-post-title a:hover) {
          color: #d4af37;
        }

        :global(.sidebar-post-widget .post-block.post-block__small .bg-color-blue-one) {
          color: #d3b46a;
        }

        :global(.sidebar-post-widget .tab-pane > p) {
          color: #9eacbc;
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
};

export default WidgetPost;
