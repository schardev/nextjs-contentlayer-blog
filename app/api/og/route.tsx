import config from "@/lib/siteConfig";
import { ImageResponse } from "next/server";

export const runtime = "edge";

const fontBold = fetch(
  new URL("../../../public/fonts/Biotif-Bold.woff", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  const fontData = await fontBold;
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  const date = url.searchParams.get("date");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: title ? "flex-start" : "center",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#",
          fontFamily: "SpaceGrotesk",
        }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "radial-gradient(circle at -5% -15%, rgba(245, 158, 11, 0.45), rgba(0,0,0,0) 40%)",
          }}></div>
        <p
          style={{
            color: "#fafaf9",
            ...(title
              ? {
                  position: "absolute",
                  top: 32,
                  left: 52,
                  fontSize: 32,
                }
              : {
                  fontSize: 100,
                }),
          }}>
          {config.title}
        </p>
        <p
          style={{
            color: "#f59e0b",
            marginLeft: 52,
            fontSize: 32,
            fontFamily: "Biotif",
          }}>
          {date}
        </p>
        <p
          style={{
            color: "#fafaf9",
            fontSize: 56,
            marginLeft: 52,
            marginRight: 52,
            fontFamily: "Biotif",
            fontWeight: 700,
            lineHeight: "1.5em",
          }}>
          {title}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Biotif",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
