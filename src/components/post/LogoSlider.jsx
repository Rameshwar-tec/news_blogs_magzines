// components/LogoSlider.js
import React from "react";

import Logo8FigureFirm from "../../assest/8figurefirm_logo 6.jpg";
import LogoAlloyPersonalTraining from "../../assest/alloypersonaltraining_logo 4.jpg";
import LogoCubeSoftware from "../../assest/cube_software_logo.jpeg";
import LogoExePresence from "../../assest/exepresence_logo.jpeg";
import LogoMiyazaki from "../../assest/miyazaki_logo.jpeg";
import LogoNewWorldWind from "../../assest/newworldwind_logo.jpeg";
import LogoPickupUsa from "../../assest/pickup_usa_franchise_company_logo.jpeg";
import LogoTimePlast from "../../assest/timeplast_logo 3.jpg";
import LogoShoumo from "../../assest/Shoumo.jpg";
import LogoSurbhi from "../../assest/Surbhi.jpg";
import LogoSlendy from "../../assest/Slendy.jpg";
import LogoMagnolia from "../../assest/magnolia.jpg";
import LogoDevang from "../../assest/devang.jpg";
import LogoBen from "../../assest/ben.jpg";

const LogoSlider = ({ title = "Our Partner Brands", showTitle = true, wrapperClassName = "" }) => {
  const images = [
    { src: Logo8FigureFirm, alt: "8 Figure Firm" },
    { src: LogoAlloyPersonalTraining, alt: "Alloy Personal Training" },
    { src: LogoCubeSoftware, alt: "Cube Software" },
    { src: LogoExePresence, alt: "Exe Presence" },
    { src: LogoMiyazaki, alt: "Miyazaki" },
    { src: LogoNewWorldWind, alt: "New World Wind" },
    { src: LogoPickupUsa, alt: "Pickup USA Franchise Company" },
    { src: LogoTimePlast, alt: "TimePlast" },
    { src: LogoShoumo, alt: "Shoumo" },
    { src: LogoSurbhi, alt: "Surbhi" },
    { src: LogoSlendy, alt: "Slendy" },
    { src: LogoMagnolia, alt: "Magnolia" },
    { src: LogoDevang, alt: "Devang" },
    { src: LogoBen, alt: "Ben" },
  ];

  return (
    <div className={`container my-5 logo-slider-section ${wrapperClassName}`.trim()}>
      {showTitle ? (
        <h2
          className="text-center mb-4"
          style={{
            color: "#1d2430",
            fontSize: "var(--type-h3)",
            fontFamily: "var(--primary-font)",
          }}
        >
          {title}
        </h2>
      ) : null}
      <div className="row">
        <div className="col">
          <div className="logo-slider">
            <div className="logo-slide-track">
              {[...images, ...images].map((image, index) => (
                <div key={index} className="logo-slide">
                  <div className="logo-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.src.src}
                      alt={image.alt}
                      width={image.customWidth || 80}
                      height={image.customHeight || 80}
                      style={{ objectFit: "contain", width: "auto", height: "auto" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .logo-slider {
          height: 100px;
          position: relative;
          overflow: hidden;
          padding: 10px 0;
          background: transparent;
          border: none;
          border-radius: 0;
        }
        .logo-slide-track {
          display: flex;
          animation: scroll 40s linear infinite;
          width: calc(150px * ${images.length * 2});
        }
        .logo-slide {
          height: 100px;
          width: 100px;
          margin: 0 29px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-container {
          background: rgba(255, 250, 241, 0.9);
          border: 1px solid rgba(126, 92, 35, 0.12);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          aspect-ratio: 1 / 1;
          padding: 0;
        }

        .logo-container img {
          max-width: 100%;
          max-height: 100%;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-150px * ${images.length}));
          }
        }
      `}</style>
    </div>
  );
};

export default LogoSlider;
