import { useMDXComponent } from "next-contentlayer/hooks";
import mdxComponents from "./mdx-components";

type MDXContentProps = {
  code: string;
};

const MDXContent = ({ code }: MDXContentProps) => {
  const Content = useMDXComponent(code);
  return <Content components={mdxComponents} />;
};

export default MDXContent;
