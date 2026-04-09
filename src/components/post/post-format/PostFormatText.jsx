import Image from "next/image";
// import WidgetAd from "../../widget/WidgetAd";
import SharedSidebarWidgets from "../../widget/SharedSidebarWidgets";
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
            <div className="col-lg-9">
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
            <div className="col-lg-3">
              <SharedSidebarWidgets className="post-sidebar" />
            </div>
          </div>
        </div>
        <style jsx global>{`
          .post-detail-page {
            background: #f6f2e8;
            color: #1d2430;
            font-family: var(--secondary-font);
          }

          .post-detail-page > .container {
            max-width: 1400px;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .post-detail-page > .container > .row {
            margin-left: -8px;
            margin-right: -8px;
          }

          .post-detail-page > .container > .row > [class*="col-"] {
            padding-left: 8px;
            padding-right: 8px;
          }

          .post-detail-page .post-details {
            background: transparent;
            border: none;
            border-radius: 0;
            padding: 1.1rem;
          }

          .post-detail-page .single-blog-wrapper .axil-post-title {
            color: #1d2430;
            font-size: var(--type-h3);
            font-family: var(--primary-font);
            line-height: 1.2;
            margin-bottom: 1rem;
          }

          .post-detail-page .single-blog-wrapper .axil-post-title a {
            color: inherit;
          }

          .post-detail-page .single-blog-wrapper .axil-post-title a:hover {
            color: #8b641d;
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
            color: #4d5b6c;
            font-size: var(--type-body-lg);
            font-family: var(--secondary-font);
            line-height: 2.9rem;
          }

          .post-detail-page .rich-text-content h1,
          .post-detail-page .rich-text-content h2,
          .post-detail-page .rich-text-content h3,
          .post-detail-page .rich-text-content h4,
          .post-detail-page .post-details h2,
          .post-detail-page .post-details h3,
          .post-detail-page .post-details h4 {
            color: #1d2430;
            line-height: 1.28;
          }

          .post-detail-page .rich-text-content h2,
          .post-detail-page .post-details h2 {
            font-size: var(--type-h2);
            font-family: var(--primary-font);
          }

          .post-detail-page .rich-text-content h3,
          .post-detail-page .post-details h3 {
            font-size: var(--type-h3);
            font-family: var(--primary-font);
          }

          .post-detail-page .rich-text-content h4,
          .post-detail-page .post-details h4 {
            font-size: var(--type-h5);
            font-family: var(--primary-font);
          }

          .post-detail-page .post-details a:not(.btn) {
            color: #7a5a24;
          }

          .post-detail-page .post-details a:not(.btn):hover {
            color: #8b641d;
          }

          .post-detail-page .post-details strong {
            color: #1d2430;
          }

          .post-detail-page .post-details blockquote {
            border-left: 3px solid rgba(212, 175, 55, 0.65);
            padding-left: 0.85rem;
            margin: 1.1rem 0;
          }

          .post-detail-page .post-shares .title {
            color: #4d5b6c;
            font-size: var(--type-small);
            font-family: var(--secondary-font);
            letter-spacing: 0.06em;
          }

          .post-detail-page .post-shares {
            margin-top: 2.4rem !important;
            margin-bottom: 0 !important;
          }

          .post-detail-page .post-shares li a {
            border-radius: 8px;
            width: 38px;
            height: 38px;
            min-width: 38px;
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .post-detail-page .post-shares li a.bg-color-facebook {
            background: linear-gradient(135deg, #1877f2 0%, #0f5cc0 100%) !important;
          }

          .post-detail-page .post-shares li a.bg-color-linkedin {
            background: linear-gradient(135deg, #0a66c2 0%, #084b8f 100%) !important;
          }

          .post-detail-page .post-shares li a i {
            display: block;
            line-height: 1;
            margin: 0;
            transform: translateY(0);
            font-size: 1.7rem;
          }

          .post-detail-page hr {
            border-color: rgba(126, 92, 35, 0.14);
            margin-top: 1.6rem !important;
            margin-bottom: 2rem !important;
          }

          .post-detail-page .post-sidebar > * {
            background: linear-gradient(180deg, #fffdf8 0%, #f5eddf 100%);
            border: 1px solid rgba(126, 92, 35, 0.14);
            border-radius: 12px;
            padding: 8px;
          }

          .post-detail-page .post-sidebar .shared-sidebar-panel {
            gap: 0.7rem;
          }

          .post-detail-page .post-sidebar .section-title {
            font-size: var(--type-small) !important;
            line-height: 1.35 !important;
            margin-bottom: 0.8rem !important;
          }

          .post-detail-page .post-sidebar .post-widget .media.post-block {
            padding: 0 !important;
          }

          .post-detail-page .post-sidebar .post-widget .axil-post-title {
            font-size: 13px !important;
            line-height: 1.45 !important;
          }

          .post-detail-page .post-sidebar .post-widget img {
            max-width: 8.2rem !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .nav-pills {
            gap: 6px !important;
            margin-bottom: 0.9rem !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .nav-pills .nav-item a {
            font-size: 10px !important;
            padding: 0.65rem 0.35rem !important;
            border-radius: 10px !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .tab-content {
            padding-top: 0.35rem !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .post-block.post-block__small {
            margin-bottom: 0.2rem !important;
            padding-bottom: 0.2rem !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .post-block.post-block__small > a,
          .post-detail-page .post-sidebar .sidebar-post-widget .post-block.post-block__small figure > a {
            margin-right: 1rem !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .post-block.post-block__small .media-body {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }

          .post-detail-page .post-sidebar .category-widget .category-title {
            font-size: var(--type-small) !important;
            line-height: 1.35 !important;
            color: #1d2430 !important;
            font-family: var(--primary-font) !important;
            margin-bottom: 0 !important;
          }

          .post-detail-page .post-sidebar .newsletter-widget .axil-title,
          .post-detail-page .post-sidebar .newsletter-widget h3 {
            font-size: var(--type-small) !important;
            line-height: 1.35 !important;
          }

          .post-detail-page .post-sidebar .newsletter-widget p,
          .post-detail-page .post-sidebar .newsletter-widget input,
          .post-detail-page .post-sidebar .newsletter-widget button,
          .post-detail-page .post-sidebar .category-widget li,
          .post-detail-page .post-sidebar .widget-social-share a {
            font-size: 12px !important;
          }

          .post-detail-page .post-sidebar .category-widget .single-cat {
            padding: 8px !important;
          }

          .post-detail-page .post-sidebar .category-widget .single-cat .inner {
            padding: 8px !important;
          }

          .post-detail-page .post-sidebar .category-widget .cat-content {
            padding: 8px 10px !important;
          }

          .post-detail-page .post-sidebar .category-widget .cat-content .cat-title,
          .post-detail-page .post-sidebar .category-widget .cat-content h4,
          .post-detail-page .post-sidebar .category-widget .cat-content a {
            font-size: 12px !important;
            line-height: 1.35 !important;
          }

          .post-detail-page .post-sidebar .category-widget .category-slider {
            height: calc((145px * 4) + (0.9rem * 3)) !important;
          }

          .post-detail-page .post-sidebar .category-widget .category-item {
            margin-bottom: 0.9rem !important;
          }

          .post-detail-page .post-sidebar .category-widget .category-item > a,
          .post-detail-page .post-sidebar .category-widget .category-item :global(a.d-block.position-relative) {
            height: 145px !important;
            border-radius: 10px !important;
          }

          .post-detail-page .post-sidebar .category-widget .category-card-title {
            font-size: var(--type-small) !important;
            line-height: 1.25 !important;
            padding: 0 10px !important;
          }

          .post-detail-page .category-widget .owl-nav button.custom-owl-prev,
          .post-detail-page .category-widget .owl-nav button.custom-owl-next {
            background: #fffaf1 !important;
            border: 1px solid rgba(126, 92, 35, 0.14);
          }

          .post-detail-page .category-widget .owl-nav button.custom-owl-prev i,
          .post-detail-page .category-widget .owl-nav button.custom-owl-next i {
            color: #4d5b6c !important;
          }

          @media (max-width: 991px) {
            .post-detail-page > .container {
              padding-left: 12px !important;
              padding-right: 12px !important;
            }

            .post-detail-page > .container > .row {
              margin-left: -6px;
              margin-right: -6px;
            }

            .post-detail-page > .container > .row > [class*="col-"] {
              padding-left: 6px;
              padding-right: 6px;
            }

            .post-detail-page .post-details {
              padding: 0.9rem;
            }

            .post-detail-page .post-details p,
            .post-detail-page .post-details li,
            .post-detail-page .rich-text-content p,
            .post-detail-page .rich-text-content li {
              font-size: var(--type-body);
              line-height: 2.5rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default PostFormatText;
