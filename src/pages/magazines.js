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
    } | order(_createdAt desc)
  `;

  const { data, isLoading, error } = useQuery({
    queryKey: ["allMagazines"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response.sort((a, b) => {
        const aKey = a._createdAt || a.publishedAt || 0;
        const bKey = b._createdAt || b.publishedAt || 0;
        return new Date(bKey) - new Date(aKey);
      });
    },
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div style={{ color: "gold", textAlign: "center" }}>
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

      <div className="magazines-page" style={{ width: "100%", minHeight: "100vh", background: "#070A0E", color: "#DCE2EA" }}>
        <style jsx global>{`
          .magazines-page .magazines-search {
            width: 100%;
            max-width: 640px;
            background: #0d1116;
            color: #e8edf3;
            border: 1px solid rgba(255, 255, 255, 0.14);
            outline: none;
            padding: 12px 16px;
            border-radius: 10px;
          }

          .magazines-page .magazines-search::placeholder {
            color: #8f98a3;
          }

          .magazines-page .year-chip {
            width: 30%;
            max-width: 40rem;
            min-width: 220px;
            height: 6rem;
            border-radius: 10rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(180deg, #111720 0%, #0b1018 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
          }

          .magazines-page .year-chip h2 {
            font-size: 2.2rem;
            margin: 0;
            color: #e4c46d;
            font-weight: 700;
          }

          .magazines-page .no-magazines {
            color: #b8c1cc;
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

        {/* Year Badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <div className="year-chip">
            <h2>
              {new Date().getFullYear()}
            </h2>
          </div>
        </div>

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

      <FooterTwo />
    </>
  );
};

export default Magazines; 
