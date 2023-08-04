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
};

const fetchImageSizeFromUrl = async (imageUrl: string) => {
  // Not sure if this is the best way to do it, but it works so ...
  try {
    const imageSize = await new Promise<ISizeCalculationResult>(
      (resolve, reject) =>
        https
          .get(imageUrl, async (stream) => {
            const size = await getStreamImageSize(stream);
            if (size) {
              resolve(size);
            } else {
              reject({
                reason: `Error while resolving external image size with src: ${imageUrl}`,
              });
            }
          })
          .on("error", (e) => {
            reject({ reason: e });
          }),
    );
    return imageSize;
  } catch (error) {
    console.error(error);
  }
};

const fetchImageSizeFromFile = async (imagePath: string) => {
  try {
    const img = await readFile(imagePath);
    return sizeOf(img);
  } catch (error) {
    console.log(`Error while reading image with path: ${imagePath}`);
    console.error(error);
  }
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

  let size: ISizeCalculationResult | undefined;

  if (isPublicImage) {
    size = await fetchImageSizeFromFile(path.join("public", src));
  }

  if (isExternalImage) {
    size = await fetchImageSizeFromUrl(src);
  }

  if (size) {
    const { width, height } = size;
    imgProps.width = width;
    imgProps.height = height;
    Img = NextImage;
  }

  return <Img {...imgProps} />;
};

export default Image;
