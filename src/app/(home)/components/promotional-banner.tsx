import Image, { ImageProps } from "next/image";

const PromotionalBanner = ({ alt, ...props }: ImageProps) => {
  return (
    <Image
      {...props}
      width={0}
      height={0}
      className="h-auto w-full object-cover px-5"
      sizes="100vw"
      alt={alt}
    />
  );
};

export default PromotionalBanner;
