type Props = {
  title: string;
  value: string;
};

export const ReadonlyInputWithTitle = ({ title, value }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="block text-sm font-medium text-gray-700">{title}</span>

      <span className="break-all inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
        {value}
      </span>
    </div>
  );
};
