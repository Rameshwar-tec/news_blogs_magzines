import React from "react";

const MediaKit = () => {
  // Media kit images from images folder
  const mediaKitImages = [
    {
      id: 1,
      title: "Media Kit Page 1",
      image: "/images/mediakitpage1.webp",
      description: "Media kit presentation slide 1"
    },
    {
      id: 2,
      title: "Media Kit Page 2",
      image: "/images/mediakitpage2.webp",
      description: "Media kit presentation slide 2"
    },
    {
      id: 3,
      title: "Media Kit Page 3",
      image: "/images/mediakitpage3.webp",
      description: "Media kit presentation slide 3"
    },
    {
      id: 4,
      title: "Media Kit Page 4",
      image: "/images/mediakitpage4.webp",
      description: "Media kit presentation slide 4"
    },
    {
      id: 5,
      title: "Media Kit Page 5",
      image: "/images/mediakitpage5.webp",
      description: "Media kit presentation slide 5"
    },
    {
      id: 6,
      title: "Media Kit Page 6",
      image: "/images/mediakitpage6.webp",
      description: "Media kit presentation slide 6"
    },
    {
      id: 7,
      title: "Media Kit Page 7",
      image: "/images/mediakitpage7.webp",
      description: "Media kit presentation slide 7"
    },
    {
      id: 8,
      title: "Media Kit Page 8",
      image: "/images/mediakitpage8.webp",
      description: "Media kit presentation slide 8"
    },
    {
      id: 9,
      title: "Media Kit Page 9",
      image: "/images/mediakitpage9.webp",
      description: "Media kit presentation slide 9"
    },
    {
      id: 10,
      title: "Media Kit Page 10",
      image: "/images/mediakitpage10.webp",
      description: "Media kit presentation slide 10"
    }
  ];

  return (
    <div style={{ background: "#fff", color: "#333", margin: 0, padding: 0 }}>
      <style jsx global>{`
        .media-kit-section .axil-title {
          color: #333 !important;
        }

        .media-kit-container {
          margin: 0;
          padding: 0;
        }

        .media-kit-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          margin-top: 0;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
        }

        .media-kit-card {
          position: relative;
        }

        .media-kit-card:not(:last-child)::after {
          content: '';
          display: block;
          width: 100%;
          height: 3px;
          background: #d4af37;
          margin: 30px 0;
        }

        .media-kit-card {
          background: #fff;
          border: none;
          border-radius: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: none;
          width: 100vw;
        }

        .media-kit-image {
          width: 100vw;
          height: auto;
          object-fit: cover;
          background: transparent;
          display: block;
        }

        .media-kit-content {
          display: none;
        }

        .media-kit-action {
          display: none;
        }

        @media (max-width: 768px) {
          .media-kit-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .media-kit-content {
            padding: 20px;
          }

          .media-kit-title {
            font-size: 1.1rem;
          }

          .media-kit-image {
            height: 200px;
          }
        }
      `}</style>

      <div className="media-kit-grid">
            {mediaKitImages.map((item) => (
              <div key={item.id} className="media-kit-card">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="media-kit-image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vMC9zIiB2aWQ9IjEwIiBoZWlnaHQ9IjEwIiB2aWV3PSIxMDAlIj48L3N2Zz4K';
                  }}
                />
                <div className="media-kit-content">
                  <h3 className="media-kit-title">{item.title}</h3>
                  <p className="media-kit-description">{item.description}</p>
                  <a href="#" className="media-kit-action">
                    View Details
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M12 19L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MediaKit;
