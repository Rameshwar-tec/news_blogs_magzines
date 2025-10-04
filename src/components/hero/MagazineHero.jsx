import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const MagazineHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Static magazine data with your specific images from src/assest folder
  const magazineData = [
    {
      id: 1,
      title: "Anchel Gupta",
      slug: "anchel-gupta",
      image: "/images/magzine1_anchel.webp", // Center card
      description: "Featured Entrepreneur"
    },
    {
      id: 2,
      title: "Jorden",
      slug: "jorden",
      image: "/images/magzine2_jorden.webp", // Right side
      description: "Business Leader"
    },
    {
      id: 3,
      title: "Manuel",
      slug: "manuel",
      image: "/images/magzine3_manuel.webp", // Third position
      description: "Innovation Expert"
    },
    {
      id: 4,
      title: "Suzanne",
      slug: "suzanne",
      image: "/images/magzine4_suzanne.webp",
      description: "Tech Pioneer"
    },
    {
      id: 5,
      title: "Nilmini",
      slug: "nilmini",
      image: "/images/magzine5_nilmini.webp",
      description: "Startup Founder"
    },
    {
      id: 6,
      title: "Shabnam",
      slug: "shabnam",
      image: "/images/magzine6_shabnam.webp",
      description: "Industry Leader"
    },
    {
      id: 7,
      title: "Valenia",
      slug: "valenia",
      image: "/images/magzine7_valenia.webp",
      description: "Visionary CEO"
    },
    {
      id: 8,
      title: "Ross",
      slug: "ross",
      image: "/images/magzine8_ross.webp",
      description: "Business Strategist"
    },
    {
      id: 9,
      title: "Khalid",
      slug: "khalid",
      image: "/images/magzine9_khalid.webp", // Left side near center
      description: "Market Innovator"
    }
  ];

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    if (!magazineData || magazineData.length === 0) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % magazineData.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [magazineData]);


  return (
    <>
      <div style={{ width: "100%", height: "80vh", background: "linear-gradient(180deg, #000, #111 50%, #000)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Custom Carousel */}
        <div className="carousel-container">
          <div className="carousel-track">
            {magazineData.map((magazine, index) => {
              const isCenter = index === currentIndex;
              const relativePosition = index - currentIndex;
              
              // Calculate position for 9-card layout: 4 left + 1 center + 4 right
              let position = relativePosition;
              if (position > 4) position = position - magazineData.length; // Wrap around for circular effect
              if (position < -4) position = position + magazineData.length;
              
              // Only show cards within the 9-card range
              if (Math.abs(position) > 4) return null;
              
              // Create horizontal row with progressive scaling - no rotation, cards stay upright
              const offset = position * 150; // Horizontal spacing between cards
              const scale = isCenter ? 1.0 : Math.max(0.2, 1.0 - Math.abs(position) * 0.2); // Progressive scaling: 100%, 80%, 60%, 40%, 20%
              const opacity = isCenter ? 1.0 : Math.max(0.2, 1.0 - Math.abs(position) * 0.2); // Progressive opacity: 100%, 80%, 60%, 40%, 20%
              
              return (
                <div
                  key={`${magazine.slug}-${index}`}
                  className={`carousel-item ${isCenter ? 'center' : 'side'}`}
                  style={{
                    left: `calc(50% + ${offset}px)`,
                    transform: `translateX(-50%) translateY(-50%) scale(${scale})`,
                    opacity: opacity,
                    zIndex: isCenter ? 10 : Math.max(1, 10 - Math.abs(position)),
                  }}
                >
                  <div className="magazine-card">
                    <Link href={`/magazine/${magazine.slug}`}>
                      <div className="image-container">
                        <Image
                          src={magazine.image}
                          alt={magazine.title}
                          width={1000}
                          height={1000}
                          className="img-fluid"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-track {
          position: relative;
          width: 100%;
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
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          width: 280px;
          height: 380px;
          margin: 0;
          padding: 0;
          border: none;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .magazine-card:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        }
        
        .image-container {
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
        }
        
        .magazine-card * {
          border: none !important;
          outline: none !important;
        }
      `}</style>
    </>
  );
};

export default MagazineHero;
