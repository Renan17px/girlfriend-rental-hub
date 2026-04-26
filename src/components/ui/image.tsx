import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> & {
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

/**
 * Drop-in replacement for next/image.
 * - `fill` -> absolute inset-0 + object-cover sized via parent.
 * - Ignores `priority`, `sizes`, `unoptimized` (no-op in Vite).
 */
export default function Image({
  fill,
  sizes: _sizes,
  priority: _priority,
  unoptimized: _unoptimized,
  className,
  alt = "",
  style,
  ...rest
}: Props) {
  if (fill) {
    return (
      <img
        {...rest}
        alt={alt}
        className={className}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    );
  }
  return <img {...rest} alt={alt} className={className} style={style} />;
}
