import Image, { ImageProps } from "next/image";
import type { HTMLAttributes } from "react";

export function Avatar({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`ui-avatar ${className}`.trim()} {...props} />;
}

export function AvatarImage({ className = "", alt = "", width = 40, height = 40, ...props }: Omit<ImageProps, "width" | "height"> & {
  width?: number;
  height?: number;
}) {
  return <Image className={`ui-avatar-image ${className}`.trim()} alt={alt} width={width} height={height} unoptimized {...props} />;
}

export function AvatarFallback({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`ui-avatar-fallback ${className}`.trim()} {...props} />;
}