import { WarningTriangle } from "iconoir-react";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <WarningTriangle className="text-yellow-500 text-4xl" />
      <p className="text-2xl">Under construction!</p>
    </div>
  );
};

export default Page;
