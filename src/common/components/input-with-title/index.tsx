type Props = {
  title: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputWithTitle = ({ title }: Props) => {
  return (
    <div className="rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
      <h4 className="block text-sm font-medium text-gray-700">{title}</h4>

      <input
        className="mt-4 block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        autoComplete="off"
      />
    </div>
  );
};
