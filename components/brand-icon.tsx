/* Preview icons here: https://simpleicons.org/ */
import {
  SiCss3,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { CodeBrackets } from "iconoir-react";

const BrandIcon = ({
  brand,
  ...restProps
}: React.ComponentPropsWithoutRef<"svg"> & { brand: string }) => {
  let Icon;

  switch (brand) {
    case "js":
    case "javascript":
      Icon = SiJavascript;
      break;
    case "ts":
    case "typescript":
      Icon = SiTypescript;
      break;
    case "jsx":
    case "tsx":
      Icon = SiReact;
      break;
    case "css":
      Icon = SiCss3;
      break;
    case "html":
      Icon = SiHtml5;
      break;
    case "json":
    case "jsonc":
      Icon = CodeBrackets;
      break;
    case "sh":
    case "bash":
      Icon = SiGnubash;
      break;
    default:
      return null;
  }

  return <Icon {...restProps} />;
};

export default BrandIcon;
