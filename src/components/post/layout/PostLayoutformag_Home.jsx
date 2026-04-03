import Image from "next/image";
import Link from "next/link";

const PostLayoutformag_Home = ({ data }) => {
  return (
    <div className="content-block">
      <Link href={`/magazine/${data.slug.current}`}>
        <div
          style={{
            padding: "0",
            background: "transparent",
            border: "none",
            borderRadius: "0",
            boxShadow: "none",
            overflow: "visible",
            margin: "2rem",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <Image
              src={data.featureImg}
              alt={data?.altText || data.title}
              width={1000}
              height={1000}
              className="img-fluid"
              style={{ display: "block" }}
              priority
            />
          </div>
          <div className="caption-content">
            <h4
              className="hover-line hover-line"
              style={{
                fontSize: "var(--type-h5)",
                fontFamily: "var(--primary-font)",
                lineHeight: "1.35",
                fontWeight: 700,
                color: "#1d2430",
                textDecoration: "none",
                marginTop: "1.25rem",
                padding: "0",
              }}
            >
              <span style={{ color: "#1d2430", textDecoration: "none" }}>
                {data.title}
              </span>
            </h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostLayoutformag_Home;
