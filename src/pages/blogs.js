import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/common/Loader";
import { client } from "../client";
import WidgetNewsletter from "../components/widget/WidgetNewsletter";
import WidgetSocialShare from "../components/widget/WidgetSocialShare";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetCategory from "../components/widget/WidgetCategory";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import HeadMeta from "../components/elements/HeadMeta";
import { useRouter } from "next/router";

const Blogs = () => {
  const query = `
    *[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "blogs-and-articles"][0]._id]
    {
      title,
      slug,
      altText,
      publishedAt,
      'featureImg': mainImage.asset->url,
      description,
      'category': {
        'title': categories[0]->title,
        'slug': categories[0]->slug.current
      }
    } | order(publishedAt desc)
  `;

  const { data, isLoading, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <HeadMeta
        metaTitle="Best Business Blog for the Latest News, Proven Strategies, and Insightful Analysis | The Entrepreneurial Chronicles"
        metaDesc="Stay ahead of the curve with our top-ranked business blog. Get access to the latest industry news, proven strategies from experts, and insightful analysis to help your business thrive."
      />

      <HeaderOne />

      <div
        style={{
          width: "100%",
          padding: "2rem 20px",
          backgroundColor: "#000000",
          minHeight: "100vh",
        }}
      >
        {/* TOP ROW */}
        <div className="row g-4">
          {/* Featured Articles LEFT — increased width */}
          <div className="col-lg-5">
            <h4 style={{ color: "#fff", fontWeight: "600" }}>Featured Articles</h4>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className="alert alert-danger">Error fetching posts</div>
            ) : (
              data?.slice(0, 3).map((post, index) => (
                <div key={index} className="mb-3">
                  <div
                    className="card shadow-sm"
                    style={{
                      border: "none",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      height: "120px",
                      backgroundColor: "#1a1a1a",
                      width: "100%",
                    }}
                    onClick={() =>
                      (window.location.href = `/post/${post.slug.current}`)
                    }
                  >
                    <div className="row g-0 h-100">
                      <div className="col-4">
                        <img
                          src={post.featureImg}
                          alt={post.altText || post.title}
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="col-8">
                        <div className="card-body p-2 h-100 d-flex flex-column justify-content-between">
                          <h6
                            style={{
                              fontSize: "2rem",
                              fontWeight: "600",
                              color: "#fff",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {post.title}
                          </h6>
                          <span style={{ color: "#007bff", fontSize: "0.7rem" }}>
                            Read More →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Latest Articles RIGHT — decreased width to 7 */}
          <div className="col-lg-7">
    <h4 style={{ color: "#fff", fontWeight: "600" }}>Latest Articles</h4>
    <div className="row g-3">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger">Error fetching posts</div>
      ) : (
        data?.slice(3, 6).map((post, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <div
              className="card shadow-sm"
              style={{
                border: "none",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#1a1a1a",
                cursor: "pointer",
                transform: "scale(0.95)",
              }}
              onClick={() =>
                (window.location.href = `/post/${post.slug.current}`)
              }
            >
              <img
                src={post.featureImg}
                alt={post.altText || post.title}
                className="card-img-top"
                style={{
                  height: "130px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body p-2">
                <h6
                  style={{
                    fontSize: "2rem",
                    fontWeight: "600",
                    color: "#fff",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </h6>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</div>



        {/* SECOND ROW */}
        <div className="row g-4 mt-4">
          {/* Remaining Latest LEFT */}
          <div className="col-lg-8">
  <div className="row g-3">
    {isLoading ? (
      <Loader />
    ) : error ? (
      <div className="alert alert-danger">Error fetching posts</div>
    ) : (
      data?.slice(6).map((post, index) => (
        <div key={index} className="col-lg-4 col-md-6">
          <div
            className="card shadow-sm"
            style={{
              border: "none",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#1a1a1a",
              cursor: "pointer",
              transform: "scale(0.95)",
            }}
            onClick={() =>
              (window.location.href = `/post/${post.slug.current}`)
            }
          >
            <img
              src={post.featureImg}
              alt={post.altText || post.title}
              className="card-img-top"
              style={{
                height: "130px",
                objectFit: "cover",
              }}
            />
            <div className="card-body p-2">
              <h6
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "600",
                  color: "#fff",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.title}
              </h6>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>

          {/* Sidebar RIGHT */}
          <div className="col-lg-4">
            <div className="newsletter-section mb-4">
              <h4 style={{ color: "#fff", fontWeight: "600" }}>
                Subscribe To Our Weekly Newsletter
              </h4>
              <WidgetNewsletter />
            </div>
            <div className="categories-section mb-4">
              <h4 style={{ color: "#fff", fontWeight: "600" }}>Categories</h4>
              <WidgetCategory />
            </div>
            <div className="social-share-section mb-4">
              <h4 style={{ color: "#fff", fontWeight: "600" }}>Social Share</h4>
              <WidgetSocialShare />
            </div>
            <div className="web-profile-section mb-4">
              <h4 style={{ color: "#fff", fontWeight: "600" }}>Web Profile</h4>
              <WidgetPost />
            </div>
          </div>
        </div>
      </div>

      <FooterTwo />
    </>
  );
};

export default Blogs;