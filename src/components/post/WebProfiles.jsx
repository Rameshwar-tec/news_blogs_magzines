import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Loader from "../common/Loader";
import { client } from "../../client";

const formatRelativeTime = (dateString) => {
  if (!dateString) return "Recently added";

  const publishedTime = new Date(dateString).getTime();

  if (Number.isNaN(publishedTime)) return "Recently added";

  const diffMs = Date.now() - publishedTime;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diffMs < hour) {
    const minutes = Math.max(1, Math.floor(diffMs / minute));
    return `${minutes} min ago`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} hr ago`;
  }

  if (diffMs < week) {
    const days = Math.floor(diffMs / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const weeks = Math.floor(diffMs / week);
  return `${weeks} wk${weeks > 1 ? "s" : ""} ago`;
};

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
  altText,
  'featureImg': mainImage.asset->url,
  'category': {
    'title': "Web Profiles",
    'slug': "web-profiles"
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
  if (!data?.length) return null;

  const selectedPost = data[selectedProfile] || data[0];

  return (
    <section className="web-profiles-section section-gap section-gap-top__with-text">
      <div className="container">
        <div className="web-profiles-shell">
          <div className="web-profiles-header">
            <div className="web-profiles-heading">
              <span className="heading-dot" />
              <h2>{selectedPost?.category?.title || "Web Profiles"}</h2>
            </div>
            <Link
              href={`/category/${selectedPost?.category?.slug || "web-profiles"}`}
              className="header-pill-button"
            >
              View All
            </Link>
          </div>

          <div className="web-profiles-grid">
            <article className="featured-profile-card">
              <Link
                href={`/post/${selectedPost.slug.current}`}
                className="featured-profile-image"
              >
                <Image
                  src={selectedPost.featureImg}
                  alt={selectedPost.altText || selectedPost.title}
                  width={900}
                  height={620}
                  priority={selectedProfile === 0}
                />
              </Link>

              <div className="featured-profile-copy">
                <div className="featured-meta-row">
                  <span className="featured-category">
                    {selectedPost?.category?.title || "Web Profiles"}
                  </span>
                  <span className="featured-date">
                    {formatRelativeTime(
                      selectedPost.publishedAt || selectedPost._updatedAt
                    )}
                  </span>
                </div>

                <h3 className="featured-title">
                  <Link href={`/post/${selectedPost.slug.current}`}>
                    {selectedPost.title}
                  </Link>
                </h3>

                <p className="featured-summary">
                  Explore the latest web profile from our editorial selection and
                  browse the rest of the stories from the panel.
                </p>
              </div>
            </article>

            <aside className="profile-list-panel">
              <div className="profile-list">
                {data.map((post, index) => (
                  <button
                    key={post.slug.current}
                    type="button"
                    className={`profile-list-item ${
                      selectedProfile === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedProfile(index)}
                  >
                    <span className="profile-list-thumb">
                      <Image
                        src={post.featureImg}
                        alt={post.altText || post.title}
                        width={88}
                        height={68}
                        unoptimized
                      />
                    </span>

                    <span className="profile-list-copy">
                      <span className="profile-list-meta">
                        <span className="profile-list-category">
                          {post?.category?.title || "Web Profiles"}
                        </span>
                        <span className="profile-list-date">
                          {formatRelativeTime(post.publishedAt || post._updatedAt)}
                        </span>
                      </span>
                      <span className="profile-list-title">{post.title}</span>
                    </span>
                  </button>
                ))}
              </div>

              <Link
                href={`/category/${selectedPost?.category?.slug || "web-profiles"}`}
                className="panel-footer-button"
              >
                See All Profiles
              </Link>
            </aside>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .web-profiles-section {
          background: #f6f3ec;
          padding-top: 32px;
          padding-bottom: 32px;
        }

        .web-profiles-section .container {
          max-width: 1180px;
        }

        .web-profiles-shell {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
        }

        .web-profiles-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .web-profiles-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex: 1;
        }

        .web-profiles-heading::after {
          content: "";
          flex: 1;
          min-width: 40px;
          height: 3px;
          background: #dfc167;
          border-radius: 999px;
        }

        .web-profiles-heading h2 {
          margin: 0;
          font-size: 2.15rem;
          line-height: 1;
          font-weight: 700;
          color: #181818;
          white-space: nowrap;
        }

        .heading-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #f0a313;
          box-shadow: none;
          flex-shrink: 0;
        }

        .header-pill-button,
        .panel-footer-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 26px;
          border-radius: 999px;
          background: #f7a400;
          color: #1f1606 !important;
          font-size: 0.95rem;
          font-weight: 700;
          border: none;
          transition: background 0.2s ease;
          box-shadow: none;
        }

        .header-pill-button:hover,
        .panel-footer-button:hover {
          background: #eb9800;
          color: #1f1606 !important;
          transform: none;
        }

        .web-profiles-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(320px, 0.95fr);
          gap: 22px;
          align-items: stretch;
        }

        .featured-profile-card {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
        }

        .featured-profile-image {
          display: block;
          width: 100%;
          aspect-ratio: 1.43 / 1;
          border-radius: 10px;
          overflow: hidden;
          background: #ece7dc;
        }

        .featured-profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .featured-profile-copy {
          padding: 12px 0 0;
        }

        .featured-meta-row,
        .profile-list-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .featured-category,
        .profile-list-category {
          color: #e4a123;
          font-size: 0.96rem;
          font-weight: 700;
          letter-spacing: 0.01em;
        }

        .featured-date,
        .profile-list-date {
          color: #6c685f;
          font-size: 0.96rem;
          font-weight: 600;
        }

        .featured-title {
          margin: 10px 0 8px;
          max-width: 92%;
          font-size: 2.55rem;
          line-height: 1.08;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .featured-title a {
          color: #161616 !important;
        }

        .featured-title a:hover {
          color: #7e5310 !important;
        }

        .featured-summary {
          margin: 0;
          max-width: 78%;
          color: #7a746a;
          font-size: 1.02rem;
          line-height: 1.6;
        }

        .profile-list-panel {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 100%;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
        }

        .profile-list {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 0;
          justify-content: space-between;
        }

        .profile-list-item {
          width: 100%;
          display: grid;
          grid-template-columns: 78px minmax(0, 1fr);
          gap: 18px;
          align-items: center;
          padding: 15px 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid #e7e0d2;
          border-radius: 0;
          text-align: left;
          transition: opacity 0.2s ease;
        }

        .profile-list-item:hover {
          background: transparent;
          border-color: #e7e0d2;
          transform: none;
          opacity: 0.82;
        }

        .profile-list-item.active {
          background: transparent;
          border-color: #e7e0d2;
          box-shadow: none;
        }

        .profile-list-thumb {
          display: block;
          border-radius: 10px;
          overflow: hidden;
          background: #ece7dc;
        }

        .profile-list-thumb img {
          width: 78px;
          height: 60px;
          object-fit: cover;
          display: block;
        }

        .profile-list-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .profile-list-title {
          color: #1b1b1b;
          font-size: 1.24rem;
          line-height: 1.36;
          font-weight: 700;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 2;
        }

        .panel-footer-button {
          width: 100%;
          min-height: 52px;
          margin-top: 16px;
          font-size: 1.02rem;
        }

        @media (max-width: 1199px) {
          .featured-title {
            font-size: 2.15rem;
          }

          .featured-summary {
            max-width: 100%;
          }
        }

        @media (max-width: 991px) {
          .web-profiles-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .web-profiles-section {
            padding-top: 24px;
            padding-bottom: 24px;
          }

          .web-profiles-shell {
            padding: 0;
          }

          .web-profiles-header {
            align-items: stretch;
            flex-direction: column;
            gap: 12px;
          }

          .web-profiles-heading {
            width: 100%;
          }

          .web-profiles-heading h2 {
            font-size: 1.7rem;
          }

          .header-pill-button,
          .panel-footer-button {
            width: 100%;
          }

          .featured-profile-card,
          .profile-list-panel {
            border-radius: 0;
          }

          .featured-profile-image {
            aspect-ratio: 1.4 / 1;
          }

          .featured-profile-copy {
            padding: 12px 0 0;
          }

          .featured-title {
            max-width: 100%;
            font-size: 1.9rem;
          }

          .featured-summary {
            max-width: 100%;
            font-size: 0.98rem;
          }

          .profile-list-item {
            grid-template-columns: 68px minmax(0, 1fr);
            gap: 12px;
            padding: 12px 0;
            border-radius: 0;
          }

          .profile-list-thumb img {
            width: 68px;
            height: 52px;
          }

          .profile-list-title {
            font-size: 1.08rem;
          }

          .profile-list-category,
          .profile-list-date {
            font-size: 0.86rem;
          }
        }
      `}</style>
    </section>
  );
};

export default WebProfiles;
