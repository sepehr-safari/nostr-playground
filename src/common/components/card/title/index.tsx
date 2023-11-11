export const Title = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className="block text-md font-semibold text-gray-900" {...props}>
    {props.children}
  </h3>
);
