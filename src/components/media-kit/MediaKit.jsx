import React, { useState } from "react";

const featureCards = [
  {
    title: "Editorial Placement",
    copy:
      "Present your story in a polished magazine-style layout with room for visuals, founder messaging, and brand highlights.",
  },
  {
    title: "Campaign Exposure",
    copy:
      "Pair the feature with digital distribution and platform visibility to extend reach beyond the page itself.",
  },
  {
    title: "Recognition Assets",
    copy:
      "Add premium-looking badges, certificates, or supporting creatives that give the campaign more depth and credibility.",
  },
];

const supportCards = [
  "Branded article layouts",
  "Interview-led storytelling",
  "Digital promotion support",
  "Partner-ready assets",
];

const metrics = [
  { label: "Reader Reach", value: "300K+" },
  { label: "Subscribers", value: "250K+" },
  { label: "Monthly Visits", value: "500K+" },
  { label: "Campaign Regions", value: "Global" },
];

const audience = [
  { label: "Directors & Leaders", value: "37%" },
  { label: "VPs & Heads", value: "23%" },
  { label: "Founders", value: "13%" },
  { label: "Investors", value: "12%" },
  { label: "Specialists", value: "10%" },
  { label: "Others", value: "5%" },
];

const MediaKit = ({ mediaKit }) => {
  const pdfTitle = mediaKit?.mediaKitTitle || mediaKit?.mediaKitPdfName || "Media Kit PDF";
  const pdfUrl = mediaKit?.mediaKitPdfUrl || "";
  const coverImage = mediaKit?.coverImage || "";
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="media-kit-page">
      {pdfUrl ? (
        <div className="mk-download-center">
          <a href={pdfUrl} download className="mk-floating-download">
            <span className="mk-floating-download__icon" aria-hidden="true">
              ↓
            </span>
            <span className="mk-floating-download__text">Download Media Kit</span>
          </a>
        </div>
      ) : null}

      <section className="mk-section mk-section--light mk-single-section">
        <div className="mk-shell">
          {showPreview && pdfUrl ? (
            <div className="mk-preview-frame-wrap">
              <iframe
                src={pdfUrl}
                title={pdfTitle}
                className="mk-preview-frame"
                loading="lazy"
              />
            </div>
          ) : coverImage ? (
            <div className="mk-hero-strip__inner">
              <div className="mk-hero-strip__track">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="mk-hero-strip__card">
                    <img
                      src={coverImage}
                      alt={pdfTitle}
                      className="mk-hero-strip__image"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mk-hero-fallback">
              <div className="mk-hero-fallback__eyebrow">Media Kit</div>
              <h1 className="mk-hero-fallback__title">Explore our brand and advertising kit</h1>
              <p className="mk-hero-fallback__copy">
                Discover our audience reach, campaign opportunities, and brand presentation in one polished media kit.
              </p>
              <div className="mk-hero-fallback__actions">
                {pdfUrl ? (
                  <>
                    <button
                      type="button"
                      className="mk-load-more-btn"
                      onClick={() => setShowPreview(true)}
                    >
                      View Media Kit
                    </button>
                    <a
                      href={pdfUrl}
                      download={mediaKit?.mediaKitPdfName || "media-kit.pdf"}
                      className="mk-load-more-btn mk-load-more-btn--secondary"
                    >
                      Download Media Kit
                    </a>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        body {
          background: #ffffff;
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>

      <style jsx>{`
        .media-kit-page {
          background:
            radial-gradient(circle at 10% 14%, rgba(216, 140, 57, 0.28), transparent 22%),
            radial-gradient(circle at 88% 16%, rgba(125, 62, 19, 0.2), transparent 24%),
            radial-gradient(circle at 84% 78%, rgba(231, 190, 147, 0.28), transparent 28%),
            radial-gradient(circle at 24% 82%, rgba(170, 96, 33, 0.12), transparent 18%),
            linear-gradient(140deg, rgba(255, 255, 255, 0.44) 0 10%, transparent 10% 100%),
            linear-gradient(220deg, rgba(190, 112, 40, 0.11) 0 9%, transparent 9% 100%),
            repeating-linear-gradient(
              135deg,
              rgba(167, 103, 40, 0.045) 0,
              rgba(167, 103, 40, 0.045) 2px,
              transparent 2px,
              transparent 30px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.08) 0,
              rgba(255, 255, 255, 0.08) 1px,
              transparent 1px,
              transparent 22px
            ),
            linear-gradient(180deg, #fff8f1 0%, #f5e4d1 40%, #eed7bf 100%);
          color: #241710;
          position: relative;
        }

        .media-kit-page::before,
        .media-kit-page::after {
          content: "";
          position: absolute;
          inset: auto;
          pointer-events: none;
          z-index: 0;
        }

        .media-kit-page::before {
          top: 90px;
          left: -70px;
          width: 260px;
          height: 260px;
          border-radius: 52px;
          background:
            linear-gradient(135deg, rgba(255, 248, 239, 0.72), rgba(255, 255, 255, 0.08)),
            linear-gradient(45deg, rgba(190, 112, 40, 0.18), rgba(190, 112, 40, 0));
          border: 18px solid rgba(190, 112, 40, 0.12);
          transform: rotate(28deg);
          box-shadow:
            0 0 0 18px rgba(255, 244, 232, 0.26),
            0 18px 60px rgba(114, 62, 23, 0.12);
        }

        .media-kit-page::after {
          right: -76px;
          bottom: 90px;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background:
            radial-gradient(circle, rgba(255, 246, 236, 0.92) 0 28%, transparent 28% 100%),
            conic-gradient(
              from 90deg,
              rgba(190, 112, 40, 0.34) 0 18%,
              transparent 18% 32%,
              rgba(190, 112, 40, 0.2) 32% 54%,
              transparent 54% 68%,
              rgba(190, 112, 40, 0.28) 68% 100%
            );
          opacity: 0.95;
          box-shadow: 0 18px 60px rgba(114, 62, 23, 0.1);
        }

        .media-kit-page {
          isolation: isolate;
        }

        .media-kit-page::selection {
          background: rgba(210, 122, 44, 0.18);
        }

        .mk-download-center {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 60;
        }

        .mk-hero-strip,
        .mk-band,
        .mk-section {
          position: relative;
          z-index: 1;
        }

        .mk-hero-strip::before {
          content: "";
          position: absolute;
          inset: 0.4rem 1rem auto;
          height: calc(100% - 0.8rem);
          border-radius: 32px;
          background:
            linear-gradient(135deg, rgba(255, 252, 247, 0.72), rgba(255, 255, 255, 0.12)),
            radial-gradient(circle at top right, rgba(212, 132, 48, 0.18), transparent 34%);
          border: 1px solid rgba(196, 124, 52, 0.14);
          box-shadow: 0 20px 60px rgba(96, 56, 21, 0.08);
          z-index: -1;
        }

        .mk-floating-download {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          min-height: 52px;
          padding: 1rem 1rem 1rem 0.85rem;
          border-radius: 999px 0 0 999px;
          background: linear-gradient(180deg, #f0a24b, #c66a1d 58%, #9d4f16 100%);
          color: #fffaf4;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 18px 40px rgba(183, 101, 34, 0.38);
          border: 1px solid rgba(255, 232, 207, 0.35);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
        }

        .mk-floating-download:hover {
          filter: brightness(1.04);
          transform: rotate(180deg) translateY(-4px);
          box-shadow: 0 22px 44px rgba(183, 101, 34, 0.44);
        }

        .mk-floating-download__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 999px;
          background: rgba(255, 248, 239, 0.2);
          border: 1px solid rgba(255, 245, 234, 0.4);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.26);
          font-size: 1.15rem;
          line-height: 1;
          writing-mode: horizontal-tb;
          transform: rotate(180deg);
        }

        .mk-floating-download__text {
          display: inline-block;
        }

        .mk-shell {
          width: min(1180px, calc(100% - 2rem));
          margin: 0 auto;
          padding: 0;
        }

        .mk-hero-strip {
          padding: 2.4rem 0 1.4rem;
          overflow: hidden;
        }

        .mk-hero-strip__inner {
          width: 100%;
          overflow: hidden;
        }

        .mk-hero-strip__track {
          display: flex;
          align-items: stretch;
          gap: 1rem;
          width: max-content;
          animation: mkHeroScroll 36s linear infinite;
          padding: 0 1rem;
        }

        .mk-hero-strip__inner:hover .mk-hero-strip__track {
          animation-play-state: paused;
        }

        .mk-hero-strip__card {
          flex: 0 0 380px;
          width: 380px;
          background: linear-gradient(180deg, rgba(255, 252, 247, 0.99), rgba(250, 236, 220, 0.94));
          border: 1px solid rgba(179, 105, 41, 0.18);
          box-shadow:
            0 18px 36px rgba(93, 56, 23, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          overflow: hidden;
          border-radius: 28px;
          line-height: 0;
        }

        .mk-hero-strip__image {
          display: block;
          width: 100%;
          height: auto;
        }

        .mk-hero-fallback {
          width: min(960px, calc(100% - 2rem));
          margin: 0 auto;
          padding: 3rem 2rem;
          border-radius: 28px;
          background: linear-gradient(180deg, rgba(255, 252, 247, 0.98), rgba(250, 236, 220, 0.94));
          border: 1px solid rgba(179, 105, 41, 0.18);
          box-shadow: 0 18px 36px rgba(93, 56, 23, 0.14);
          text-align: center;
        }

        .mk-hero-fallback__eyebrow {
          margin-bottom: 0.75rem;
          color: #be7028;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .mk-hero-fallback__title {
          margin: 0 0 1rem;
          font-size: clamp(2.2rem, 4vw, 3.6rem);
          line-height: 1.08;
          color: #af6321;
        }

        .mk-hero-fallback__copy {
          margin: 0 auto;
          max-width: 720px;
          color: #443329;
          font-size: 1.2rem;
          line-height: 1.8;
        }

        .mk-hero-fallback__actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .mk-hero-strip__card :global(.react-pdf__Page) {
          display: block;
          background: transparent;
          line-height: 0;
        }

        .mk-hero-strip__card :global(.react-pdf__Page__canvas) {
          display: block;
          margin: 0 !important;
        }

        .mk-section-label {
          display: inline-block;
          margin-bottom: 0.9rem;
          color: #be7028;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .mk-hero-strip__card img,
        .mk-hero-strip__card :global(canvas),
        .mk-mini-card__image img,
        .mk-mini-card__image :global(canvas),
        .mk-page-card__body :global(canvas) {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mk-pill-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0.95rem 1.5rem;
          border-radius: 999px;
          border: 1px solid #bf6c22;
          background: linear-gradient(180deg, #db8c39, #b76522);
          color: #fffaf4;
          font-size: 1.08rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          text-decoration: none;
          box-shadow: 0 12px 28px rgba(183, 101, 34, 0.32);
        }

        .mk-pill-btn--ghost {
          background: rgba(255, 244, 232, 0.08);
          color: #fff4e8;
        }

        .mk-section,
        .mk-band {
          padding: 2.8rem 0;
        }

        .mk-load-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        .mk-load-more-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 0.95rem 1.6rem;
          border: 1px solid #bf6c22;
          border-radius: 999px;
          background: linear-gradient(180deg, #db8c39, #b76522);
          color: #fffaf4;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          box-shadow: 0 12px 28px rgba(183, 101, 34, 0.22);
        }

        .mk-load-more-btn--secondary {
          background: rgba(255, 244, 232, 0.4);
          color: #8f4f1c;
          text-decoration: none;
        }

        .mk-preview-gate {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 360px;
          padding: 2rem;
          border-radius: 26px;
          background: linear-gradient(180deg, rgba(255, 252, 247, 0.98), rgba(255, 246, 237, 0.96));
          border: 1px solid rgba(179, 105, 41, 0.14);
          box-shadow:
            0 20px 48px rgba(93, 56, 23, 0.09),
            inset 0 1px 0 rgba(255, 255, 255, 0.75);
        }

        .mk-preview-gate__content {
          max-width: 760px;
          text-align: center;
        }

        .mk-preview-gate__content h2 {
          margin: 0 0 1rem;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.08;
          color: #af6321;
        }

        .mk-preview-gate__content p {
          margin: 0;
          color: #443329;
          font-size: 1.15rem;
          line-height: 1.85;
        }

        .mk-preview-frame-wrap {
          border-radius: 26px;
          overflow: hidden;
          border: 1px solid rgba(179, 105, 41, 0.14);
          box-shadow:
            0 20px 48px rgba(93, 56, 23, 0.09),
            inset 0 1px 0 rgba(255, 255, 255, 0.75);
          background: #fff;
        }

        .mk-preview-frame {
          display: block;
          width: 100%;
          min-height: 88vh;
          border: 0;
          background: #fff;
        }

        .mk-section--light {
          background: rgba(255, 252, 247, 0.78);
        }

        .mk-band {
          border-top: 6px solid #b86929;
          border-bottom: 6px solid #b86929;
          background: linear-gradient(180deg, #fffaf4, #f6ede3);
        }

        .mk-band--last {
          margin-bottom: 2rem;
        }

        .mk-feature-grid,
        .mk-promo-grid,
        .mk-audience-grid {
          display: grid;
          gap: 2rem;
          align-items: center;
        }

        .mk-feature-grid,
        .mk-promo-grid,
        .mk-audience-grid {
          grid-template-columns: 1.08fr 0.92fr;
        }

        .mk-promo-grid--expanded {
          grid-template-columns: minmax(280px, 0.65fr) minmax(0, 1.35fr);
          align-items: stretch;
        }

        .mk-viewer-card,
        .mk-donut-card,
        .mk-audience-list,
        .mk-info-card {
          background: linear-gradient(180deg, rgba(255, 252, 247, 0.98), rgba(255, 246, 237, 0.96));
          border: 1px solid rgba(179, 105, 41, 0.14);
          box-shadow:
            0 20px 48px rgba(93, 56, 23, 0.09),
            inset 0 1px 0 rgba(255, 255, 255, 0.75);
          border-radius: 26px;
        }

        .mk-viewer-card,
        .mk-donut-card,
        .mk-audience-list {
          padding: 2rem;
        }

        .mk-viewer-card {
          min-height: 100%;
        }

        .mk-feature-copy h2,
        .mk-viewer-card h2 {
          margin: 0 0 1rem;
          font-size: clamp(2.2rem, 4vw, 3.8rem);
          line-height: 1.05;
          text-transform: uppercase;
          color: #af6321;
        }

        .mk-feature-copy p,
        .mk-info-card p,
        .mk-empty-panel {
          margin: 0 0 1rem;
          color: #443329;
          font-size: 1.35rem;
          line-height: 2.15rem;
        }

        .mk-feature-copy p:last-child,
        .mk-info-card p:last-child {
          margin-bottom: 0;
        }

        .mk-feature-showcase {
          display: grid;
          gap: 1rem;
        }

        .mk-showcase-main img {
          aspect-ratio: 1.55;
          border: 1px solid rgba(179, 105, 41, 0.16);
        }

        .mk-showcase-main :global(.react-pdf__Page),
        .mk-showcase-thumbs :global(.react-pdf__Page),
        .mk-cover-card :global(.react-pdf__Page),
        .mk-mini-card__image :global(.react-pdf__Page),
        .mk-page-card__body :global(.react-pdf__Page),
        .mk-stack-page :global(.react-pdf__Page) {
          display: flex;
          justify-content: center;
          background: #fff;
        }

        .mk-showcase-thumbs {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 0.6rem;
        }

        .mk-showcase-thumbs img {
          aspect-ratio: 0.72;
          border: 1px solid rgba(179, 105, 41, 0.14);
          background: #fff;
        }

        .mk-thumb-page {
          border: 1px solid rgba(179, 105, 41, 0.14);
          background: #fff;
          overflow: hidden;
        }

        .mk-feature-copy {
          padding: 1rem 0;
        }

        .mk-triple-grid,
        .mk-metrics-grid {
          display: grid;
          gap: 1.2rem;
        }

        .mk-triple-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .mk-info-card {
          padding: 1.8rem;
        }

        .mk-info-card h3 {
          margin: 0 0 0.9rem;
          color: #ae6323;
          font-size: 1.7rem;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .mk-promo-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          align-content: start;
        }

        .mk-mini-card {
          background: linear-gradient(180deg, rgba(255, 252, 247, 0.98), rgba(255, 245, 235, 0.96));
          border: 1px solid rgba(179, 105, 41, 0.12);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(93, 56, 23, 0.08);
        }

        .mk-mini-card__image img {
          aspect-ratio: 1.2;
        }

        .mk-page-placeholder {
          width: 100%;
          background:
            linear-gradient(
              90deg,
              rgba(244, 230, 214, 0.8) 0%,
              rgba(255, 248, 240, 0.95) 50%,
              rgba(244, 230, 214, 0.8) 100%
            );
          background-size: 220% 100%;
          animation: mkPlaceholderShimmer 1.8s ease-in-out infinite;
        }

        .mk-page-placeholder--hero {
          aspect-ratio: 0.72;
        }

        .mk-page-placeholder--mini {
          aspect-ratio: 1.2;
        }

        .mk-page-placeholder--page {
          aspect-ratio: 0.72;
        }

        .mk-mini-card__text {
          padding: 0.7rem 0.85rem;
          color: #8d5220;
          font-size: 1.1rem;
          font-weight: 800;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .mk-viewer-frame {
          border: 1px solid rgba(179, 105, 41, 0.12);
          background: #fff;
          min-height: calc(100vh - 180px);
          overflow: hidden;
        }

        .mk-iframe {
          display: block;
          width: 100%;
          height: calc(100vh - 180px);
          border: none;
        }

        .mk-viewer-actions {
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .mk-empty-panel {
          padding: 1.5rem;
          background: #fff;
          border: 1px dashed rgba(179, 105, 41, 0.28);
        }

        .mk-pages-grid {
          display: grid;
          gap: 1.4rem;
        }

        .mk-page-card {
          background: linear-gradient(180deg, rgba(255, 251, 246, 0.99), rgba(255, 245, 235, 0.98));
          border: 1px solid rgba(179, 105, 41, 0.14);
          box-shadow: 0 16px 34px rgba(93, 56, 23, 0.08);
          overflow: hidden;
          border-radius: 24px;
        }

        .mk-page-card--featured {
          border: 3px solid #cf7b2d;
          box-shadow: 0 0 0 4px rgba(227, 165, 90, 0.22);
          background: linear-gradient(180deg, #fff7ee 0%, #fffdf9 100%);
        }

        .mk-page-card__body {
          padding: 1rem;
          background: #fff;
          overflow-x: auto;
        }

        .mk-page-card--featured .mk-page-card__body {
          padding: 0.75rem;
          background: linear-gradient(180deg, rgba(255, 245, 232, 0.8), #fff);
        }

        .mk-page-card__body :global(canvas) {
          width: min(100%, 1240px) !important;
          height: auto !important;
        }

        @keyframes mkHeroScroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }

        @keyframes mkPlaceholderShimmer {
          0% {
            background-position: 100% 0;
          }

          100% {
            background-position: -100% 0;
          }
        }

        .mk-metrics-grid {
          grid-template-columns: repeat(4, 1fr);
        }

        .mk-metric-card {
          padding: 1.6rem;
          text-align: center;
          background: rgba(255, 250, 245, 0.98);
          border: 1px solid rgba(179, 105, 41, 0.14);
          box-shadow: 0 12px 28px rgba(93, 56, 23, 0.06);
        }

        .mk-metric-card strong {
          display: block;
          color: #ad6020;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1;
        }

        .mk-metric-card span {
          display: block;
          margin-top: 0.5rem;
          color: #5b4333;
          font-size: 1.12rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mk-donut {
          width: min(100%, 300px);
          aspect-ratio: 1;
          margin-top: 1rem;
          border-radius: 50%;
          background: conic-gradient(
            #9f561f 0 37%,
            #bf7440 37% 60%,
            #d69d72 60% 73%,
            #ecc3a2 73% 85%,
            #f6dccb 85% 95%,
            #8d4d20 95% 100%
          );
          position: relative;
          box-shadow: inset 0 0 0 14px rgba(255, 251, 245, 0.85);
        }

        .mk-donut__core {
          position: absolute;
          inset: 34%;
          border-radius: 50%;
          background: #fff9f2;
          box-shadow: 0 0 0 8px rgba(216, 140, 57, 0.22);
        }

        .mk-audience-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .mk-audience-list li {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.9rem 0;
          border-bottom: 1px solid rgba(179, 105, 41, 0.12);
          color: #4a372b;
          font-size: 1.2rem;
        }

        .mk-audience-list li:last-child {
          border-bottom: none;
        }

        .mk-audience-list strong {
          color: #a95f21;
        }

        @media (max-width: 1024px) {
          .mk-cover-strip,
          .mk-triple-grid,
          .mk-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .mk-feature-grid,
          .mk-promo-grid,
          .mk-audience-grid {
            grid-template-columns: 1fr;
          }

          .mk-promo-grid--expanded {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .media-kit-page::before {
            top: 90px;
            left: -110px;
            width: 180px;
            height: 180px;
          }

          .media-kit-page::after {
            right: -95px;
            bottom: 80px;
            width: 170px;
            height: 170px;
          }

          .mk-hero-strip {
            padding-top: 1.6rem;
          }

          .mk-hero-strip__track {
            gap: 0.75rem;
            animation-duration: 28s;
            padding: 0 0.75rem;
          }

          .mk-hero-strip__card {
            flex-basis: 260px;
            width: 260px;
          }

          .mk-cover-strip,
          .mk-triple-grid,
          .mk-promo-list,
          .mk-metrics-grid {
            grid-template-columns: 1fr;
          }

          .mk-viewer-card,
          .mk-donut-card,
          .mk-audience-list,
          .mk-info-card {
            padding: 1.5rem;
          }

          .mk-viewer-frame,
          .mk-iframe {
            min-height: 72vh;
            height: 72vh;
          }

          .mk-showcase-thumbs {
            grid-template-columns: repeat(4, 1fr);
          }

          .mk-download-center {
            right: 0;
            top: auto;
            bottom: 1rem;
            transform: none;
            width: auto;
          }

          .mk-floating-download {
            width: auto;
            writing-mode: initial;
            transform: none;
            border-radius: 999px 0 0 999px;
          }

          .mk-floating-download:hover {
            transform: translateY(-2px);
          }

          .mk-floating-download__icon {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

const HeroPlaceholders = ({ count }) => (
  <div className="mk-hero-strip__track">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="mk-hero-strip__card">
        <div className="mk-page-placeholder mk-page-placeholder--hero" />
      </div>
    ))}
  </div>
);

const MiniCardPlaceholders = ({ items }) => (
  <>
    {items.map((item) => (
      <div key={item} className="mk-mini-card">
        <div className="mk-mini-card__image">
          <div className="mk-page-placeholder mk-page-placeholder--mini" />
        </div>
        <div className="mk-mini-card__text">{item}</div>
      </div>
    ))}
  </>
);

const PagesPlaceholders = () => (
  <div className="mk-pages-grid">
    {Array.from({ length: 3 }, (_, index) => (
      <article key={index} className="mk-page-card">
        <div className="mk-page-card__body">
          <div className="mk-page-placeholder mk-page-placeholder--page" />
        </div>
      </article>
    ))}
  </div>
);

export default MediaKit;
