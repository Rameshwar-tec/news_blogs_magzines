import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import Loader from "../components/common/Loader";
import HeaderOne from "../components/header/HeaderOne";
import Faq from "../components/FAQ/Faq";
import FooterTwo from "../components/footer/FooterTwo";
import PostLayoutformag from "../components/post/layout/PostLayoutformag";
import HeadMeta from "../components/elements/HeadMeta";

const Magazines = () => {
  const [searchValue, setSearchValue] = useState("");

  const query = `
    *[_type == "magazine"] {
      title,
      slug,
      'featureImg': mainImage.asset->url,
      publishedAt,
      _createdAt
    } | order(publishedAt desc)
  `;

  const { data, isLoading, error } = useQuery({
    queryKey: ["allMagazinesPage"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response.sort((a, b) => {
        const aKey = a.publishedAt || a._createdAt || 0;
        const bKey = b.publishedAt || b._createdAt || 0;
        return new Date(bKey) - new Date(aKey);
      });
    },
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div style={{ color: "#8b641d", textAlign: "center", background: "#f6f2e8" }}>
        Error fetching magazines
      </div>
    );
  if (!data) return null;

  const filteredMagazines = searchValue
    ? data.filter((mag) =>
        (mag.title || "").toLowerCase().includes(searchValue.toLowerCase())
      )
    : data;

  return (
    <>
      <HeadMeta
        metaTitle="Exclusive Interviews with Entrepreneurs Featured in The Entrepreneurial Chronicles Magazine"
        metaDesc="Exclusive interviews with top entrepreneurs featured in The Entrepreneurial Chronicles Magazine."
      />

      <HeaderOne />

      <div
        className="magazines-page"
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#f6f2e8",
          color: "#1d2430",
          fontFamily: "var(--secondary-font)",
        }}
      >
        <style jsx global>{`
          .magazines-page .magazines-search {
            width: 100%;
            max-width: 640px;
            background: rgba(255, 250, 241, 0.96);
            color: #1d2430;
            border: 1px solid rgba(126, 92, 35, 0.18);
            outline: none;
            padding: 12px 16px;
            border-radius: 10px;
            box-shadow: 0 12px 28px rgba(126, 92, 35, 0.08);
          }

          .magazines-page .magazines-search::placeholder {
            color: #7a6f61;
          }

          .magazines-page .no-magazines {
            color: #5e6876;
            font-size: var(--type-body);
            text-align: center;
            width: 100%;
          }

        `}</style>
        {/* Simple local search (magazine titles only) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem 1rem 0',
        }}>
          <input
            className="magazines-search"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search magazines by name..."
            aria-label="Search magazines by name"
          />
        </div>
        {/* Hero / Text Section */}
        {/* <div
          style={{
            width: "100%",
            backgroundImage: `url('/images/mag_bg.jpg')`,
            backgroundRepeat: "repeat",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem 0",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "1200px",
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bolder",
                marginBottom: "2px",
                color: "white",
              }}
            >
              LATEST MAGAZINES
            </p>
            <p
              style={{
                fontSize: "1.7rem",
                fontWeight: "lighter",
                color: "white",
              }}
            >
              Welcome to The Entrepreneurial Chronicles Magazine, where we
              spotlight trailblazers from all sectors transforming the business
              magazine landscape. Our mission is to inspire and empower new
              leaders with groundbreaking ideas worldwide.
            </p>
          </div>
        </div> */}

        {/* Magazine Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: searchValue ? "center" : "flex-start",
            gap: "40px",
            maxWidth: "1600px",
            margin: "0 auto",
          }}
        >
          {filteredMagazines.length > 0 ? (
            filteredMagazines.map((post, index) => (
              <PostLayoutformag data={post} key={index} />
            ))
          ) : (
            <p className="no-magazines">
              No magazines found.
            </p>
          )}
        </div>
      </div>

      <Faq/>

      <div className="magazines-footer" style={{ marginTop: "-30px" }}>
        <FooterTwo />
      </div>
    </>
  );
};

export default Magazines; 
