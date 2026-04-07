import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { client, urlFor } from "../../client";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";

const WidgetCategory = ({ showTitle = true }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const categoriesPerPage = 4;

  const {
    isLoading,
    isError,
    data: categoryData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const fetchResult = await client.fetch(`*[_type == "category"]`);
      return fetchResult;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>An error occurred...</div>;

  const totalSlides = Math.max(0, categoryData.length - categoriesPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="category-widget mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {showTitle ? <h4 className="section-title mb-0 category-title">Categories</h4> : null}
      </div>
      <div
        className="category-slider position-relative overflow-hidden"
        style={{ height: "calc((180px * 4) + (1.5rem * 3))" }}
      >
        <div
          className="category-slide-inner transition"
          style={{
            transform: `translateY(-${currentSlide * 200}px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {categoryData?.map((data, index) => (
            <div key={data.slug?.current} className="category-item mb-4">
              {data.slug?.current === "trusted-brands" ? null : (
                <Link
                  className="d-block position-relative overflow-hidden rounded shadow"
                  href={
                    data.slug?.current === "magazines"
                      ? "/magazines"
                      : `/category/${data.slug?.current}`
                  }
                  style={{ height: "180px" }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src={data.category_image ? urlFor(data.category_image).url() : '/images/placeholder.png'}
                      alt={data?.altText || data.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <h4 className="text-white fw-bold category-card-title">{data.title}</h4>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="owl-nav category-nav-bottom">
        <button
          className="custom-owl-prev"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          aria-label="Previous categories"
        >
          <i className="feather icon-chevron-up"></i>
        </button>
        <button
          className="custom-owl-next"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides}
          aria-label="Next categories"
        >
          <i className="feather icon-chevron-down"></i>
        </button>
      </div>
      <style jsx>{`
        .category-widget {
          font-family: var(--secondary-font);
        }

        .category-title {
          color: #1d2430;
          font-family: var(--primary-font);
          font-size: var(--type-small);
          line-height: 1.35;
        }

        .category-card-title {
          margin: 0;
          font-family: var(--primary-font);
          font-size: var(--type-h4);
          line-height: 1.2;
          text-align: center;
        }

        .category-widget .owl-nav button.custom-owl-prev,
        .category-widget .owl-nav button.custom-owl-next {
          background-color: #fffaf1;
          border: 1px solid rgba(126, 92, 35, 0.22);
          box-shadow: 0 6px 16px rgba(126, 92, 35, 0.12);
        }

        .category-widget .owl-nav button.custom-owl-prev i,
        .category-widget .owl-nav button.custom-owl-next i {
          color: #4d5b6c !important;
        }

        .category-widget .owl-nav button.custom-owl-prev:hover,
        .category-widget .owl-nav button.custom-owl-next:hover {
          background-color: #f5ead3;
          border-color: rgba(212, 175, 55, 0.6);
        }

        .category-widget .owl-nav button.custom-owl-prev:disabled,
        .category-widget .owl-nav button.custom-owl-next:disabled {
          opacity: 0.68;
          cursor: not-allowed;
        }

        .category-nav-bottom {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        @media (max-width: 767px) {
          .category-card-title {
            font-size: var(--type-h5);
          }
        }

      `}</style>
    </div>
  );
};

export default WidgetCategory;
