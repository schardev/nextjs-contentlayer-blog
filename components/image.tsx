import { default as NextImage, ImageProps } from "next/image";
import sizeOf from "image-size";
import { readFile } from "node:fs/promises";
import path from "node:path";
import "server-only";

const Image = async ({
  src,
  quality = 100,
  ...restProps
}: ImageProps & { src: string }) => {
  if (!src) return null;
  const isExternalImage = src.startsWith("https");
  const isPublicImage = src.startsWith("/");
  const imgProps = { src, quality, ...restProps };
  let Img: typeof NextImage | string = "img";

  try {
    let img: Buffer | null = null;
    if (isPublicImage) img = await readFile(path.join("public", src));
    if (isExternalImage) {
      img = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
      );
    }

    if (img) {
      const { width, height } = sizeOf(img);
      imgProps.width = width;
      imgProps.height = height;
      Img = NextImage;
    }
  } catch (error) {
    console.log(error);
  }

  return <Img {...imgProps} />;
};

export default Image;
