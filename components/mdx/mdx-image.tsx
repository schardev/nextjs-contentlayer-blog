import Image from "@/components/image";
import { ImageProps } from "next/image";

const MarkdownImage = async ({
  src,
  alt = "",
  ...restProps
}: ImageProps & { src: string }) => {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        sizes="(min-width: 1024px) 80vw, 100vw"
        {...restProps}
      />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  );
};

export default MarkdownImage;
