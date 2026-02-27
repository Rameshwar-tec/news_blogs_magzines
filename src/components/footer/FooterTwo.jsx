import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import SocialLink from "../../data/social/SocialLink.json";
import NavbarLogo from "../../assest/chronicle_logo.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Magazines", href: "/magazines" },
  { label: "Blogs", href: "/blogs" },
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

const FooterTwo = () => {
  const [activeMag, setActiveMag] = useState(0);

  const query = `
*[_type == "magazine"]{
  title,
  slug,
  "featureImg": mainImage.asset->url,
  publishedAt
} | order(publishedAt desc)[0...3]
`;

  const { data } = useQuery({
    queryKey: ["footer-magazines-clean"],
    queryFn: async () => client.fetch(query),
  });

  const magazines = data || [];

  useEffect(() => {
    if (!magazines.length) return;
    const timer = setInterval(() => {
      setActiveMag((prev) => (prev + 1) % magazines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [magazines.length]);

  useEffect(() => {
    if (!magazines.length) return;
    if (activeMag >= magazines.length) setActiveMag(0);
  }, [activeMag, magazines.length]);

  const showPrevMag = () => {
    setActiveMag((prev) => (prev - 1 + magazines.length) % magazines.length);
  };

  const showNextMag = () => {
    setActiveMag((prev) => (prev + 1) % magazines.length);
  };

  return (
    <footer className="ecf-root">
      <div className="ecf-wrap">
        <div className="ecf-grid">
          <section className="ecf-col ecf-brand">
            <Link href="/" className="ecf-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={NavbarLogo.src}
                alt="chronicles-logo"
                width="300"
                height="100"
                style={{ objectFit: "contain", width: "240px", height: "auto" }}
              />
            </Link>
            <div className="ecf-brand-copy-wrap">
              <p className="ecf-brand-copy">
                The Entrepreneurial Chronicles is a business magazine that shares
                inspiring success stories of entrepreneurs, transforming
                intriguing tales into captivating narratives. With a skilled
                storytelling team and extensive industry expertise, we amplify
                untold stories from the business world, making our magazine both
                compelling and insightful.
              </p>
            </div>
          </section>

          <section className="ecf-col">
            <h4 className="ecf-heading">Quick Links</h4>
            <ul className="ecf-links">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="ecf-col">
            <h4 className="ecf-heading">Latest Magazines</h4>
            {magazines.length > 0 ? (
              <div className="ecf-mag-carousel">
                <Link
                  href={`/magazine/${magazines[activeMag]?.slug?.current}`}
                  className="ecf-mag-item ecf-mag-item--single"
                >
                  <Image
                    src={magazines[activeMag]?.featureImg}
                    alt={magazines[activeMag]?.title || "Magazine cover"}
                    width={220}
                    height={300}
                  />
                </Link>

                {magazines.length > 1 ? (
                  <div className="ecf-mag-controls">
                    <button
                      type="button"
                      className="ecf-mag-arrow"
                      onClick={showPrevMag}
                      aria-label="Previous magazine"
                    >
                      <i className="feather icon-chevron-left" />
                    </button>
                    <div className="ecf-mag-dots">
                      {magazines.map((mag, index) => (
                        <button
                          key={mag.slug?.current || index}
                          type="button"
                          className={`ecf-mag-dot ${index === activeMag ? "is-active" : ""}`}
                          onClick={() => setActiveMag(index)}
                          aria-label={`Go to magazine ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className="ecf-mag-arrow"
                      onClick={showNextMag}
                      aria-label="Next magazine"
                    >
                      <i className="feather icon-chevron-right" />
                    </button>
                  </div>
                ) : null}

              </div>
            ) : (
              <p className="ecf-muted">No magazines available.</p>
            )}
          </section>

          <section className="ecf-col">
            <h4 className="ecf-heading">Connect</h4>
            <div className="ecf-contact">
              <p>
                <span>Email</span>
                <a href="mailto:info@theentrepreneurialchronicle.com">
                  info@theentrepreneurialchronicle.com
                </a>
              </p>
              <p>
                <span>Phone</span>
                <a href="tel:+16146022959">+1 (614) 602-2959</a>
              </p>
              <p>
                <span>Address</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=He%C3%9Fstra%C3%9Fe+36,+80798+M%C3%BCnchen,+Germany"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Heßstraße 36, 80798 München, Germany
                </a>
              </p>
              <p>
                <span>Home Branch</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=office+no+328B,+Gera+imperium+Rise,+Wipro+circle,+Hinjewadi+phase+2,+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  office no 328B, Gera imperium Rise, Wipro circle, opp to
                  wipro company, Hinjewadi phase 2, Pune
                </a>
              </p>
            </div>

            <ul className="ecf-social">
              <li>
                <a href={SocialLink.fb.url} target="_blank" rel="noopener noreferrer">
                  <i className={SocialLink.fb.icon} />
                </a>
              </li>
              <li>
                <a href={SocialLink.yt.url} target="_blank" rel="noopener noreferrer">
                  <i className={SocialLink.yt.icon} />
                </a>
              </li>
              <li>
                <a href={SocialLink.linked.url} target="_blank" rel="noopener noreferrer">
                  <i className={SocialLink.linked.icon} />
                </a>
              </li>
              <li>
                <a
                  href={SocialLink.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={SocialLink.instagram.icon} />
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="ecf-bottom">
          <p>Copyright 2025 The Entrepreneurial Chronicles. All rights reserved.</p>
          <p>
            Designed by{" "}
            <a
              href="https://www.intellisysitsolutions.com/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              team Intellisys
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .ecf-root {
          background: #090d13;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 30px;
        }

        .ecf-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px 12px;
        }

        .ecf-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .ecf-col {
          min-width: 0;
          align-self: start;
        }

        .ecf-brand {
          max-width: 390px;
        }

        .ecf-logo {
          display: inline-block;
          margin-bottom: 24px;
          width: 240px;
          max-width: 100%;
          line-height: 0;
        }

        .ecf-logo :global(img) {
          width: 100%;
          height: auto !important;
          object-fit: contain;
          display: block;
        }

        .ecf-brand-copy-wrap {
          margin-top: 8px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          max-width: 380px;
        }

        .ecf-brand-copy {
          margin: 0;
          color: #bac5d2;
          font-size: 15px;
          line-height: 1.72;
          font-weight: 400;
          font-family: var(--secondary-font);
        }

        .ecf-heading {
          margin: 0 0 14px;
          font-size: 19px;
          line-height: 1.3;
          text-transform: none;
          letter-spacing: 0.01em;
          font-weight: 700;
          color: #f0f3f7;
          font-family: var(--primary-font);
          text-decoration: underline;
          text-underline-offset: 5px;
          text-decoration-thickness: 1px;
          text-decoration-color: rgba(212, 175, 55, 0.9);
        }

        .ecf-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 8px;
        }

        .ecf-links a {
          color: #d8e0e9;
          text-decoration: none;
          font-size: 12.5px;
          line-height: 1.55;
          font-weight: 400;
          font-family: var(--secondary-font);
        }

        .ecf-links a:hover {
          color: #e0c67f;
        }

        .ecf-mag-carousel {
          max-width: 250px;
          display: grid;
          gap: 8px;
        }

        .ecf-mag-item {
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #0f131b;
          display: block;
        }

        .ecf-mag-item--single {
          max-width: 250px;
        }

        .ecf-mag-item :global(img) {
          width: 100%;
          height: auto;
          display: block;
        }

        .ecf-mag-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          max-width: 250px;
        }

        .ecf-mag-arrow {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: #132030;
          color: #dce4ed;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .ecf-mag-arrow:hover {
          background: #d4af37;
          border-color: #d4af37;
          color: #0f141b;
        }

        .ecf-mag-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .ecf-mag-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          padding: 0;
          cursor: pointer;
        }

        .ecf-mag-dot.is-active {
          background: #d4af37;
        }

        .ecf-muted {
          margin: 0;
          color: #99a7b8;
          font-size: 13px;
          font-family: var(--secondary-font);
        }

        .ecf-contact p {
          margin: 0 0 12px;
          display: grid;
          gap: 3px;
        }

        .ecf-contact span {
          color: #8ea1b4;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          font-family: var(--secondary-font);
        }

        .ecf-contact a {
          color: #d7dfe9;
          text-decoration: none;
          font-size: 13px;
          line-height: 1.5;
          font-family: var(--secondary-font);
          word-break: break-word;
        }

        .ecf-contact a:hover {
          color: #e0c67f;
        }

        .ecf-social {
          list-style: none;
          margin: 8px 0 0;
          padding: 0;
          display: flex;
          gap: 8px;
        }

        .ecf-social a {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: #132030;
          color: #dce4ed;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .ecf-social a:hover {
          background: #d4af37;
          border-color: #d4af37;
          color: #0f141b;
        }

        .ecf-social i {
          font-size: 14px;
        }

        .ecf-bottom {
          margin-top: 24px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: center;
        }

        .ecf-bottom p {
          margin: 0;
          color: #9ba8b7;
          font-size: 12px;
          line-height: 1.5;
          font-family: var(--secondary-font);
        }

        .ecf-bottom a {
          color: #d6deea;
          text-decoration: underline;
        }

        @media (min-width: 768px) {
          .ecf-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 30px;
            row-gap: 22px;
          }
        }

        @media (min-width: 1100px) {
          .ecf-grid {
            grid-template-columns: 1.35fr 0.75fr 1.05fr 1fr;
            gap: 26px;
            align-items: stretch;
          }

          .ecf-col:not(.ecf-brand) {
            border-left: 1px solid rgba(255, 255, 255, 0.08);
            padding-left: 24px;
          }

          .ecf-brand {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: center;
          }

          .ecf-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }
      `}</style>
    </footer>
  );
};

export default FooterTwo;
