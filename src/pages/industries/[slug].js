import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Loader from "../../components/common/Loader";
import HeadMeta from "../../components/elements/HeadMeta";
import { client } from "../../client";
import WidgetNewsletter from "../../components/widget/WidgetNewsletter";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import Image from "next/image";

const fetchIndustryPostsByIndustry = async (industrySlug) => {
  const query = `
    *[_type == "industryPost" && industryCategory->slug.current == $industrySlug]
    {
      title,
      slug,
      altText,
      publishedAt,
      _updatedAt,
      'featureImg': mainImage.asset->url,
      description,
      'category': {
        'title': industryCategory->title,
        'slug': industryCategory->slug.current
      }
    } | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)
  `;

  return client.fetch(query, { industrySlug });
};

const IndustryPosts = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, error } = useQuery({
    queryKey: ["industryPosts", slug],
    queryFn: () => fetchIndustryPostsByIndustry(slug),
    enabled: !!slug,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [slug]);

  const handlePostClick = (postSlug) => {
    window.location.href = `/industry-post/${postSlug}`;
  };

  const categoryTitle = data?.[0]?.category?.title || "Industry Posts";

  return (
    <>
      <HeadMeta metaTitle={categoryTitle} />
      <HeaderOne />

      <div className="industry-page-container">
        <div className="industry-top-row">
          <div className="featured-articles-section">
            <h4 className="page-section-title">Featured Articles</h4>
            <div className="featured-articles-grid">
              {isLoading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : error ? (
                <div className="error-alert">Error fetching posts</div>
              ) : !data || data.length === 0 ? (
                <div className="error-alert">No posts found.</div>
              ) : (
                data.slice(0, 3).map((post, index) => (
                  <div
                    key={post?.slug?.current || index}
                    className={`featured-article-card ${isVisible ? "animate-in" : ""}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handlePostClick(post.slug.current)}
                  >
                    <div className="featured-article-image">
                      <Image
                        src={post.featureImg}
                        alt={post.altText || post.title}
                        fill
                        sizes="(max-width: 767px) 100vw, 160px"
                        unoptimized
                      />
                    </div>
                    <div className="featured-article-content">
                      <h6 className="featured-article-title">{post.title}</h6>
                      <span className="read-more-link">Read More &rarr;</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="latest-articles-section">
            <h4 className="page-section-title">Latest Articles</h4>
            <div className="latest-articles-grid">
              {isLoading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : error ? (
                <div className="error-alert">Error fetching posts</div>
              ) : (
                data?.slice(3, 6).map((post, index) => (
                  <div
                    key={post?.slug?.current || index}
                    className={`latest-article-card ${isVisible ? "animate-in" : ""}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handlePostClick(post.slug.current)}
                  >
                    <div className="latest-article-image">
                      <Image
                        src={post.featureImg}
                        alt={post.altText || post.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>
                    <div className="latest-article-content">
                      <h6 className="latest-article-title">{post.title}</h6>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="industry-bottom-row">
          <div className="remaining-articles-section">
            <div className="remaining-articles-grid">
              {isLoading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : error ? (
                <div className="error-alert">Error fetching posts</div>
              ) : (
                data?.slice(6).map((post, index) => (
                  <div
                    key={post?.slug?.current || index}
                    className={`remaining-article-card ${isVisible ? "animate-in" : ""}`}
                    style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                    onClick={() => handlePostClick(post.slug.current)}
                  >
                    <div className="remaining-article-image">
                      <Image
                        src={post.featureImg}
                        alt={post.altText || post.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>
                    <div className="remaining-article-content">
                      <h6 className="remaining-article-title">{post.title}</h6>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="sidebar-section">
            <div className={`sidebar-widget ${isVisible ? "animate-in" : ""}`} style={{ animationDelay: "0.2s" }}>
              <h4 className="widget-title">Subscribe To Our Weekly Newsletter</h4>
              <WidgetNewsletter />
            </div>
            <div className={`sidebar-widget ${isVisible ? "animate-in" : ""}`} style={{ animationDelay: "0.3s" }}>
              <h4 className="widget-title">Social Share</h4>
              <WidgetSocialShare />
            </div>
          </div>
        </div>
      </div>

      <FooterTwo />

      <style jsx>{`
        .industry-page-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          padding: 2rem 10px;
          background-color: #070a0e;
          min-height: 100vh;
        }

        .page-section-title {
          color: #f3f5f7;
          font-weight: 600;
          margin-bottom: 1.5rem;
          font-size: 2.8rem;
          line-height: 3.8rem;
        }

        .industry-top-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .featured-articles-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .featured-article-card {
          display: flex;
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
          min-height: 100px;
          opacity: 0;
          transform: translateX(-50px);
        }

        .featured-article-card.animate-in {
          animation: slideInFromLeft 0.6s ease forwards;
        }

        .featured-article-card:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
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
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .featured-article-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #e8edf3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 2.6rem;
          margin: 0;
        }

        .read-more-link {
          color: #d7c08a;
          font-size: 1.3rem;
          font-weight: 500;
          margin-top: 0.5rem;
        }

        .latest-articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .latest-article-card {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
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
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.36);
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
        }

        .latest-article-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #e8edf3;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 2.6rem;
          margin: 0;
        }

        .industry-bottom-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        .remaining-articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .remaining-article-card {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
          height: 300px;
          opacity: 0;
          transform: translateY(30px);
        }

        .remaining-article-card.animate-in {
          animation: slideInFromBottom 0.6s ease forwards;
        }

        .remaining-article-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.36);
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
        }

        .remaining-article-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #e8edf3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 2.6rem;
          margin: 0;
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-widget {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.5rem;
          border-radius: 12px;
          opacity: 0;
          transform: translateX(30px);
        }

        .sidebar-widget.animate-in {
          animation: slideInFromRight 0.6s ease forwards;
        }

        .widget-title {
          color: #f3f5f7;
          font-size: 2rem;
          line-height: 2.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
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

        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .error-alert {
          color: #ff9b9b;
          background: rgba(220, 53, 69, 0.1);
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          border: 1px solid rgba(220, 53, 69, 0.3);
        }

        @media (min-width: 768px) {
          .industry-page-container {
            padding: 2rem 14px;
          }

          .page-section-title {
            font-size: 2.6rem;
            line-height: 3.4rem;
          }

          .latest-articles-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .remaining-articles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .industry-page-container {
            padding: 2rem 14px;
          }

          .industry-top-row {
            grid-template-columns: 1fr 2fr;
            gap: 3rem;
          }

          .industry-bottom-row {
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
          }

          .latest-articles-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .remaining-articles-grid {
            grid-template-columns: repeat(3, 1fr);
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

        @media (min-width: 1440px) {
          .industry-page-container {
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

        @media (max-width: 767px) {
          .industry-page-container {
            padding: 1rem 10px;
          }

          .page-section-title {
            font-size: 2.3rem;
            line-height: 3.1rem;
          }

          .featured-article-card {
            flex-direction: column;
            min-height: auto;
          }

          .featured-article-image {
            flex: 0 0 160px;
            width: 100%;
          }

          .featured-article-content {
            padding: 0.75rem;
          }

          .featured-article-title,
          .latest-article-title,
          .remaining-article-title {
            font-size: 1.6rem;
            line-height: 2.3rem;
          }

          .latest-articles-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .latest-article-card {
            height: 300px;
          }

          .latest-article-image {
            height: 180px;
          }

          .remaining-articles-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .sidebar-widget {
            padding: 1rem;
          }

          .widget-title {
            font-size: 2rem;
            line-height: 2.7rem;
          }
        }

        @media (max-width: 480px) {
          .industry-page-container {
            padding: 0.5rem 10px;
          }

          .featured-article-image {
            flex: 0 0 120px;
          }

          .latest-article-card {
            height: 280px;
          }

          .latest-article-image {
            height: 160px;
          }

          .remaining-article-image {
            height: 140px;
          }

          .page-section-title {
            margin-bottom: 1rem;
            font-size: 2rem;
            line-height: 2.7rem;
          }
        }
      `}</style>
    </>
  );
};

export default IndustryPosts;
