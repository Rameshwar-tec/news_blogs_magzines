import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/common/Loader";
import { client } from "../client";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import HeadMeta from "../components/elements/HeadMeta";
import Image from "next/image";
import SharedSidebarWidgets from "../components/widget/SharedSidebarWidgets";
import { useRouter } from "next/router";

const Blogs = () => {
  const router = useRouter();
  const query = `
    *[
      _type == "post" &&
      "blogs-and-articles" in categories[]->slug.current
    ]
    {
      title,
      slug,
      altText,
      publishedAt,
      _updatedAt,
      'featureImg': mainImage.asset->url,
      description,
      'category': {
        'title': categories[0]->title,
        'slug': categories[0]->slug.current
      }
    } | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)
  `;

  const { data, isLoading, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const posts = Array.isArray(data) ? data : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Trigger animations after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handlePostClick = (slug) => {
    router.push(`/post/${slug}`);
  };

  return (
    <>
      <HeadMeta
        metaTitle="Best Business Blog for the Latest News, Proven Strategies, and Insightful Analysis | The Entrepreneurial Chronicles"
        metaDesc="Stay ahead of the curve with our top-ranked business blog. Get access to the latest industry news, proven strategies from experts, and insightful analysis to help your business thrive."
      />

      <HeaderOne />

      <div className="blogs-container blogs-page">
        {/* TOP ROW */}
        <div className="blogs-top-row">
          {/* Featured Articles LEFT */}
          <div className="featured-articles-section">
            <h4 className="section-title section-title--centered">Featured Articles</h4>
            <div className="featured-articles-grid">
              {isLoading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : error ? (
                <div className="error-alert">Error fetching posts</div>
              ) : (
                posts.slice(0, 3).map((post, index) => (
                  <div 
                    key={index} 
                    className={`featured-article-card ${isVisible ? 'animate-in' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handlePostClick(post.slug.current)}
                  >
                    <div className="featured-article-image">
                      <Image
                        src={post.featureImg}
                        alt={post.altText || post.title}
                        fill
                        sizes="(max-width: 767px) 100vw, 160px"
                      />
                    </div>
                    <div className="featured-article-content">
                      <h6 className="featured-article-title">
                        {post.title}
                      </h6>
                      <span className="read-more-link">
                        Read More &rarr;
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Latest Articles RIGHT */}
          <div className="latest-articles-section">
            <h4 className="section-title section-title--centered">Latest Articles</h4>
            <div className="latest-articles-grid">
              {isLoading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : error ? (
                <div className="error-alert">Error fetching posts</div>
              ) : (
                posts.slice(3, 6).map((post, index) => (
                  <div 
                    key={index} 
                    className={`latest-article-card ${isVisible ? 'animate-in' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handlePostClick(post.slug.current)}
                  >
                    <div className="latest-article-image">
                      <Image
                        src={post.featureImg}
                        alt={post.altText || post.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      />
                    </div>
                    <div className="latest-article-content">
                      <h6 className="latest-article-title">
                        {post.title}
                      </h6>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="blogs-bottom-row">
          {/* Remaining Articles LEFT */}
          <div className="remaining-articles-section">
            <div className="remaining-articles-grid">
              {isLoading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : error ? (
                <div className="error-alert">Error fetching posts</div>
              ) : (
                posts.slice(6).map((post, index) => (
                  <div 
                    key={index} 
                    className={`remaining-article-card ${isVisible ? 'animate-in' : ''}`}
                    style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                    onClick={() => handlePostClick(post.slug.current)}
                  >
                    <div className="remaining-article-image">
                      <Image
                        src={post.featureImg}
                        alt={post.altText || post.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      />
                    </div>
                    <div className="remaining-article-content">
                      <h6 className="remaining-article-title">
                        {post.title}
                      </h6>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar RIGHT */}
          <SharedSidebarWidgets
            className="sidebar-section blogs-shared-sidebar"
            animate
            isVisible={isVisible}
          />
        </div>
      </div>

      <FooterTwo />

      <style jsx>{`
        .blogs-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          padding: 2rem 10px;
          background-color: #f6f2e8;
          min-height: 100vh;
          font-family: var(--secondary-font);
        }

        /* Section Titles */
        .section-title {
          color: #1d2430;
          font-weight: 600;
          margin-bottom: 1.5rem;
          font-size: var(--type-h2);
          font-family: var(--primary-font);
          line-height: 1.2;
        }

        .section-title--centered {
          display: block;
          width: 100%;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        }

        /* Top Row Layout */
        .blogs-top-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        /* Featured Articles Section with Animation */
        .featured-articles-grid {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border-radius: 12px;
          overflow: hidden;
        }

        .featured-article-card {
          display: flex;
          background: transparent;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          min-height: 116px;
          opacity: 0;
          transform: translateX(-50px);
          border-bottom: 1px solid rgba(126, 92, 35, 0.16);
        }

        .featured-article-card:last-child {
          border-bottom: none;
        }

        .featured-article-card.animate-in {
          animation: slideInFromLeft 0.6s ease forwards;
        }

        .featured-article-card:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: inset 0 0 0 999px rgba(255, 255, 255, 0.08);
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .featured-article-image {
          flex: 0 0 120px;
          position: relative;
        }

        .featured-article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-article-content {
          flex: 1;
          padding: 1.15rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .featured-article-title {
          font-size: var(--type-h5);
          font-family: var(--primary-font);
          font-weight: 600;
          color: #1d2430;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.45;
          margin: 0;
        }

        .read-more-link {
          color: #8b641d;
          font-size: var(--type-small);
          font-family: var(--secondary-font);
          font-weight: 500;
          margin-top: 0.5rem;
        }

        /* Latest Articles Section with Animation */
        .latest-articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          position: relative;
        }

        .latest-article-card {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 350px;
          opacity: 0;
          transform: translateY(-30px);
        }

        .latest-article-card.animate-in {
          animation: slideInFromTop 0.6s ease forwards;
        }

        .latest-article-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 28px rgba(126, 92, 35, 0.18);
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .latest-article-image {
          position: relative;
          height: 200px;
          flex-shrink: 0;
        }

        .latest-article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .latest-article-content {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(126, 92, 35, 0.16);
        }

        .latest-article-title {
          font-size: var(--type-h5);
          font-family: var(--primary-font);
          font-weight: 600;
          color: #1d2430;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.45;
          margin: 0;
        }

        /* Bottom Row Layout */
        .blogs-bottom-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        /* Remaining Articles Section with Animation */
        .remaining-articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          position: relative;
        }

        .remaining-article-card {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 300px;
          opacity: 0;
          transform: translateY(30px);
        }

        .remaining-article-card.animate-in {
          animation: slideInFromBottom 0.6s ease forwards;
        }

        .remaining-article-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 28px rgba(126, 92, 35, 0.18);
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .remaining-article-image {
          position: relative;
          height: 160px;
        }

        .remaining-article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remaining-article-content {
          padding: 1rem;
          border-top: 1px solid rgba(126, 92, 35, 0.16);
        }

        .remaining-article-title {
          font-size: var(--type-h5);
          font-family: var(--primary-font);
          font-weight: 600;
          color: #1d2430;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.45;
          margin: 0;
        }

        /* Sidebar Section with Animation */
        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-widget,
        .shared-sidebar-panel {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border: 1px solid rgba(126, 92, 35, 0.14);
          padding: 1.5rem;
          border-radius: 12px;
          opacity: 0;
          transform: translateX(30px);
        }

        .sidebar-widget.animate-in,
        .shared-sidebar-panel.animate-in {
          animation: slideInFromRight 0.6s ease forwards;
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Hard-imposed home-style sidebar theme for blogs shared widgets */
        .blogs-page :global(.blogs-shared-sidebar .shared-sidebar-panel) {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border: 1px solid rgba(126, 92, 35, 0.14);
          border-radius: 12px;
          padding: 12px;
        }

        .blogs-page :global(.blogs-shared-sidebar .shared-sidebar-panel .section-title) {
          color: #1d2430 !important;
          margin-bottom: 0.9rem;
        }

        .blogs-page :global(.blogs-shared-sidebar .category-widget h3),
        .blogs-page :global(.blogs-shared-sidebar .post-widget .nav-link) {
          color: #1d2430 !important;
        }

        .blogs-page :global(.blogs-shared-sidebar .category-widget .owl-nav button.custom-owl-prev),
        .blogs-page :global(.blogs-shared-sidebar .category-widget .owl-nav button.custom-owl-next) {
          background: #fffaf1 !important;
          border: 1px solid rgba(126, 92, 35, 0.14) !important;
        }

        .blogs-page :global(.blogs-shared-sidebar .category-widget .owl-nav button.custom-owl-prev i),
        .blogs-page :global(.blogs-shared-sidebar .category-widget .owl-nav button.custom-owl-next i) {
          color: #4d5b6c !important;
        }

        .blogs-page :global(.blogs-shared-sidebar .post-block__on-dark-bg .axil-post-title a) {
          color: #1d2430 !important;
        }

        .blogs-page :global(.blogs-shared-sidebar .post-block__on-dark-bg .axil-post-title a:hover) {
          color: #8b641d !important;
        }

        .blogs-page :global(.blogs-shared-sidebar .sidebar-post-widget p),
        .blogs-page :global(.blogs-shared-sidebar .sidebar-post-widget .mid),
        .blogs-page :global(.blogs-shared-sidebar .sidebar-post-widget .post-metas),
        .blogs-page :global(.blogs-shared-sidebar .sidebar-post-widget .post-metas ul),
        .blogs-page :global(.blogs-shared-sidebar .sidebar-post-widget .media-body p) {
          color: #5e6876 !important;
        }

        /* Loader and Error States */
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .error-alert {
          color: #8f2d2d;
          background: rgba(220, 53, 69, 0.08);
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          border: 1px solid rgba(220, 53, 69, 0.22);
          font-size: var(--type-small);
          font-family: var(--secondary-font);
        }

        /* Tablet Styles */
        @media (min-width: 768px) {
          .blogs-container {
            padding: 2rem 14px;
          }

          .section-title {
            font-size: var(--type-h2);
            line-height: 1.2;
          }

          .latest-articles-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .latest-articles-grid::before {
            content: "";
            position: absolute;
            top: 14px;
            bottom: 14px;
            left: 50%;
            width: 1px;
            background: rgba(58, 42, 18, 0.42);
            pointer-events: none;
            transform: translateX(-50%);
          }

          .remaining-articles-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .remaining-articles-grid::before {
            content: "";
            position: absolute;
            top: 14px;
            bottom: 14px;
            left: 50%;
            width: 1px;
            background: rgba(58, 42, 18, 0.42);
            pointer-events: none;
            transform: translateX(-50%);
          }
        }

        /* Desktop Styles */
        @media (min-width: 1024px) {
          .blogs-container {
            padding: 2rem 14px;
          }

          .blogs-top-row {
            grid-template-columns: 1fr 2fr;
            gap: 3rem;
          }

          .blogs-bottom-row {
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
          }

          .latest-articles-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .latest-articles-grid::before,
          .latest-articles-grid::after {
            content: "";
            position: absolute;
            top: 14px;
            bottom: 14px;
            width: 1px;
            background: rgba(58, 42, 18, 0.42);
            pointer-events: none;
          }

          .latest-articles-grid::before {
            left: calc(33.333% - 0.25rem);
            transform: translateX(-50%);
          }

          .latest-articles-grid::after {
            left: calc(66.666% + 0.25rem);
            transform: translateX(-50%);
          }

          .remaining-articles-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .remaining-articles-grid::before,
          .remaining-articles-grid::after {
            content: "";
            position: absolute;
            top: 14px;
            bottom: 14px;
            width: 1px;
            background: rgba(58, 42, 18, 0.42);
            pointer-events: none;
          }

          .remaining-articles-grid::before {
            left: calc(33.333% - 0.25rem);
            transform: translateX(-50%);
          }

          .remaining-articles-grid::after {
            left: calc(66.666% + 0.25rem);
            transform: translateX(-50%);
          }

          .featured-article-image {
            flex: 0 0 140px;
          }

          .latest-article-card {
            height: 340px;
          }

          .latest-article-image {
            height: 200px;
          }
        }

        /* Large Desktop Styles */
        @media (min-width: 1440px) {
          .blogs-container {
            padding: 2rem 18px;
          }

          .featured-article-image {
            flex: 0 0 160px;
          }

          .latest-article-card {
            height: 325px;
          }

          .latest-article-image {
            height: 220px;
          }

          .remaining-article-image {
            height: 180px;
          }
        }

        /* Mobile Optimization */
        @media (max-width: 767px) {
          .blogs-container {
            padding: 1rem 12px 1.5rem;
          }

          .section-title {
            font-size: var(--type-h4);
            line-height: 1.25;
          }

          .featured-article-card {
            flex-direction: column;
            min-height: auto;
          }

          .featured-article-image {
            flex: 0 0 auto;
            width: 100%;
            min-height: 180px;
          }

          .featured-article-content {
            padding: 0.9rem;
          }

          .featured-article-title,
          .latest-article-title,
          .remaining-article-title {
            font-size: var(--type-body);
            line-height: 1.45;
          }

          .latest-articles-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .latest-articles-grid::before,
          .latest-articles-grid::after {
            content: none;
          }

          .latest-article-card {
            height: auto;
            min-height: 0;
          }

          .latest-article-image {
            height: auto;
            aspect-ratio: 16 / 10;
          }

          .remaining-articles-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .remaining-articles-grid::before,
          .remaining-articles-grid::after {
            content: none;
          }

          .remaining-article-card {
            height: auto;
            min-height: 0;
          }

          .remaining-article-image {
            height: auto;
            aspect-ratio: 16 / 10;
          }

          .remaining-article-content {
            padding: 0.9rem;
          }

          .sidebar-widget {
            padding: 1rem;
          }
        }

        /* Small Mobile Optimization */
        @media (max-width: 480px) {
          .blogs-container {
            padding: 0.75rem 12px 1.25rem;
          }

          .featured-article-image {
            min-height: 156px;
          }

          .latest-article-card {
            height: auto;
          }

          .latest-article-image {
            aspect-ratio: 16 / 10;
          }

          .remaining-article-image {
            aspect-ratio: 16 / 10;
          }

          .section-title {
            margin-bottom: 1rem;
            font-size: var(--type-h4);
            line-height: 1.25;
          }
        }
      `}</style>
    </>
  );
};

export default Blogs;

