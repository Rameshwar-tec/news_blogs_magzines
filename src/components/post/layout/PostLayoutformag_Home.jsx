import Image from "next/image";
import Link from "next/link";

const PostLayoutformag_Home = ({ data }) => {
  return (
    <div className="content-block">
      <Link href={`/magazine/${data.slug.current}`}>
        <div
          style={{
            padding: "10px", // adjust padding as needed
            background: "linear-gradient(180deg, #0d1116 0%, #090c11 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "8px", // adjust border radius for rounded corners
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)", // add a subtle shadow
            overflow: "hidden",
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
            />
          </div>
          <div className="caption-content">
            <h4
              className="hover-line hover-line"
              style={{
                fontSize: "1.3rem",
                color: "#e8edf3",
                textDecoration: "none",
                marginTop: "2rem",
                padding: "0",
              }}
            >
              <span style={{ color: "#e8edf3", textDecoration: "none" }}>
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
