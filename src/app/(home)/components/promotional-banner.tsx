import Image from "next/image";

interface PromotionalBannerProps {
  imagePath: string;
  imageDescription: string;
}

const PromotionalBanner = ({
  imagePath,
  imageDescription,
}: PromotionalBannerProps) => {
  return (
    <Image
      src={imagePath}
      width={0}
      height={0}
      className="h-auto w-full"
      sizes="100vw"
      alt={imageDescription}
    />
  );
};

export default PromotionalBanner;
