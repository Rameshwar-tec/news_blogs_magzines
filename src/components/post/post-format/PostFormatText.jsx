import Image from "next/image";
// import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import { RichTextComponent } from "../RichTextComponent";
import PostComment from "./elements/PostComment";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";
import { PortableText } from "@portabletext/react";

const PostFormatText = ({ postData, allData }) => {
  return (
    <>
      <div className="post-single-wrapper p-t-xs-60 post-detail-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <main className="site-main">
                <article className="post-details">
                  <div className="single-blog-wrapper">
                    <SocialShareSide />
                    <h2 className="axil-post-title hover-line">
                      {postData?.title}
                    </h2>
                  </div>

                  <Image
                    className="mb-4 w-full h-auto object-cover"
                    src={postData?.featureImg}
                    alt={postData?.altText || postData?.title}
                    width={500}
                    height={300}
                    sizes="(max-width: 768px) 100vw, 700px"
                    style={{ width: "100%", height: "auto" }}
                  />

                  <div className="rich-text-content">
                    <PortableText
                      value={postData?.body}
                      components={RichTextComponent}
                    />
                  </div>
                </article>
                <SocialShareBottom />
                <hr className="m-t-xs-50 m-b-xs-60" />

                <PostComment />
              </main>
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetNewsletter />
                <WidgetSocialShare />
                <WidgetPost dataPost={allData} />
                {/* <WidgetInstagram /> */}
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .post-detail-page {
            background: #070a0e;
            color: #dbe3ec;
          }

          .post-detail-page .post-details {
            background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 1.1rem;
          }

          .post-detail-page .single-blog-wrapper .axil-post-title {
            color: #f3f6fa;
            font-size: clamp(2.6rem, 4vw, 3.8rem);
            line-height: 1.2;
            margin-bottom: 1rem;
          }

          .post-detail-page .single-blog-wrapper .axil-post-title a {
            color: inherit;
          }

          .post-detail-page .single-blog-wrapper .axil-post-title a:hover {
            color: #ffffff;
          }

          .post-detail-page .post-details > span img,
          .post-detail-page .post-details img.mb-4 {
            border-radius: 10px;
          }

          .post-detail-page .rich-text-content,
          .post-detail-page .post-details p,
          .post-detail-page .post-details li,
          .post-detail-page .rich-text-content p,
          .post-detail-page .rich-text-content li,
          .post-detail-page .rich-text-content blockquote {
            color: #d6dee8;
            font-size: 1.7rem;
            line-height: 2.9rem;
          }

          .post-detail-page .rich-text-content h1,
          .post-detail-page .rich-text-content h2,
          .post-detail-page .rich-text-content h3,
          .post-detail-page .rich-text-content h4,
          .post-detail-page .post-details h2,
          .post-detail-page .post-details h3,
          .post-detail-page .post-details h4 {
            color: #edf2f7;
            line-height: 1.28;
          }

          .post-detail-page .rich-text-content h2,
          .post-detail-page .post-details h2 {
            font-size: 2.6rem;
          }

          .post-detail-page .rich-text-content h3,
          .post-detail-page .post-details h3 {
            font-size: 2.1rem;
          }

          .post-detail-page .rich-text-content h4,
          .post-detail-page .post-details h4 {
            font-size: 1.8rem;
          }

          .post-detail-page .post-details a:not(.btn) {
            color: #d8e7ff;
          }

          .post-detail-page .post-details a:not(.btn):hover {
            color: #ffffff;
          }

          .post-detail-page .post-details strong {
            color: #f0f5fb;
          }

          .post-detail-page .post-details blockquote {
            border-left: 3px solid rgba(212, 175, 55, 0.65);
            padding-left: 0.85rem;
            margin: 1.1rem 0;
          }

          .post-detail-page .post-shares .title {
            color: #e7edf4;
            font-size: 1.3rem;
            letter-spacing: 0.06em;
          }

          .post-detail-page .post-shares li a {
            border-radius: 8px;
            min-width: 52px;
            justify-content: center;
          }

          .post-detail-page hr {
            border-color: rgba(255, 255, 255, 0.12);
          }

          .post-detail-page .post-sidebar > * {
            background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 12px;
          }

          @media (max-width: 991px) {
            .post-detail-page .post-details {
              padding: 0.9rem;
            }

            .post-detail-page .post-details p,
            .post-detail-page .post-details li,
            .post-detail-page .rich-text-content p,
            .post-detail-page .rich-text-content li {
              font-size: 1.5rem;
              line-height: 2.5rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default PostFormatText;
