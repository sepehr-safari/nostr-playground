import { useControls } from './useControls';

export const Controls = () => {
  const { clearEvents, events, filters, relays, setEose, subscribe, subscription, unsubscribe } =
    useControls();

  return (
    <div className="p-4 rounded-xl shadow-lg border border-gray-300 bg-gray-50 duration-200 hover:border-indigo-600">
      <h3 className="block text-md font-semibold text-gray-900">{`Controls`}</h3>

      <hr className="my-4 border-gray-300" />

      <div className="flex gap-4 items-center">
        <div className="ml-auto flex gap-4 items-center">
          <button
            onClick={() => {
              clearEvents();
              setEose(false);
            }}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md border-gray-400 border bg-white px-3 py-2 text-sm font-semibold text-gray-600 duration-200 hover:bg-gray-100 hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={events.length === 0}
          >
            {`Clear Events`}
          </button>
          <button
            onClick={unsubscribe}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md border-gray-400 border bg-white px-3 py-2 text-sm font-semibold text-gray-600 duration-200 hover:bg-gray-100 hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={filters.length === 0 || relays.length === 0 || !subscription}
          >
            {`Unsubscribe`}
          </button>
          <button
            onClick={subscribe}
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={filters.length === 0 || relays.length === 0 || !!subscription}
          >
            {`Subscribe`}
          </button>
        </div>
      </div>
    </div>
  );
};
