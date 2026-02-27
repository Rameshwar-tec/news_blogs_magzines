import SectionTitle from "../elements/SectionTitle";
import PostVideoOne from "./layout/PostVideoOne";
import PostVideoTwo from "./layout/PostVideoTwo";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import { useState } from "react";
import Image from "next/image";

const WebProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState(0);
  
  const query = `
*[
  _type == "post" &&
  "web-profiles" in categories[]->slug.current
]
 {
    title,
    slug,
    'featureImg': mainImage.asset->url,
     'category': {
    'title': "Web Profiles",
    altText,
    'slug': "web-profiles",
    },
    publishedAt,
    _updatedAt

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

  if (!data) return null;

  const handleProfileClick = (index) => {
    setSelectedProfile(index);
  };

  return (
    <div
      className="axil-video-posts section-gap section-gap-top__with-text web-profiles-section"
      style={{ background: "#070A0E", color: "#DCE2EA" }}
    >
      <div className="container">
        <SectionTitle
          btnUrl={`/category/${data[0]?.category?.slug}`}
          title={`${data[0]?.category.title}` || "Web Profiles"}
          btnText="Read all Articles"
          pClass="title-white m-b-xs-40"
        />
        <div className="row">
          <div className="col-lg-8">
            <PostVideoOne data={data[selectedProfile]} />
          </div>
          <div className="col-lg-4">
            <div className="webprofile-names-list">
              <h4 className="names-list-title">Select Profile</h4>
              {data.map((post, index) => (
                <div
                  key={index}
                  className={`name-item ${selectedProfile === index ? 'active' : ''}`}
                  onClick={() => handleProfileClick(index)}
                >
                  <div className="name-content">
                    <div className="name-image">
                      <Image
                        src={post.featureImg} 
                        alt={post.title}
                        width={60}
                        height={60}
                        unoptimized
                      />
                    </div>
                    <span className="name-text">{post.title}</span>
                  </div>
                  <div className="name-indicator"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          .web-profiles-section .axil-title {
            color: #f3f5f7 !important;
          }

          .web-profiles-section .btn-link {
            color: #b8c1cc !important;
          }

          .web-profiles-section .btn-link:hover {
            color: #f3f5f7 !important;
          }

          .web-profiles-section .media-body__big .axil-post-title,
          .web-profiles-section .media-body__big .axil-post-title a {
            color: #eef2f6 !important;
          }

          .webprofile-main-image img {
            max-width: 250px;
            max-height: 180px;
            object-fit: cover;
          }
          
          .webprofile-names-list {
            padding: 20px;
            background: linear-gradient(180deg, #0e1218 0%, #0a0d12 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            height: fit-content;
          }
          
          .names-list-title {
            color: #e4c46d;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .name-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            margin-bottom: 10px;
            background: rgba(255, 255, 255, 0.04);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
          }
          
          .name-content {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .name-image {
            width: 70px;
            height: 60px;
            border-radius: 6px;
            overflow: hidden;
            flex-shrink: 0;
          }
          
          .name-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
          }
          
          .name-item:hover {
            background: rgba(212, 175, 55, 0.08);
            transform: translateX(5px);
            border-color: rgba(212, 175, 55, 0.3);
          }
          
          .name-item.active {
            background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%);
            color: #000;
            border-color: #D4AF37;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          }
          
          .name-item.active .name-text {
            color: #000;
            font-weight: 600;
          }
          
          .name-text {
            color: #d7dee8;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          
          .name-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
          }
          
          .name-item.active .name-indicator {
            background: #000;
            transform: scale(1.2);
          }
          
          .name-item:hover .name-indicator {
            background: #D4AF37;
            transform: scale(1.1);
          }
        `}</style>
      </div>
    </div>
  );
};

export default WebProfiles;
