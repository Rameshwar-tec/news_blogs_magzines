import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import SectionTitle from "../elements/SectionTitle";

const IndustryCategories = () => {
  const query = `*[_type == "industryCategory"]{
    title,
    slug,
    altText,
    description,
    "imageUrl": image.asset->url
  } | order(title asc)`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["industry-categories"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div className="industry-state">Error fetching industry categories</div>;
  if (!data) return null;

  return (
    <div className="section-gap section-gap-top__with-text industries-page-wrap">
      <div className="container industries-page-shell">
        <SectionTitle
          title="Industries"
          btnText="All Industries"
          btnUrl={"/industries"}
          pClass="title-white m-b-xs-40 industries-heading"
        />
        <div className="row">
          {data.map((item) => (
            <div className="col-lg-3 col-md-4 col-6" key={item.slug?.current || item.title}>
              <Link
                href={`/industries/${item.slug?.current}`}
                className="industry-card-link"
              >
                <div className="industry-card">
                  <div className="industry-card-image-wrap">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.altText || item.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </div>
                  <div className="industry-card-body">
                    <h3 className="industry-card-title">{item.title}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .industries-page-wrap {
          background: #070a0e;
          color: #e9eef4;
        }

        .industries-page-shell {
          max-width: 100% !important;
          width: 100% !important;
          padding-left: 10px !important;
          padding-right: 10px !important;
        }

        .industries-page-wrap :global(.industries-heading) {
          font-size: 2.8rem;
          line-height: 3.8rem;
        }

        .industry-card-link {
          text-decoration: none;
          display: block;
        }

        .industry-card {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }

        .industry-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.34);
        }

        .industry-card-image-wrap {
          position: relative;
          width: 100%;
          height: 140px;
          overflow: hidden;
        }

        .industry-card-body {
          padding: 12px;
        }

        .industry-card-title {
          color: #f2f6fb;
          font-weight: 600;
          font-size: 1.6rem;
          line-height: 2.2rem;
          margin: 0;
        }

        .industry-state {
          background: #070a0e;
          color: #ff9b9b;
          padding: 1rem 10px;
        }

        @media (min-width: 768px) {
          .industries-page-shell {
            padding-left: 14px !important;
            padding-right: 14px !important;
          }
        }

        @media (min-width: 1200px) {
          .industries-page-shell {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
        }

        @media (max-width: 767px) {
          .industries-page-wrap :global(.industries-heading) {
            font-size: 2.3rem;
            line-height: 3.1rem;
          }

          .industry-card-title {
            font-size: 1.4rem;
            line-height: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default IndustryCategories;
