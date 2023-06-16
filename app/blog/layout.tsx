const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-container-center min-h-screen my-8 lg:my-12">
      {children}
    </div>
  );
};

export default BlogLayout;
