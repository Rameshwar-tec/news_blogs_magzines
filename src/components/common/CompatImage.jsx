import React from "react";

const toSrcString = (src) => {
  if (!src) return "";
  if (typeof src === "string") return src;
  if (typeof src === "object" && typeof src.src === "string") return src.src;
  return String(src);
};

const CompatImage = React.forwardRef(function CompatImage(props, ref) {
  const {
    src,
    alt = "",
    width,
    height,
    fill,
    sizes,
    style,
    className,
    loading,
    priority,
    fetchPriority,
    layout,
    objectFit,
    objectPosition,
    onLoad,
    onError,
    ...rest
  } = props;

  const imgSrc = toSrcString(src);
  const computedLoading = priority ? "eager" : loading;
  const computedFetchPriority = fetchPriority || (priority ? "high" : undefined);

  // Drop Next/Image-only props that are invalid for native <img>.
  const {
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    quality: _quality,
    loader: _loader,
    unoptimized: _unoptimized,
    lazyBoundary: _lazyBoundary,
    lazyRoot: _lazyRoot,
    fetchPriority: _fetchPriority,
    ...nativeRest
  } = rest;

  const mergedStyle = {
    ...(objectFit ? { objectFit } : null),
    ...(objectPosition ? { objectPosition } : null),
    ...(style || null),
  };

  const fillStyle = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...mergedStyle,
      }
    : mergedStyle;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={imgSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      loading={computedLoading}
      fetchpriority={computedFetchPriority}
      className={className}
      style={fillStyle}
      onLoad={onLoad}
      onError={onError}
      data-layout={layout}
      {...nativeRest}
    />
  );
});

export default CompatImage;
