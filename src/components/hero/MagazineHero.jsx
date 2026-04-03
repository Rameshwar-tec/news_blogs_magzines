import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const MagazineHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Fetch real magazine data from Sanity
  const { data: magazineData, isLoading, error } = useQuery({
    queryKey: ["magazine-hero"],
    queryFn: async () => {
      const query = `*[_type == "magazine"] | order(publishedAt desc) [0...9] {
        title,
        slug,
        'featureImg': mainImage.asset->url,
        description,
        publishedAt
      }`;
      return await client.fetch(query);
    },
  });

  // Fallback static data if Sanity data is not available
  const fallbackData = [
    {
      id: 1,
      title: "Anchel Gupta",
      slug: { current: "anchel-gupta" },
      featureImg: "/images/magzine1_anchel.webp",
      description: "Featured Entrepreneur"
    },
    {
      id: 2,
      title: "Jorden",
      slug: { current: "jorden" },
      featureImg: "/images/magzine2_jorden.webp",
      description: "Business Leader"
    },
    {
      id: 3,
      title: "Manuel",
      slug: { current: "manuel" },
      featureImg: "/images/magzine3_manuel.webp",
      description: "Innovation Expert"
    },
    {
      id: 4,
      title: "Suzanne",
      slug: { current: "suzanne" },
      featureImg: "/images/magzine4_suzanne.webp",
      description: "Tech Pioneer"
    },
    {
      id: 5,
      title: "Nilmini",
      slug: { current: "nilmini" },
      featureImg: "/images/magzine5_nilmini.webp",
      description: "Startup Founder"
    },
    {
      id: 6,
      title: "Shabnam",
      slug: { current: "shabnam" },
      featureImg: "/images/magzine6_shabnam.webp",
      description: "Industry Leader"
    },
    {
      id: 7,
      title: "Valenia",
      slug: { current: "valenia" },
      featureImg: "/images/magzine7_valenia.webp",
      description: "Visionary CEO"
    },
    {
      id: 8,
      title: "Ross",
      slug: { current: "ross" },
      featureImg: "/images/magzine8_ross.webp",
      description: "Business Strategist"
    },
    {
      id: 9,
      title: "Khalid",
      slug: { current: "khalid" },
      featureImg: "/images/magzine9_khalid.webp",
      description: "Market Innovator"
    }
  ];

  // Use Sanity data if available, otherwise use fallback
  const displayData = magazineData && magazineData.length > 0 ? magazineData : fallbackData;

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    if (!displayData || displayData.length === 0) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % displayData.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [displayData]);


  if (isLoading) return <Loader />;
  if (error) return <div style={{ color: "#1d2430" }}>Error loading magazines</div>;

  return (
    <>
      <section className="mag-hero-section">
        <div className="mag-hero-bg" />
        <div className="mag-hero-vignette mag-hero-vignette--left" />
        <div className="mag-hero-vignette mag-hero-vignette--right" />
        <div className="mag-hero-core-glow" />

        {/* Custom Carousel */}
        <div className="carousel-container">
          <div className="carousel-track">
            {displayData.map((magazine, index) => {
              const isCenter = index === currentIndex;
              const relativePosition = index - currentIndex;
              
              // Calculate position for 9-card layout: 4 left + 1 center + 4 right
              let position = relativePosition;
              if (position > 4) position = position - displayData.length; // Wrap around for circular effect
              if (position < -4) position = position + displayData.length;
              
              // Only show cards within the 9-card range
              if (Math.abs(position) > 4) return null;
              
              // Use progressive offsets so edge cards don't drift too far from neighbors
              const offsetMap = [0, 185, 345, 485, 605];
              const offset = (position < 0 ? -1 : 1) * offsetMap[Math.abs(position)];
              const scale = isCenter ? 1.0 : Math.max(0.2, 1.0 - Math.abs(position) * 0.2); // Progressive scaling: 100%, 80%, 60%, 40%, 20%
              const overlayOpacity = [0, 0.14, 0.28, 0.42, 0.56][Math.abs(position)];
              
              return (
                <div
                  key={`${magazine.slug?.current || magazine.slug}-${index}`}
                  className={`carousel-item ${isCenter ? 'center' : 'side'}`}
                  style={{
                    left: `calc(50% + ${offset}px)`,
                    transform: `translateX(-50%) translateY(-50%) scale(${scale})`,
                    opacity: 1,
                    zIndex: isCenter ? 10 : Math.max(1, 10 - Math.abs(position)),
                  }}
                >
                  <div className="magazine-card">
                    <Link href={`/magazine/${magazine.slug?.current || magazine.slug}`} className="magazine-link">
                      <div className="image-container">
                        <Image
                          src={magazine.featureImg || magazine.image}
                          alt={magazine.title}
                          width={1000}
                          height={1000}
                          className="img-fluid"
                        />
                        <span
                          className="magazine-darkness"
                          style={{ opacity: overlayOpacity }}
                          aria-hidden="true"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .mag-hero-section {
          width: 100%;
          min-height: 102vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background: #f6f2e8;
          padding: 5.5rem 3.5rem 3rem;
        }

        .mag-hero-bg {
          position: absolute;
          inset: 0;
          background: #f6f2e8;
          z-index: 0;
        }

        .mag-hero-vignette {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 18%;
          z-index: 2;
          pointer-events: none;
        }

        .mag-hero-vignette--left {
          left: 0;
          background: linear-gradient(90deg, rgba(246, 242, 232, 0.98) 0%, rgba(246, 242, 232, 0) 100%);
        }

        .mag-hero-vignette--right {
          right: 0;
          background: linear-gradient(270deg, rgba(246, 242, 232, 0.98) 0%, rgba(246, 242, 232, 0) 100%);
        }

        .mag-hero-core-glow {
          position: absolute;
          left: 50%;
          top: 58%;
          transform: translate(-50%, -50%);
          width: min(74vw, 1000px);
          height: min(50vw, 460px);
          border-radius: 999px;
          background: radial-gradient(closest-side, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0) 100%);
          filter: blur(12px);
          z-index: 1;
          pointer-events: none;
        }

        .carousel-container {
          position: relative;
          width: min(calc(100% - 9rem), 1240px);
          height: 100%;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
        }

        .carousel-track {
          position: relative;
          width: 100%;
          max-width: 1240px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-item {
          position: absolute;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          transform-origin: center center;
          top: 50%;
          bottom: 50%;
          transform: translateY(-50%);
        }

        .carousel-item.center {
          z-index: 10;
        }

        .carousel-item.side {
          z-index: 1;
        }

        .magazine-card {
          border-radius: 0.5rem;
          overflow: hidden;
          background: transparent;
          box-shadow: none;
          width: 350px;
          aspect-ratio: 350 / 460;
          margin: 0;
          padding: 0;
          transition: all 0.3s ease;
        }

        .magazine-link {
          display: block;
          width: 100%;
          height: 100%;
          background: transparent !important;
        }

        .magazine-card:hover {
          transform: scale(1.05);
        }
        
        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease-in-out;
        }

        .image-container:hover {
          transform: scale(1.05);
        }

        .magazine-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.5rem;
          border: none;
          outline: none;
          background: transparent !important;
        }

        .magazine-darkness {
          position: absolute;
          inset: 0;
          border-radius: 0.5rem;
          background: rgba(0, 0, 0, 1);
          pointer-events: none;
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .magazine-card * {
          border: none !important;
          outline: none !important;
        }

        @media (max-width: 1199px) {
          .mag-hero-section {
            min-height: 94vh;
            padding: 4.75rem 2.5rem 2.5rem;
          }

          .carousel-container {
            width: min(calc(100% - 6rem), 1100px);
          }
        }

        @media (max-width: 991px) {
          .mag-hero-section {
            min-height: 86vh;
            padding: 4rem 1.5rem 2rem;
          }

          .carousel-container {
            width: min(calc(100% - 3rem), 960px);
          }

          .magazine-card {
            width: 295px;
            aspect-ratio: 295 / 395;
          }
        }

        @media (max-width: 767px) {
          .mag-hero-section {
            min-height: 78vh;
            padding: 3.25rem 1rem 1.5rem;
          }

          .carousel-container {
            width: calc(100% - 2rem);
          }

          .mag-hero-vignette {
            width: 24%;
          }

          .magazine-card {
            width: 250px;
            aspect-ratio: 250 / 340;
          }
        }
      `}</style>
    </>
  );
};

export default MagazineHero;
