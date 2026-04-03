import Link from "next/link";

const SectionTitle = ({ title, btnText, btnUrl, pClass }) => {
  return (
    <div className={`section-title ${pClass ?? "m-b-xs-40"}`}>
      <div className="section-title__heading">
        <span className="section-title__dot" />
        <h2 className="axil-title" style={{ color: "inherit" }}>{title}</h2>
      </div>
      {btnText ? (
        <Link
          href={btnUrl ?? "#"}
          className="btn-link d-block d-md-inline-block"
          style={{ color: "#7a5a24" }}
        >
          {btnText}
        </Link>
      ) : null}

      <style jsx>{`
        .section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .section-title__heading {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex: 1;
        }

        .section-title__heading::after {
          content: "";
          flex: 1;
          min-width: 40px;
          height: 3px;
          background: #dfc167;
          border-radius: 999px;
        }

        .section-title__dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #f0a313;
          flex-shrink: 0;
        }

        .section-title .axil-title {
          margin-bottom: 0;
          white-space: nowrap;
        }

        @media (max-width: 767px) {
          .section-title {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default SectionTitle;
