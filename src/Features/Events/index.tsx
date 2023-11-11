import { toast } from 'react-toastify';

import { Button, Card, ReadonlyInputWithTitle } from '@/common/components';

import { useEvents } from './hooks';

export const Events = () => {
  const { events, eose } = useEvents();

  return (
    <Card.Container>
      <Card.Title>{`Events`}</Card.Title>

      <Card.Divider />

      {events.map((event, index) => (
        <div
          key={index}
          className="mt-4 border border-gray-300 rounded-lg duration-200 hover:border-indigo-600"
        >
          <div className="p-4 flex gap-4 items-center justify-between">
            <h3 className="block text-md font-semibold text-indigo-600">{`Event #${index + 1}`}</h3>

            <Button
              variant="primary"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(event));
                toast('Copied to clipboard', { type: 'success' });
              }}
            >{`Copy Raw JSON`}</Button>
          </div>

          <div className="p-4 flex flex-col gap-4">
            <ReadonlyInputWithTitle title="ID" value={String(event.id)} />
            <ReadonlyInputWithTitle title="Kind" value={String(event.kind)} />
            <ReadonlyInputWithTitle title="Created At" value={String(event.created_at)} />
            <ReadonlyInputWithTitle title="Pubkey" value={String(event.pubkey)} />
            <ReadonlyInputWithTitle title="Content" value={String(event.content || `""`)} />

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

            <ReadonlyInputWithTitle title="Signature" value={String(event.sig)} />
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
    </Card.Container>
  );
};
