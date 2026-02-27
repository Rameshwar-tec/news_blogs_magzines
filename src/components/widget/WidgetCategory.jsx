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
        {showTitle ? <h3 className="h4 mb-0 category-title">Categories</h3> : <div />}

        <div className="owl-nav">
          <button
            className="custom-owl-prev"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Previous categories"
          >
            <i className="feather icon-chevron-left"></i>
          </button>
          <button
            className="custom-owl-next"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            aria-label="Next categories"
          >
            <i className="feather icon-chevron-right"></i>
          </button>
        </div>
      </div>
      <div
        className="category-slider position-relative overflow-hidden"
        style={{ height: "1000px" }}
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
                    <h4 className="text-white fs-4 fw-bold">{data.title}</h4>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .category-title {
          color: #e9edf2;
        }

        .category-widget .owl-nav button.custom-owl-prev,
        .category-widget .owl-nav button.custom-owl-next {
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .category-widget .owl-nav button.custom-owl-prev i,
        .category-widget .owl-nav button.custom-owl-next i {
          color: #d7dde5 !important;
        }

        .category-widget .owl-nav button.custom-owl-prev:hover,
        .category-widget .owl-nav button.custom-owl-next:hover {
          background-color: rgba(212, 175, 55, 0.22);
          border-color: rgba(212, 175, 55, 0.45);
        }

        .category-widget .owl-nav button.custom-owl-prev:disabled,
        .category-widget .owl-nav button.custom-owl-next:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default WidgetCategory;
