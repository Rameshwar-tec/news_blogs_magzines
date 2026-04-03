import Image from "next/image";
import Link from "next/link";

const PostLayoutOne = ({
  data,
  descriptionLimit = 260,
  separateMoreLink = false,
}) => {
  const description = data?.description?.trim() || "";
  const descriptionPreview =
    description.length > descriptionLimit
      ? `${description.slice(0, Math.max(descriptionLimit - 3, 0)).trimEnd()}...`
      : description;

  return (
    <div
      className="axil-latest-post"
      style={
        {
          // background: "#ec597c",
        }
      }
    >
      <div className="media post-block m-b-xs-20">
        <figure className="fig-container" style={{ position: "relative", display: "inline-block", margin: 0 }}>
          <Link href={`/post/${data?.slug.current}`}>
            <Image
              src={data?.featureImg}
              alt={data?.altText || data?.title}
              width={0}
              height={0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Link>
          <div
            className="post-cat-group m-b-xs-10"
            style={{
              position: "absolute",
              left: 16,
              bottom: 16,
              zIndex: 2
            }}
          >
            <Link
              className={`post-cat cat-btn ${"bg-color-blue-one"}`}
              href={`/category/${data?.category.slug}`}
            >
              {data?.category.title}
            </Link>
          </div>
        </figure>
        <div className="media-body" style={{ marginTop: 0 }}>
          <h3 className="axil-post-title hover-line hover-line color-white" style={{ color: "#f3f5f7" }}>
            <Link href={`/post/${data?.slug.current}`}>{data?.title}</Link>
          </h3>
          {descriptionPreview ? (
            <>
              <p className="market-news-feature-desc">{descriptionPreview}</p>
              <Link
                href={`/post/${data?.slug.current}`}
                className="market-news-feature-more"
              >
                More...
              </Link>
            </>
          ) : separateMoreLink ? (
            <Link href={`/post/${data?.slug.current}`} className="market-news-feature-more">
              More...
            </Link>
          ) : (
            <p className="market-news-feature-desc">
              <Link href={`/post/${data?.slug.current}`} className="market-news-feature-more">
                More...
              </Link>
            </p>
          )}
        </div>
      </div>
      {/* End of .post-block */}
    </div>
  );
};

export default PostLayoutOne;
