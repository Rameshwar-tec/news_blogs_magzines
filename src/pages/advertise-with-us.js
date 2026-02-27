import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import HeadMeta from "../components/elements/HeadMeta";
import Image from "next/image";
import Link from "next/link";

const AdvertiseWithUs = () => {
  return (
    <>
      <HeadMeta
        metaTitle={
          "Exclusive Interviews with Entrepreneurs Featured in The Entrepreneurial Chronicles Magazine"
        }
        metaDesc={
          " Exclusive interviews with top entrepreneurs featured in The Entrepreneurial Chronicles Magazine. Discover their inspiring journey, business strategies, and tips for success in the entrepreneurial world "
        }
      />

      <HeaderOne />

      <main className="advertise-page">
        <section className="advertise-hero">
          <div className="advertise-hero__overlay" />
          <div className="advertise-hero__content">
            <h1>Advertise With Us</h1>
            <p>
              Welcome to The Entrepreneurial Chronicles Magazine, where we
              spotlight trailblazers from all sectors transforming the business
              magazine landscape. Our mission is to inspire and empower new
              leaders with groundbreaking ideas worldwide. Count on us for
              reliable insights, advice, and industry trends, supporting both
              established and aspiring leaders.
            </p>
          </div>
        </section>

        <section className="advertise-section">
          <div className="advertise-shell">
            <div className="intro-grid">
              <div className="intro-block">
                <h2>Why Brands Advertise Here</h2>
                <p className="advertise-copy">
                  A wise businessman once said, &quot;The toothpaste you use to
                  the shiny shoes you wear to the car you drive to the bed you
                  sleep in is advertised,&quot; and adding to that we say,
                  &quot;and you, my friend are afraid to advertise with us!&quot;
                </p>
                <p className="advertise-copy">
                  Being a magazine that strives to bring new age businesses to
                  light, it makes a perfect hub of new blood in the market to
                  recognise you.
                </p>
              </div>
              <div className="metric-grid">
                <div className="metric-card">
                  <h3>Premium Niche Audience</h3>
                  <p>Entrepreneurs, founders, decision-makers, and innovators.</p>
                </div>
                <div className="metric-card">
                  <h3>Brand-Led Storytelling</h3>
                  <p>Editorial environment built for trust and high recall.</p>
                </div>
                <div className="metric-card">
                  <h3>Multi-Format Reach</h3>
                  <p>Website, digital magazine, and social amplification.</p>
                </div>
                <div className="metric-card">
                  <h3>Actionable Visibility</h3>
                  <p>Targeted placement designed to drive inquiries.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="advertise-section">
          <div className="advertise-shell">
            <div className="website-layout">
              <div className="image-card image-card--single">
                <Image
                  src="/images/ads-img.png"
                  alt="CI3FAME Advertisement Placements"
                  width={600}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="website-copy">
                <h2 className="advertise-heading">Website Placement Advertise</h2>
                <p className="advertise-copy">
                  A wise businessman once said, &quot;The toothpaste you use to the
                  shiny shoes you wear to the car you drive to the bed you sleep in is
                  advertised,&quot; and adding to that we say, &quot;and you, my
                  friend are afraid to advertise with us!&quot;
                </p>
                <p className="advertise-copy">
                  Being a magazine that strives to bring new age businesses to light,
                  it makes a perfect hub of new blood in the market to recognise you!
                </p>
                <p className="advertise-copy">
                  Advertise with us and connect yourself with the brand leaders of the
                  paradigm shift in the business world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="advertise-section">
          <div className="advertise-shell">
            <h2 className="advertise-heading">Digital Magazine Placement Advertise</h2>
            <p className="advertise-copy">
              The space and dimension of the Ad on the print and digital platforms
              are mentioned below.
            </p>
            <div className="image-grid">
              <div className="image-card">
                <Image
                  src="/images/Advertisement-1.jpg"
                  alt="CI3FAME Advertisement Placements"
                  width={600}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="image-card">
                <Image
                  src="/images/Advertisement-2.jpg"
                  alt="CI3FAME Advertisement Placements"
                  width={600}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="advertise-cta">
          <div className="advertise-shell">
            <div className="cta-wrap">
              <h2>Ready To Advertise Your Brand?</h2>
              <p>Let&apos;s align your campaign with the right audience and placements.</p>
              <Link href="/contact" className="btn btn-primary">
                Get In Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterTwo />
      <style jsx>{`
        .advertise-page {
          background: #070a0e;
          color: #d5deea;
        }

        .advertise-shell {
          width: 100%;
          max-width: 100%;
          padding-left: 10px;
          padding-right: 10px;
          margin: 0;
        }

        .advertise-hero {
          position: relative;
          min-height: 50vh;
          display: flex;
          align-items: center;
          padding: 5.2rem 0;
          overflow: hidden;
        }

        .advertise-hero__overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(6, 9, 13, 0.62) 0%, rgba(6, 9, 13, 0.88) 100%),
            url("/images/Add.jpg") center/cover no-repeat;
          z-index: 0;
        }

        .advertise-hero__content {
          position: relative;
          z-index: 1;
          width: 100%;
          text-align: center;
          margin: 0 auto;
          max-width: 1080px;
          padding: 0 10px;
        }

        .advertise-hero__content h1 {
          margin: 0 0 1rem;
          color: #f4f8fc;
          font-family: var(--primary-font);
          font-size: clamp(3rem, 5vw, 5rem);
          line-height: 1.1;
        }

        .advertise-hero__content p {
          margin: 0 auto;
          color: #d3dde9;
          font-family: var(--secondary-font);
          font-size: 1.6rem;
          line-height: 2.7rem;
          max-width: 960px;
        }

        .advertise-section {
          padding: 3.5rem 0 0;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2rem;
        }

        .intro-block {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 1.6rem;
        }

        .intro-block h2 {
          color: #f2f6fb;
          font-family: var(--primary-font);
          font-size: 2.8rem;
          line-height: 3.7rem;
          margin-bottom: 1rem;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .metric-card {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.1rem;
        }

        .metric-card h3 {
          color: #f3f7fc;
          font-size: 1.7rem;
          line-height: 2.4rem;
          margin-bottom: 0.5rem;
        }

        .metric-card p {
          color: #b7c3d1;
          font-size: 1.35rem;
          line-height: 2.1rem;
          margin: 0;
        }

        .advertise-heading {
          color: #f2f5f8;
          font-family: var(--primary-font);
          font-size: 2.8rem;
          line-height: 3.6rem;
          font-weight: 600;
          margin: 0 0 1rem;
        }

        .advertise-copy {
          color: #c2ccd8;
          font-family: var(--secondary-font);
          font-size: 1.55rem;
          line-height: 2.6rem;
          font-weight: 400;
          max-width: 980px;
          margin-bottom: 0.9rem;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .image-card {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
        }

        .image-card--single {
          width: 100%;
        }

        .website-layout {
          display: grid;
          grid-template-columns: minmax(280px, 560px) minmax(0, 1fr);
          gap: 1.6rem;
          align-items: stretch;
        }

        .website-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .advertise-cta {
          padding: 3rem 0 4rem;
        }

        .cta-wrap {
          background: linear-gradient(180deg, #101723 0%, #0c1016 100%);
          border: 1px solid rgba(212, 175, 55, 0.35);
          border-radius: 14px;
          padding: 2rem 1.2rem;
          text-align: center;
        }

        .cta-wrap h2 {
          color: #f4f8fd;
          font-size: 2.6rem;
          line-height: 3.4rem;
          margin-bottom: 0.6rem;
        }

        .cta-wrap p {
          color: #c4cfdb;
          font-size: 1.45rem;
          line-height: 2.3rem;
          margin-bottom: 1rem;
        }

        .cta-wrap :global(.btn) {
          min-width: 180px;
        }

        @media (max-width: 991px) {
          .advertise-shell {
            padding-left: 10px;
            padding-right: 10px;
          }

          .advertise-hero {
            min-height: 44vh;
            padding: 3.5rem 0;
          }

          .advertise-hero__content p {
            font-size: 1.35rem;
            line-height: 2.2rem;
          }

          .intro-grid {
            grid-template-columns: 1fr;
          }

          .metric-grid {
            grid-template-columns: 1fr;
          }

          .advertise-heading {
            font-size: 2.4rem;
            line-height: 3.1rem;
          }

          .advertise-copy {
            font-size: 1.4rem;
            line-height: 2.3rem;
          }

          .image-grid {
            grid-template-columns: 1fr;
          }

          .website-layout {
            grid-template-columns: 1fr;
          }

          .cta-wrap h2 {
            font-size: 2.2rem;
            line-height: 3rem;
          }

          .cta-wrap p {
            font-size: 1.35rem;
            line-height: 2.1rem;
          }
        }

        @media (min-width: 768px) {
          .advertise-shell {
            padding-left: 14px;
            padding-right: 14px;
          }
        }

        @media (min-width: 1200px) {
          .advertise-shell {
            padding-left: 18px;
            padding-right: 18px;
          }
        }
      `}</style>
    </>
  );
};

export default AdvertiseWithUs;
