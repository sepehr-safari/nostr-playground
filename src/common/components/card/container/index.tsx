export const Container = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className="p-4 rounded-xl shadow-lg border border-gray-300 bg-gray-50 duration-200 hover:border-indigo-600"
    {...props}
  >
    {props.children}
  </div>
);
