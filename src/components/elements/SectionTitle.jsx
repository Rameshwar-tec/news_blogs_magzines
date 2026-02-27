import Link from "next/link";

const SectionTitle = ({ title, btnText, btnUrl, pClass }) => {
  return (
    <div className={`section-title ${pClass ?? "m-b-xs-40"}`}>
      <h2 className="axil-title" style={{ color: "inherit" }}>{title}</h2>
      <Link
        href={btnUrl ?? "#"}
        className="btn-link d-block d-md-inline-block"
        style={{ color: "#d7dce2" }}
      >
        {btnText}
      </Link>
    </div>
  );
};

export default SectionTitle;
