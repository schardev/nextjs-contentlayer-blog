import sizeOf from "image-size";
import { ISizeCalculationResult } from "image-size/dist/types/interface";
import { ImageProps, default as NextImage } from "next/image";
import { readFile } from "node:fs/promises";
import { IncomingMessage } from "node:http";
import https from "node:https";
import path from "node:path";
import "server-only";

// https://github.com/image-size/image-size/issues/258
// https://github.com/nickadamson/messonry/commit/1604311247f077718650435b4ca38ae87b41e55d
const getStreamImageSize = async (stream: IncomingMessage) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
    try {
      // stop requesting data after dimensions are known
      return sizeOf(Buffer.concat(chunks));
    } catch (error) {
      // Not enough buffer to determine sizes yet
    }
  }

  return sizeOf(Buffer.concat(chunks));
};

const Image = async ({
  src,
  quality = 100,
  ...restProps
}: Omit<ImageProps, "src"> & { src: string }) => {
  if (!src) return null;
  const isExternalImage = src.startsWith("https");
  const isPublicImage = src.startsWith("/");
  const imgProps = { src, quality, ...restProps };
  let Img: typeof NextImage | string = "img";

  try {
    let size: ISizeCalculationResult | null = null;

    if (isPublicImage) {
      const img = await readFile(path.join("public", src));
      size = sizeOf(img);
    }

    if (isExternalImage) {
      size = await new Promise((resolve) => {
        https.get(src, async (stream) => {
          resolve(await getStreamImageSize(stream));
        });
      });
    }

    if (size) {
      const { width, height } = size;
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
