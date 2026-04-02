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
    router.push(`/industry-post/${postSlug}`);
  };

  const categoryTitle = data?.[0]?.category?.title || "Industry Posts";

  return (
    <>
      <HeadMeta metaTitle={categoryTitle} />
      <HeaderOne />

      <div className="industry-page-container">
        <div className="industry-top-row">
          <div className="featured-articles-section">
            <h4 className="page-section-title page-section-title--centered">Featured Articles</h4>
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
            <h4 className="page-section-title page-section-title--centered">Latest Articles</h4>
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
            <div className={`${isVisible ? "animate-in" : ""}`} style={{ animationDelay: "0.2s" }}>
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
          background-color: #f6f2e8;
          min-height: 100vh;
          font-family: var(--secondary-font);
        }

        .page-section-title {
          color: #1d2430;
          font-weight: 700;
          margin-bottom: 1.5rem;
          font-size: var(--type-h2);
          line-height: 1.2;
          font-family: var(--primary-font);
        }

        .page-section-title--centered {
          text-align: center;
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
          font-weight: 700;
          color: #1d2430;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.35;
          font-family: var(--primary-font);
          margin: 0;
        }

        .read-more-link {
          color: #8b641d;
          font-size: var(--type-small);
          font-weight: 500;
          margin-top: 0.5rem;
          font-family: var(--secondary-font);
        }

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
          font-weight: 700;
          color: #1d2430;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.35;
          font-family: var(--primary-font);
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
          font-weight: 700;
          color: #1d2430;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.35;
          font-family: var(--primary-font);
          margin: 0;
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-widget {
          background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
          border: 1px solid rgba(126, 92, 35, 0.14);
          padding: 1.5rem;
          border-radius: 12px;
          opacity: 0;
          transform: translateX(30px);
        }

        .sidebar-widget.animate-in {
          animation: slideInFromRight 0.6s ease forwards;
        }

        .widget-title {
          color: #1d2430;
          font-size: var(--type-h5);
          line-height: 1.35;
          font-weight: 700;
          margin-bottom: 1rem;
          font-family: var(--primary-font);
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
          color: #8f2d2d;
          background: rgba(220, 53, 69, 0.08);
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          border: 1px solid rgba(220, 53, 69, 0.22);
          font-size: var(--type-small);
          font-family: var(--secondary-font);
        }

        @media (min-width: 768px) {
          .industry-page-container {
            padding: 2rem 14px;
          }

          .page-section-title {
            font-size: var(--type-h2);
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
            padding: 1rem 12px 1.5rem;
          }

          .page-section-title {
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

          .sidebar-section {
            gap: 1.25rem;
          }

          .sidebar-widget {
            padding: 1rem;
          }

          .widget-title {
            font-size: var(--type-h5);
          }
        }

        @media (max-width: 480px) {
          .industry-page-container {
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

          .page-section-title {
            margin-bottom: 1rem;
            font-size: var(--type-h4);
            line-height: 1.25;
          }

          .featured-article-content,
          .latest-article-content,
          .remaining-article-content {
            padding: 0.85rem;
          }

          .widget-title {
            font-size: var(--type-body-lg);
          }
        }
      `}</style>
    </>
  );
};

export default IndustryPosts;
