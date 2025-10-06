import Image from "next/image";
import Link from "next/link";

const PostLayoutformag = ({ data }) => {
  return (
    <div className="post-container">
      <Link href={`/magazine/${data.slug.current}`}>
        <div className="image-container">
          <Image
            src={data.featureImg}
            alt={data?.altText || data.title}
            width={600}   // original size
            height={800}  // original size
            className="img-fluid"
          />
        </div>
      </Link>
      <div className="title-container">
        <div className="line" />
        <h4
          style={{
            marginTop: "1rem",
            fontSize: "1.3rem",
            color: "#ffffff", // White text
            textAlign: "center",
          }}
        >
          <Link href={`/magazine/${data.slug.current}`} style={{ color: "#ffffff" }}>
            {data.title}
          </Link>
        </h4>
      </div>

      <style jsx>{`
        .post-container {
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }

        .image-container {
          box-shadow: #ae8625 2px 2px 5px 5px;
        }

        .line {
          width: 100%;
          height: 4px;
          background-color: #ffffff; /* white line */
          margin: 1rem 0;
        }

        @media (max-width: 768px) {
          .post-container {
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default PostLayoutformag;