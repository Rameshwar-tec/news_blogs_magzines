import SectionTitle from "../elements/SectionTitle";
import PostVideoOne from "./layout/PostVideoOne";
import PostVideoTwo from "./layout/PostVideoTwo";

const RelatedArticles = ({ currentMagArticle, allMagazinesArticles }) => {
  return (
    <div className="axil-video-posts section-gap section-gap-top__with-text related-articles-light">
      <div className="container">
        <SectionTitle
          btnUrl={`/category/web-profiles`}
          title={"Related Articles"}
          btnText="Read all Articles"
          pClass="m-b-xs-40"
        />
        <div className="row">
          <div className="col-lg-8">
            {currentMagArticle.map((post, index) => (
              <PostVideoOne data={post} key={index} />
            ))}
          </div>
          <div className="col-lg-4">
            {allMagazinesArticles.map((post, index) => (
              <PostVideoTwo data={post} key={index} pClass="related-articles-light__item m-b-xs-30" />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .related-articles-light {
          background: linear-gradient(180deg, #fffdf8 0%, #f6f2e8 100%);
        }

        .related-articles-light .section-title .title,
        .related-articles-light .section-title .axil-title,
        .related-articles-light .section-title h2,
        .related-articles-light .section-title h3 {
          color: #1d2430 !important;
        }

        .related-articles-light .section-title .btn,
        .related-articles-light .section-title a.btn {
          background: #d4af37 !important;
          border-color: #d4af37 !important;
          color: #111315 !important;
        }

        .related-articles-light .section-title .btn:hover,
        .related-articles-light .section-title a.btn:hover {
          background: #b8891f !important;
          border-color: #b8891f !important;
          color: #fffdf8 !important;
        }

        .related-articles-light .axil-img-container .grad-overlay__transparent {
          background: linear-gradient(180deg, rgba(29, 36, 48, 0.04) 0%, rgba(29, 36, 48, 0.56) 100%) !important;
        }

        .related-articles-light .axil-img-container .axil-post-title a,
        .related-articles-light .axil-img-container .axil-post-title {
          color: #fffdf8 !important;
        }

        .related-articles-light__item {
          background: rgba(255, 250, 241, 0.9) !important;
          border: 1px solid rgba(126, 92, 35, 0.14) !important;
        }

        .related-articles-light__item .axil-post-title,
        .related-articles-light__item .axil-post-title a {
          color: #1d2430 !important;
        }

        .related-articles-light__item .post-cat {
          background: #e8d39b !important;
          color: #6f5417 !important;
        }
      `}</style>
    </div>
  );
};

export default RelatedArticles;
