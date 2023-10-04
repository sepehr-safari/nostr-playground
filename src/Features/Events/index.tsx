import { toast } from 'react-toastify';

import { useEvents } from './useEvents';

export const Events = () => {
  const { events, eose } = useEvents();

  return (
    <div className="p-4 rounded-xl shadow-lg border border-gray-300 bg-gray-50 duration-200 hover:border-indigo-600">
      <div className="flex gap-4 items-center justify-between">
        <h3 className="block text-md font-semibold leading-6 text-gray-900">{`Events`}</h3>
      </div>

      <hr className="my-4 border-gray-300" />

      {events.map((event, index) => (
        <div
          key={index}
          className="mt-4 border border-gray-300 rounded-lg duration-200 hover:border-indigo-600"
        >
          <div className="p-4 flex gap-4 items-center justify-between">
            <h3 className="block text-md font-semibold text-indigo-600">{`Event #${index + 1}`}</h3>

            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(event));
                toast('Copied to clipboard', { type: 'success' });
              }}
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {`Copy raw JSON`}
            </button>
          </div>

          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <span className="block text-sm font-medium text-gray-700">{`ID`}</span>

              <span className="break-all inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                {event.id}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="block text-sm font-medium text-gray-700">{`Kind`}</span>

              <span className="break-all inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                {event.kind}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="block text-sm font-medium text-gray-700">{`Created At`}</span>

              <span className="break-all inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                {event.created_at}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="block text-sm font-medium text-gray-700">{`Pubkey`}</span>

              <span className="break-all inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                {event.pubkey}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="block text-sm font-medium text-gray-700">{`Content`}</span>

              <span className="break-all inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                {event.content || '""'}
              </span>
            </div>

            <div>
              <label
                htmlFor={`event-tags-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                {`Tags`}
              </label>

              {event.tags.length == 0 ? (
                <div className="mt-4 flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-x-2 rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                    {`No tags`}
                  </span>
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-4">
                  {event.tags.map((tag, i) => (
                    <div
                      key={tag.join(',')}
                      className="flex flex-wrap items-center gap-4 border border-gray-200 rounded-md p-4 duration-200 hover:border-indigo-600"
                    >
                      {tag.map((v, j) =>
                        j == 0 ? (
                          <span key={v + i + j} className="w-full text-xs font-bold text-gray-600">
                            {v || '""'}
                          </span>
                        ) : (
                          <span
                            key={v + i + j}
                            className="break-all inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600"
                          >
                            {v || '""'}
                          </span>
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <span className="block text-sm font-medium text-gray-700">{`Signature`}</span>

              <span className="break-all inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                {event.sig}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4">
        {eose && (
          <span className="font-semibold text-sm text-green-700">
            {`EOSE (End of subscription event)`}
          </span>
        )}
      </div>

      {events.length == 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          <span className="inline-flex items-center gap-x-2 rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
            {`Nothing yet!`}
          </span>
        </div>
      )}
    </div>
  );
};
