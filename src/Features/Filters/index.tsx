import { PlusIcon } from '@heroicons/react/24/outline';

import { ArrayForm, NumberForm, StringForm } from '@/components';

import { useFilters } from './useFilters';

export const Filters = () => {
  const { filters, newFilter, removeFilterAt, setFilterItemAt, subscription } = useFilters();

  return (
    <div className="p-4 rounded-xl shadow-lg border border-gray-300 bg-gray-50 duration-200 hover:border-indigo-600">
      <div className="flex gap-4 items-center justify-between">
        <h3 className="block text-md font-semibold leading-6 text-gray-900">{`Filters`}</h3>

        <button
          onClick={newFilter}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={subscription != null}
        >
          <PlusIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
          {`New Filter`}
        </button>
      </div>

      <hr className="my-4 border-gray-300" />

      {filters.length == 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          <span className="inline-flex items-center gap-x-2 rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
            {`Nothing yet!`}
          </span>
        </div>
      )}

      {filters.map((filter, filterIndex) => (
        <div
          key={filterIndex}
          className="mt-4 border border-gray-300 rounded-lg duration-200 hover:border-indigo-600"
        >
          <div className="p-4 flex gap-4 items-center justify-between">
            <h3 className="block text-md font-semibold text-indigo-600">
              {`Filter #${filterIndex + 1}`}
            </h3>

            <button
              onClick={() => removeFilterAt(filterIndex)}
              type="button"
              className="group relative -mr-1 p-1 rounded-full hover:bg-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={subscription != null}
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
          </div>

          <div className="p-4 pt-0 flex flex-col gap-4">
            <ArrayForm
              title="Authors"
              placeholder="pubkey (in hex format)"
              array={filter.authors || []}
              onAdd={(author) =>
                author != '' &&
                setFilterItemAt(filterIndex, 'authors', [...(filter.authors || []), author])
              }
              onRemove={(author) =>
                setFilterItemAt(
                  filterIndex,
                  'authors',
                  filter.authors?.filter((a) => a != author)
                )
              }
            />

            <ArrayForm
              title="IDs"
              placeholder="event id (in hex format)"
              array={filter.ids || []}
              onAdd={(id) =>
                id != '' && setFilterItemAt(filterIndex, 'ids', [...(filter.ids || []), id])
              }
              onRemove={(id) =>
                setFilterItemAt(
                  filterIndex,
                  'ids',
                  filter.ids?.filter((i) => i != id)
                )
              }
            />

            <ArrayForm
              title="Kinds"
              placeholder="event kind (e.g. 0, 1, 9735, etc.)"
              array={filter.kinds?.map((k) => k.toString()) || []}
              onAdd={(kind) =>
                kind != '' &&
                setFilterItemAt(filterIndex, 'kinds', [...(filter.kinds || []), parseInt(kind)])
              }
              onRemove={(kind) =>
                setFilterItemAt(
                  filterIndex,
                  'kinds',
                  filter.kinds?.filter((k) => k != parseInt(kind))
                )
              }
            />

            <div className="w-full flex flex-col gap-4 rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
              <h4 className="block text-sm font-medium text-gray-700">{`Tags`}</h4>

              <ArrayForm
                title="Tag Names"
                placeholder="tag name based on NIP-1 (e.g. e, p, a, t, r, etc.)"
                array={Object.keys(filter).filter((key) => key.startsWith('#'))}
                onAdd={(tagName) =>
                  tagName != '' &&
                  setFilterItemAt(
                    filterIndex,
                    `#${tagName.startsWith('#') ? tagName.slice(1) : tagName}`,
                    []
                  )
                }
                onRemove={(tagName) => {
                  setFilterItemAt(filterIndex, `#${tagName.slice(1)}`, undefined);
                }}
              />

              {Object.keys(filter)
                .filter((key) => key.startsWith('#'))
                .map((tag, tagIndex) => {
                  const tagName = tag.slice(1);

                  return (
                    <ArrayForm
                      key={`filter${filterIndex}-tag${tagName}${tagIndex}`}
                      title={`Tag Values (#${tagName})`}
                      placeholder="tag value"
                      array={filter[`#${tagName}`] || []}
                      onAdd={(tagValue) =>
                        tagValue != '' &&
                        setFilterItemAt(filterIndex, `#${tagName}`, [
                          ...(filter[`#${tagName}`] || []),
                          tagValue,
                        ])
                      }
                      onRemove={(tagValue) =>
                        setFilterItemAt(
                          filterIndex,
                          `#${tagName}`,
                          filter[`#${tagName}`]?.filter((t) => t != tagValue)
                        )
                      }
                    />
                  );
                })}
            </div>

            <StringForm filterIndex={filterIndex} filterKey="search" placeholder="search string" />

            <NumberForm
              filterIndex={filterIndex}
              filterKey="limit"
              placeholder="maximum number of events"
            />

            <NumberForm
              filterIndex={filterIndex}
              filterKey="since"
              placeholder="timestamp in seconds"
            />

            <NumberForm
              filterIndex={filterIndex}
              filterKey="until"
              placeholder="timestamp in seconds"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
