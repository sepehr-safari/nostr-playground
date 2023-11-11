export const RemoveButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className="group relative -mr-2 -my-1 p-1 rounded-full hover:bg-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      <span className="sr-only">{`Remove`}</span>
      <svg
        viewBox="0 0 14 14"
        className="h-4 w-4 stroke-gray-600/50 group-hover:stroke-gray-600/75"
      >
        <path d="M4 4l6 6m0-6l-6 6" />
      </svg>
      <span className="absolute -inset-1" />
    </button>
  );
};
