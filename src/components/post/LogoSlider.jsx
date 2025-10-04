// components/LogoSlider.js
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "../../client";

const LogoSlider = () => {
  const [images, setImages] = useState([]);

  // Sample brand data for demonstration - using existing images (only 4 brands)
  const sampleBrands = [
    { imageUrl: "/images/logo.svg", name: "Brand 1" },
    { imageUrl: "/images/logo-black.svg", name: "Brand 2" },
    { imageUrl: "/images/logo-symbol.svg", name: "Brand 3" },
    { imageUrl: "/images/white-logo.svg", name: "Brand 4" }
  ];

  useEffect(() => {
    // Always use sample data first to prevent any Sanity connection issues
    setImages(sampleBrands);
    
    // Try to fetch from Sanity in the background
    const query = '*[_type == "brand"] { "imageUrl": image.asset->url }';
    client.fetch(query).then((data) => {
      if (data && data.length > 0) {
        setImages(data);
      }
    }).catch((error) => {
      console.log("No brands found in Sanity, using sample data");
    });
  }, []);

  console.log("LogoSlider rendering with images:", images);

  return (
    <div className="partner-brands-section">
      <div className="container">
        <div className="partner-brands-content">
          <h2 className="partner-brands-title">Our Partner Brands</h2>
          <div className="logo-grid">
            {images.length > 0 ? (
              images.slice(0, 4).map((image, index) => (
                <div key={index} className="logo-item">
                  <div className="logo-placeholder">
                    <Image
                      src={image.imageUrl}
                      alt={`Brand logo ${index + 1}`}
                      width={150}
                      height={80}
                      quality={100}
                      objectFit="contain"
                      onError={(e) => {
                        console.log("Image failed to load:", image.imageUrl);
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="logo-fallback" style={{ display: 'none' }}>
                      {image.name || `Brand ${index + 1}`}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
                Loading brand logos...
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .partner-brands-section {
          background: #000;
          padding: 60px 0;
          position: relative;
        }

        .partner-brands-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }

        .partner-brands-content {
          text-align: center;
        }

        .partner-brands-title {
          color: #D4AF37;
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .logo-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 0;
          justify-items: center;
          overflow: hidden;
        }

        .logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Hide any logos beyond the first 4 */
        .logo-item:nth-child(n+5) {
          display: none !important;
        }

        .logo-placeholder {
          background: #fff;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80px;
          min-width: 150px;
        }

        .logo-placeholder img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .logo-fallback {
          color: #333;
          font-weight: 600;
          font-size: 14px;
          text-align: center;
        }

        .logo-item:hover .logo-placeholder {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        /* Tablet Responsive Design */
        @media (max-width: 1024px) {
          .partner-brands-section {
            padding: 50px 0;
          }
          
          .partner-brands-title {
            font-size: 3rem;
            margin-bottom: 2.5rem;
          }
          
          .logo-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            max-width: 900px;
          }
          
          .logo-placeholder {
            padding: 14px 18px;
            min-height: 70px;
            min-width: 140px;
          }
        }

        /* Mobile Responsive Design */
        @media (max-width: 768px) {
          .partner-brands-section {
            padding: 40px 0;
          }
          
          .partner-brands-title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }
          
          .logo-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            max-width: 100%;
            padding: 5px;
          }
          
          .logo-placeholder {
            padding: 4px 6px;
            border-radius: 3px;
            min-height: 30px;
            min-width: 45px;
          }
        }

        /* Small Mobile Responsive Design */
        @media (max-width: 480px) {
          .partner-brands-section {
            padding: 30px 0;
          }
          
          .partner-brands-title {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }
          
          .logo-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            max-width: 100%;
            padding: 3px;
          }
          
          .logo-placeholder {
            padding: 3px 5px;
            border-radius: 2px;
            min-height: 25px;
            min-width: 35px;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 360px) {
          .partner-brands-title {
            font-size: 1.8rem;
          }
          
          .logo-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            max-width: 100%;
            padding: 2px;
          }
          
          .logo-placeholder {
            padding: 2px 4px;
            border-radius: 2px;
            min-height: 20px;
            min-width: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default LogoSlider;
