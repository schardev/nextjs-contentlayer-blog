const MarkdownTable = (props: React.ComponentPropsWithoutRef<"table">) => {
  return (
    <div className="overflow-x-auto my-[2em] border border-borders rounded-global">
      <table {...props} />
    </div>
  );
};

export default MarkdownTable;
