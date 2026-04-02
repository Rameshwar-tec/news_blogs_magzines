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
    <div className="post-widget sidebar-post-widget">
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
        :global(.sidebar-post-widget) {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border: 1px solid rgba(126, 92, 35, 0.14);
          border-radius: 16px;
          padding: 14px;
          box-shadow: 0 12px 28px rgba(126, 92, 35, 0.12);
          font-family: var(--secondary-font);
        }

        :global(.sidebar-post-widget .nav-pills) {
          border-color: rgba(126, 92, 35, 0.14);
          margin-bottom: 1.25rem;
          gap: 8px;
        }

        :global(.sidebar-post-widget .nav-pills .nav-item a) {
          background: #fffaf1;
          border: 1px solid rgba(126, 92, 35, 0.16);
          border-radius: 12px;
          color: #5e6876;
          font-size: var(--type-small);
          font-family: var(--secondary-font);
          letter-spacing: 0.05em;
          padding: 0.9rem 0.5rem;
          font-weight: 600;
        }

        :global(.sidebar-post-widget .nav-pills .nav-item a:hover),
        :global(.sidebar-post-widget .nav-pills .nav-item a.active) {
          background-color: #f5ead3;
          border-color: rgba(212, 175, 55, 0.52);
          color: #7a5a24;
        }

        :global(.sidebar-post-widget .tab-content) {
          border-top: 1px solid rgba(126, 92, 35, 0.14);
          padding-top: 1rem;
        }

        :global(.sidebar-post-widget .post-block.post-block__small) {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(126, 92, 35, 0.12);
        }

        :global(.sidebar-post-widget .post-block.post-block__small:last-child) {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        :global(.sidebar-post-widget .post-block__on-dark-bg .axil-post-title a) {
          color: #1d2430;
        }

        :global(.sidebar-post-widget .post-block__on-dark-bg .axil-post-title a:hover) {
          color: #8b641d;
        }

        :global(.sidebar-post-widget .post-block.post-block__small .bg-color-blue-one) {
          color: #8b641d;
          background: #f5ead3;
          border: 1px solid rgba(212, 175, 55, 0.28);
          border-radius: 999px;
          padding: 0.25rem 0.65rem;
          font-size: var(--type-caption);
          font-family: var(--secondary-font);
        }

        :global(.sidebar-post-widget .post-block.post-block__small .axil-post-title) {
          font-size: var(--type-small);
          font-family: var(--primary-font);
          font-weight: 700;
          line-height: 1.45;
        }

        :global(.sidebar-post-widget .post-block.post-block__small .axil-post-title a) {
          font-family: var(--primary-font);
        }

        :global(.sidebar-post-widget .post-block.post-block__small .post-cat-group) {
          font-family: var(--secondary-font);
        }

        :global(.sidebar-post-widget .tab-pane > p) {
          color: #5e6876;
          margin: 0.5rem 0;
          font-family: var(--secondary-font);
          font-size: var(--type-small);
        }
      `}</style>
    </div>
  );
};

export default WidgetPost;
