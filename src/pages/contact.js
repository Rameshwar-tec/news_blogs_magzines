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
          <h1>Contact Us</h1>
          <p>
            Welcome to The Entrepreneurial Chronicles Magazine, where we spotlight
            trailblazers from all sectors transforming the business magazine
            landscape. Our mission is to inspire and empower new leaders with
            groundbreaking ideas worldwide. Count on us for reliable insights,
            advice, and industry trends, supporting both established and aspiring
            leaders.
          </p>
        </div>
      </section>

      <section className="contact-form section-gap">
        <div className="container">
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
        <div className="container">
          <div className="section-title">
            <h2 className="axil-title m-b-xs-40">Our Locations</h2>
          </div>
        </div>

        <div className="container location-container">
          <div className="location-grid">
            <div id="germany-map" className="location-map-item">
              <div className="axil-map-wrapper location-map-wrapper">
                <iframe
                  src="https://www.google.com/maps?q=He%C3%9Fstra%C3%9Fe+36,+80798+M%C3%BCnchen,+Germany&output=embed"
                  width="100%"
                  height={220}
                  style={{ border: 0, width: "100%", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Heßstraße 36, 80798 München, Germany"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterTwo />

      <style jsx>{`
        .contact-page {
          background: #070a0e;
          color: #e5ebf2;
          min-height: 100vh;
        }

        .contact-hero {
          position: relative;
          min-height: 52vh;
          padding: 5.2rem 1rem;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .contact-hero__overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(180deg, rgba(6, 9, 13, 0.58) 0%, rgba(6, 9, 13, 0.82) 100%),
            url("/images/Contact_us.jpg");
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

        .contact-hero__content h1 {
          margin: 0 0 1.1rem;
          color: #f4f7fb;
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.2;
        }

        .contact-hero__content p {
          margin: 0 auto;
          color: #d1d9e3;
          max-width: 980px;
          font-size: 1.4rem;
          line-height: 2.4rem;
        }

        .contact-form,
        .our-location {
          background: #070a0e;
          color: #e5ebf2;
        }

        .our-location .section-title .axil-title {
          color: #f3f6fa;
          font-size: 2.4rem;
          line-height: 3.6rem;
        }

        .location-container {
          padding-left: 2rem;
          padding-right: 2rem;
        }

        .location-grid {
          display: grid;
          gap: 1rem;
        }

        .location-map-item {
          width: 100%;
        }

        .location-map-wrapper {
          width: 100%;
          border: 1px solid rgba(212, 175, 55, 0.65);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.32);
        }

        @media (max-width: 767px) {
          .contact-hero {
            min-height: 46vh;
            padding: 3rem 0.75rem;
          }

          .contact-hero__overlay {
            background-position: center top;
          }

          .location-container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        @media (max-width: 991px) {
          .our-location .section-title .axil-title {
            font-size: 2rem;
            line-height: 3rem;
          }

          .contact-hero__content p {
            font-size: 1.2rem;
            line-height: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
