const variantClasses = {
  primary:
    'bg-indigo-600 text-xs text-white shadow-sm hover:bg-indigo-600 focus-visible:outline-indigo-600',
  secondary:
    'border-gray-400 border bg-white text-sm text-gray-600 duration-200 hover:bg-gray-100 hover:border-gray-500 focus-visible:outline-gray-500',
} as const;

type Props = {
  variant?: keyof typeof variantClasses;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ variant = 'primary', children, ...props }: Props) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-x-1.5 rounded-md font-semibold px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
