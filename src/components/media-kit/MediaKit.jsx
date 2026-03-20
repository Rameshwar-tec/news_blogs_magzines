import React from "react";

const MediaKit = () => {
  const mediaKitUrl = "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf";

  return (
    <div style={{ background: "#fff", height: "100vh", margin: 0, padding: 0, position: "relative" }}>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .media-kit-pdf-frame {
          width: 100%;
          height: 100vh;
          border: none;
          display: block;
          margin: 0;
          padding: 0;
        }

        /* Ensure PDF viewer shows full interface */
        .media-kit-pdf-frame::-webkit-scrollbar {
          width: auto;
        }

        .media-kit-pdf-frame {
          scrollbar-width: auto;
        }

        .download-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #d4af37, #b8941f);
          color: white;
          padding: 12px;
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          z-index: 1000;
          width: 45px;
          height: 45px;
        }

        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
          background: linear-gradient(135deg, #e0c040, #d4af37);
        }

        .download-icon {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 768px) {
          .download-btn {
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            padding: 10px;
          }

          .download-icon {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
      
      <iframe
        src={mediaKitUrl}
        className="media-kit-pdf-frame"
        title="Media Kit PDF"
        frameBorder="0"
      />
      
      <a
        href={mediaKitUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
        download
      >
        <svg 
          className="download-icon" 
          viewBox="0 0 24 24" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
};

export default MediaKit;
