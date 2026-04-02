import Breadcrumb from "../components/common/Breadcrumb";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import HeadMeta from "../components/elements/HeadMeta";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ContactPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.asPath.includes("#")) return;

    const hash = router.asPath.split("#")[1];
    const timer = setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [router.asPath]);

  return (
    <div className="contact-page">
      <HeadMeta
        metaTitle="Connect and Share Your Story with The Entrepreneurial Chronicles Magazine"
        metaDesc="Share your entrepreneurial journey and inspire others with The Entrepreneurial Chronicles Magazine. Connect with a global community of business leaders, innovators, and changemakers by contributing your unique story and insights."
      />

      <HeaderOne />
      <Breadcrumb aPage="Contact Us" />

      <section className="contact-hero">
        <div className="contact-hero__overlay" />
        <div className="contact-hero__content">
          <span className="contact-hero__eyebrow">Let&apos;s Connect</span>
          <h1>Contact Us</h1>
          <p>
            Welcome to The Entrepreneurial Chronicles Magazine, where we spotlight
            trailblazers from all sectors transforming the business magazine
            landscape. Our mission is to inspire and empower new leaders with
            groundbreaking ideas worldwide. Count on us for reliable insights,
            advice, and industry trends, supporting both established and aspiring
            leaders.
          </p>
          <div className="contact-hero__actions">
            <a href="#contact-form-section" className="btn btn-primary">
              Send Message
            </a>
            <a href="#usa-map" className="btn btn-secondary">
              View Location
            </a>
          </div>
        </div>
      </section>

      <section id="contact-form-section" className="contact-form section-gap">
        <div className="container contact-shell">
          {/* <div className="contact-section-head">
            <h2>Get In Touch</h2>
            <p>Tell us about your inquiry and our team will respond shortly.</p>
          </div> */}
          <div className="row align-items-center">
            <div className="col-lg-7">
              <ContactForm />
            </div>
            <div className="col-lg-5">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap our-location section-gap-top__with-text">
        <div className="container contact-shell location-section-wrap">
          <div className="section-title">
            <h2 className="axil-title m-b-xs-40">Our Locations</h2>
          </div>
          <div className="location-grid location-grid--single">
            <div id="germany-map" className="location-map-item">
              <div className="axil-map-wrapper location-map-wrapper">
                <iframe
                  src="https://www.google.com/maps?q=6605+Longshore+St,+Dublin,+OH+43017,+USA&output=embed"
                  width="100%"
                  height={220}
                  style={{ border: 0, width: "100%", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="6605 Longshore St, Dublin, OH 43017, USA"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterTwo />

      <style jsx>{`
        .contact-page {
          background: #f6f2e8;
          color: #1d2430;
          min-height: 100vh;
          font-family: var(--secondary-font);
        }

        .contact-shell {
          max-width: 100% !important;
          width: 100% !important;
          padding-left: 10px !important;
          padding-right: 10px !important;
        }

        .contact-hero {
          position: relative;
          min-height: 58vh;
          padding: 5.8rem 1rem;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .contact-hero__overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(180deg, rgba(6, 9, 13, 0.58) 0%, rgba(6, 9, 13, 0.82) 100%),
            url("https://vinayravindran.com/wp-content/uploads/2013/05/top-magazines1.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center 22%;
          z-index: 0;
        }

        .contact-hero__content {
          position: relative;
          z-index: 1;
          max-width: 1040px;
          margin: 0 auto;
          text-align: center;
          padding: 0 1rem;
        }

        .contact-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          padding: 0.45rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(212, 175, 55, 0.6);
          color: #e5cc88;
          font-size: var(--type-caption);
          font-family: var(--secondary-font);
          line-height: 1;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .contact-hero__content h1 {
          margin: 0 0 1rem;
          color: #f4f7fb;
          font-size: clamp(var(--type-h2), 5vw, var(--type-display));
          line-height: 1.12;
          font-family: var(--primary-font);
        }

        .contact-hero__content p {
          margin: 0 auto;
          color: #d1d9e3;
          max-width: 980px;
          font-size: var(--type-body);
          line-height: 1.7;
          font-family: var(--secondary-font);
        }

        .contact-hero__actions {
          margin-top: 1.3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .contact-hero__actions .btn.btn-secondary {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #edf2f7;
        }

        .contact-form,
        .our-location {
          background: #f6f2e8;
          color: #1d2430;
        }

        .contact-section-head {
          margin-bottom: 1.4rem;
        }

        .contact-section-head h2 {
          color: #1d2430;
          font-size: var(--type-h2);
          line-height: 1.2;
          font-family: var(--primary-font);
          margin: 0;
        }

        .contact-section-head p {
          margin: 0.35rem 0 0;
          color: #5e6876;
          font-size: var(--type-small);
          line-height: 1.6;
          font-family: var(--secondary-font);
        }

        .our-location .section-title .axil-title {
          color: #1d2430;
          font-size: var(--type-h2);
          line-height: 1.2;
          font-family: var(--primary-font);
        }

        .location-section-wrap {
          padding-left: 10px;
          padding-right: 10px;
        }

        .location-grid {
          display: grid;
          gap: 1.1rem;
        }

        .location-grid--single {
          grid-template-columns: minmax(0, 1fr);
          align-items: stretch;
        }

        .location-map-item {
          width: 100%;
        }

        .location-map-wrapper {
          width: 100%;
          border: 1px solid rgba(126, 92, 35, 0.2);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 22px rgba(126, 92, 35, 0.12);
        }

        @media (min-width: 768px) {
          .contact-shell {
            padding-left: 14px !important;
            padding-right: 14px !important;
          }

          .location-section-wrap {
            padding-left: 14px;
            padding-right: 14px;
          }
        }

        @media (min-width: 1200px) {
          .contact-shell {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          .location-section-wrap {
            padding-left: 18px;
            padding-right: 18px;
          }
        }

        @media (max-width: 991px) {
          .our-location .section-title .axil-title,
          .contact-section-head h2 {
            font-size: var(--type-h3);
          }

          .contact-hero__content p {
            font-size: var(--type-small);
            line-height: 1.6;
          }

          .location-grid--single {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .contact-hero {
            min-height: 46vh;
            padding: 3.2rem 0.75rem;
          }

          .contact-hero__overlay {
            background-position: center top;
          }

          .location-section-wrap {
            padding-left: 10px;
            padding-right: 10px;
          }

          .contact-hero__actions {
            gap: 0.6rem;
          }

          .contact-hero__actions .btn {
            min-width: 140px;
          }

          .contact-hero__content h1 {
            font-size: var(--type-h2);
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
