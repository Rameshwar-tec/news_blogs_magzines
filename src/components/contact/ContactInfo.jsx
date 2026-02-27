import SocialLink from "../../data/social/SocialLink.json";

const ContactInfo = () => {
  return (
    <div className="axil-contact-info-wrapper p-l-md-45 m-b-xs-30 contact-info-wrap">
      <div className="axil-contact-info-inner contact-info-card">
        <h2 className="h4 m-b-xs-10">Contact Information</h2>
        <div className="axil-contact-info">
          <address className="address">
            <p className="mid m-b-xs-20">Heßstraße 36, 80798 München, Germany</p>

            <p className="mid m-b-xs-30">
              Home Branch - office no 328B, Gera imperium Rise, Wipro circle,
              opp to wipro company, Hinjewadi phase 2, Pune
            </p>

            <div className="h5 m-b-xs-10 contact-availability">
              We&apos;re available 24/7. Call now.
            </div>
            <div>
              <a className="tel" href="tel:+16146022959">
                <i className="fas fa-phone" />
                +1 (614) 602-2959
              </a>
            </div>
          </address>

          <div className="contact-social-share m-t-xs-30">
            <div className="axil-social-title h5">Follow Us</div>
            <ul className="social-share social-share__with-bg" style={{ gap: "8px" }}>
              <li>
                <a href={SocialLink.yt.url} target="_blank" rel="noopener noreferrer">
                  <i className={SocialLink.yt.icon} />
                </a>
              </li>
              <li>
                <a href={SocialLink.instagram.url} target="_blank" rel="noopener noreferrer">
                  <i className={SocialLink.instagram.icon} />
                </a>
              </li>
              <li>
                <a href={SocialLink.linked.url} target="_blank" rel="noopener noreferrer">
                  <i className={SocialLink.linked.icon} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-info-card {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%) !important;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: #e7ecf3;
        }

        .contact-info-card h2 {
          color: #f3f6fa;
        }

        .contact-info-card .mid {
          color: #b9c4cf;
          line-height: 1.65;
        }

        .contact-info-card .contact-availability {
          color: #e7ecf3;
        }

        .contact-info-card .tel {
          color: #f0d58a;
          text-decoration: none;
          margin-left: 0;
          font-weight: 500;
        }

        .contact-info-card .tel i {
          color: #d4af37;
          margin-right: 8px;
          position: static;
        }

        .contact-info-card .axil-social-title {
          color: #e7ecf3;
        }

        .contact-info-card :global(.social-share__with-bg li a) {
          background: #121a25;
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #d9e1ea;
        }

        .contact-info-card :global(.social-share__with-bg li a:hover) {
          background: #d4af37;
          border-color: #d4af37;
          color: #10151c;
        }
      `}</style>
    </div>
  );
};

export default ContactInfo;
