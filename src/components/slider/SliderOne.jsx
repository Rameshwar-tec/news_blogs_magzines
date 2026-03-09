"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const SliderOne = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["slider-magazine"],
    queryFn: async () => {
      const query = `*[_type == "magazine"] {
        title,
        slug,
        altText,
        publishedAt,
        'featureImg': mainImage.asset->url,
        description
      } | order(publishedAt desc) [0...5]`;

      const response = await client.fetch(query);

      if (response && response.length > 0) {
        const reorderedData = [...response];
        const magnoliaItem = reorderedData.find((item) => {
          const title = (item.title || "").toLowerCase();
          const slug = (item.slug?.current || "").toLowerCase();
          return (
            title.includes("magnolia") ||
            title.includes("yace") ||
            slug.includes("magnolia") ||
            slug.includes("yace")
          );
        });

        if (magnoliaItem) {
          const index = reorderedData.indexOf(magnoliaItem);
          if (index > -1) reorderedData.splice(index, 1);
          reorderedData.unshift(magnoliaItem);
        }

        return reorderedData;
      }

      return response;
    },
  });

  const slideSettingsContent = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    speed: 500,
    adaptiveHeight: false,
  };

  const slideSettingsImage = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    speed: 500,
  };

  const [navContent, setNavContent] = useState();
  const [navImage, setNavImage] = useState();

  return (
    <section className="featured-magazine-block section-gap-bottom">
      <div className="featured-magazine-bg" />
      <div className="container featured-magazine-shell">
        <div className="featured-magazine-row">
          <div className="featured-magazine-left">
            {isLoading ? <Loader /> : null}
            {error ? (
              <div className="featured-magazine-state">
                Unable to load featured magazines right now.
              </div>
            ) : null}

            {data && data.length > 0 && !isLoading ? (
              <Slider
                asNavFor={navImage}
                ref={(sliderRef) => setNavContent(sliderRef)}
                {...slideSettingsContent}
                className="featured-magazine-content-slider"
              >
                {data.slice(0, 3).map((item, index) => (
                  <article className="featured-magazine-copy" key={item.slug?.current || index}>
                    <span className="featured-magazine-badge">Featured Magazine</span>
                    <h2 className="featured-magazine-title">
                      <Link href={`/magazine/${item.slug?.current || item.slug}`}>{item.title}</Link>
                    </h2>
                    <p className="featured-magazine-desc">
                      {item.description || "Explore this featured issue from The Entrepreneurial Chronicles."}
                    </p>
                    <div className="featured-magazine-actions">
                      <Link className="btn btn-primary" href={`/magazine/${item.slug?.current || item.slug}`}>
                        View Magazine
                      </Link>
                      <Link className="btn featured-magazine-btn-outline" href="/magazines">
                        View All Magazines
                      </Link>
                    </div>
                    <div className="featured-magazine-controls">
                      <button
                        type="button"
                        className="featured-magazine-arrow featured-magazine-arrow--prev"
                        onClick={() => navContent?.slickPrev()}
                        aria-label="Previous magazine"
                      >
                        <i className="feather icon-chevron-left" />
                      </button>
                      <button
                        type="button"
                        className="featured-magazine-arrow featured-magazine-arrow--next"
                        onClick={() => navContent?.slickNext()}
                        aria-label="Next magazine"
                      >
                        <i className="feather icon-chevron-right" />
                      </button>
                    </div>
                  </article>
                ))}
              </Slider>
            ) : null}
          </div>

          <div className="featured-magazine-right">
            <div className="featured-magazine-visual-wrap">
              {isLoading ? (
                <div className="featured-magazine-image-skeleton" />
              ) : (
                <Slider
                  asNavFor={navContent}
                  ref={(sliderRef) => setNavImage(sliderRef)}
                  {...slideSettingsImage}
                  className="featured-magazine-image-slider"
                >
                  {data?.slice(0, 3).map((item, index) => (
                    <div className="featured-magazine-image-item" key={item.slug?.current || index}>
                      <Link href={`/magazine/${item.slug?.current || item.slug}`}>
                        <Image
                          src={item.featureImg}
                          alt={item?.altText || item.title}
                          width={2200}
                          height={2800}
                          className="featured-magazine-cover"
                        />
                      </Link>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .featured-magazine-block {
          position: relative;
          overflow: hidden;
          background: #f6f2e8;
          margin-top: 0;
          border: none;
        }

        .featured-magazine-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255, 250, 241, 0.62) 0%, rgba(245, 237, 223, 0.68) 100%),
            url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/96dfd877-6c12-43bd-b00d-92cb788dd96e/diaskos-382c7ac0-5d3c-45b9-87ae-ef8c6d165cea.jpg/v1/fill/w_1920,h_1077,q_75,strp/vintage_paper_texture_background_by_eneakelo_diaskos-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi85NmRmZDg3Ny02YzEyLTQzYmQtYjAwZC05MmNiNzg4ZGQ5NmUvZGlhc2tvcy0zODJjN2FjMC01ZDNjLTQ1YjktODdhZS1lZjhjNmQxNjVjZWEuanBnIiwiaGVpZ2h0IjoiPD0xMDc3Iiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiL3dtLzk2ZGZkODc3LTZjMTItNDNiZC1iMDBkLTkyY2I3ODhkZDk2ZS9lbmVha2Vsby00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.86ZwI8lvpKXf5wfRjVWUjpTR0KkRDxD9KjFHjwMjwC8");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          z-index: 0;
        }

        .featured-magazine-shell {
          position: relative;
          z-index: 1;
          max-width: 1180px !important;
          width: 100% !important;
          padding-left: 48px !important;
          padding-right: 48px !important;
        }

        .featured-magazine-row {
          min-height: 62vh;
          display: grid;
          grid-template-columns: minmax(0, 620px) minmax(360px, 430px);
          justify-content: center;
          gap: 26px;
          padding-top: 2rem;
          padding-bottom: 2rem;
          align-items: center;
        }

        .featured-magazine-left {
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          min-height: 100%;
          padding-left: 0;
          padding-right: 0;
        }

        .featured-magazine-left > * {
          width: 100%;
        }

        .featured-magazine-right {
          min-width: 0;
          display: flex;
          justify-content: flex-end;
          margin-left: 0;
        }

        .featured-magazine-copy {
          width: min(100%, 620px);
          max-width: 620px;
          padding: 2rem 2rem 1.9rem;
          margin-left: 0;
          margin-right: 0;
          background: linear-gradient(180deg, rgba(255, 251, 244, 0.84) 0%, rgba(247, 239, 226, 0.78) 100%);
          border: 1px solid rgba(126, 92, 35, 0.12);
          border-radius: 20px;
          box-shadow: 0 18px 42px rgba(126, 92, 35, 0.12);
          backdrop-filter: blur(3px);
        }

        .featured-magazine-content-slider,
        .featured-magazine-content-slider .slick-list,
        .featured-magazine-content-slider .slick-track,
        .featured-magazine-content-slider .slick-slide,
        .featured-magazine-content-slider .slick-slide > div {
          width: 100%;
        }

        .featured-magazine-content-slider,
        .featured-magazine-content-slider .slick-list,
        .featured-magazine-content-slider .slick-track,
        .featured-magazine-content-slider .slick-slide,
        .featured-magazine-content-slider .slick-slide > div {
          height: 100%;
        }

        .featured-magazine-content-slider .slick-track {
          display: flex;
          align-items: center;
        }

        .featured-magazine-content-slider .slick-slide {
          height: auto;
          display: flex !important;
          align-items: center;
        }

        .featured-magazine-content-slider .slick-slide > div {
          height: 100%;
          display: flex;
          align-items: center;
        }

        .featured-magazine-badge {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(45deg, #ae8625, #f4d03f);
          color: #3f2c0d;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .featured-magazine-title {
          margin: 0 0 1rem;
          max-width: 24ch;
          font-size: clamp(2.15rem, 2.75vw, 3.5rem);
          line-height: 1.08;
          font-weight: 700;
          letter-spacing: -0.04em;
          white-space: normal;
        }

        .featured-magazine-title a {
          color: #1d2430 !important;
          text-decoration: none;
        }

        .featured-magazine-title a:hover {
          color: #8b641d !important;
        }

        .featured-magazine-desc {
          margin: 0;
          max-width: 76ch;
          color: #5e6876;
          font-size: 1.2rem;
          line-height: 1.95rem;
        }

        .featured-magazine-actions {
          margin-top: 1.35rem;
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .featured-magazine-actions .btn {
          min-width: 210px;
          min-height: 56px;
          justify-content: center;
          font-size: 1.08rem;
        }

        .featured-magazine-btn-outline {
          border: 1px solid rgba(212, 175, 55, 0.65);
          color: #8b641d;
          background: rgba(255, 250, 241, 0.8);
        }

        .featured-magazine-btn-outline:hover {
          background: #d4af37;
          color: #111315;
          border-color: #d4af37;
        }

        .featured-magazine-controls {
          margin-top: 1.1rem;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .featured-magazine-arrow {
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: 1px solid rgba(126, 92, 35, 0.18);
          background: #fffaf1;
          color: #4d5b6c;
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 22px rgba(126, 92, 35, 0.12);
          transition: background 0.2s ease, color 0.2s ease,
            border-color 0.2s ease, transform 0.2s ease;
        }

        .featured-magazine-arrow:hover {
          background: #d4af37;
          border-color: #d4af37;
          color: #111315;
          transform: translateY(-1px);
        }

        .featured-magazine-arrow.slick-disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .featured-magazine-visual-wrap {
          display: flex;
          justify-content: flex-start;
          width: min(430px, 100%);
        }

        .featured-magazine-image-slider {
          width: 100%;
        }

        .featured-magazine-image-skeleton {
          width: 100%;
          aspect-ratio: 11 / 14;
          border-radius: 10px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          background: linear-gradient(
            90deg,
            rgba(126, 92, 35, 0.06) 0%,
            rgba(212, 175, 55, 0.14) 50%,
            rgba(126, 92, 35, 0.06) 100%
          );
          background-size: 200% 100%;
          animation: featuredPulse 1.4s ease-in-out infinite;
        }

        @keyframes featuredPulse {
          from {
            background-position: 200% 0;
          }
          to {
            background-position: -200% 0;
          }
        }

        .featured-magazine-state {
          color: #8f2d2d;
          background: rgba(220, 53, 69, 0.08);
          border: 1px solid rgba(220, 53, 69, 0.22);
          border-radius: 10px;
          padding: 0.8rem 1rem;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .featured-magazine-image-item {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(126, 92, 35, 0.18);
        }

        .featured-magazine-cover {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        @media (min-width: 768px) {
          .featured-magazine-shell {
            padding-left: 68px !important;
            padding-right: 68px !important;
          }

          .featured-magazine-left {
            padding-left: 0;
          }
        }

        @media (min-width: 1200px) {
          .featured-magazine-shell {
            padding-left: 88px !important;
            padding-right: 88px !important;
          }

          .featured-magazine-left {
            padding-left: 0;
          }
        }

        @media (max-width: 991px) {
          .featured-magazine-row {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 2.25rem;
          }

          .featured-magazine-copy {
            max-width: 100%;
            text-align: center;
            padding: 1.5rem;
          }

          .featured-magazine-left,
          .featured-magazine-right {
            justify-content: center;
          }

          .featured-magazine-left {
            padding-left: 0;
            padding-right: 0;
          }

          .featured-magazine-right,
          .featured-magazine-copy {
            margin-left: 0;
            margin-right: 0;
          }

          .featured-magazine-controls {
            justify-content: center;
          }

          .featured-magazine-desc {
            max-width: 100%;
          }

          .featured-magazine-actions {
            justify-content: center;
          }

          .featured-magazine-title {
            max-width: 100%;
            font-size: clamp(2.3rem, 7vw, 3.4rem);
          }

          .featured-magazine-visual-wrap {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default SliderOne;
