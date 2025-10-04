import Image from "next/image";
import Link from "next/link";

const PostLayoutformag = ({ data }) => {
  return (
    <>
      <div className="post-container">
        <Link href={`/magazine/${data.slug.current}`}>
          <div className="image-container">
            <Image
              src={data.featureImg}
              alt={data?.altText || data.title}
              width={1000}
              height={1000}
              className="img-fluid"
            />
          </div>
        </Link>
        <style jsx>{`
          .post-container {
            position: relative;
            width: 100%;
            margin: 0;
            padding: 0;
          }

          .image-container {
            transition: transform 0.3s ease-in-out;
            width: 100%;
            height: 100%;
          }

          .image-container:hover {
            transform: scale(1.05);
          }
        `}</style>
      </div>
    </>
  );
};

export default PostLayoutformag;
