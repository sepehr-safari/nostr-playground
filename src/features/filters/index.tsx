import { PlusIcon } from '@heroicons/react/24/outline';

import {
  ArrayInputWithTitle,
  Button,
  Card,
  InputWithTitle,
  RemoveButton,
} from '@/common/components';

import { useFilters } from './hooks';

export const Filters = () => {
  const { filters, newFilter, removeFilterAt, setFilterItemAt, subscription } = useFilters();

  return (
    <Card.Container>
      <div className="flex gap-4 items-center justify-between">
        <Card.Title>{`Filters`}</Card.Title>

        <Button variant="primary" onClick={newFilter} disabled={subscription != null}>
          <PlusIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
          {`New Filter`}
        </Button>
      </div>

      <Card.Divider />

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

            <RemoveButton
              onClick={() => removeFilterAt(filterIndex)}
              disabled={subscription != null}
            />
          </div>

          <div className="p-4 pt-0 flex flex-col gap-4">
            <ArrayInputWithTitle
              title="Authors"
              placeholder="pubkey (in hex format)"
              disabled={subscription != null}
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

            <ArrayInputWithTitle
              title="IDs"
              placeholder="event id (in hex format)"
              disabled={subscription != null}
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

            <ArrayInputWithTitle
              title="Kinds"
              placeholder="event kind (e.g. 0, 1, 9735, etc.)"
              disabled={subscription != null}
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

              <ArrayInputWithTitle
                title="Tag Names"
                placeholder="tag name based on NIP-1 (e.g. e, p, a, t, r, etc.)"
                disabled={subscription != null}
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
                    <ArrayInputWithTitle
                      key={`filter${filterIndex}-tag${tagName}${tagIndex}`}
                      title={`Tag Values (#${tagName})`}
                      placeholder="tag value"
                      disabled={subscription != null}
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

            <InputWithTitle
              title="Search"
              placeholder="Search string"
              disabled={subscription != null}
              value={filters[filterIndex].search}
              onChange={(e) => {
                if (e.target.value === '') {
                  setFilterItemAt(filterIndex, 'search', undefined);
                } else {
                  setFilterItemAt(filterIndex, 'search', e.target.value);
                }
              }}
            />

            <InputWithTitle
              type="number"
              min={0}
              title="Limit"
              placeholder="Maximum number of events"
              disabled={subscription != null}
              value={String(filters[filterIndex].limit)}
              onChange={(e) => {
                if (e.target.value === '') {
                  setFilterItemAt(filterIndex, 'limit', undefined);
                } else {
                  setFilterItemAt(filterIndex, 'limit', parseInt(e.target.value));
                }
              }}
            />

            <InputWithTitle
              type="number"
              min={0}
              title="Since"
              placeholder="Timestamp in seconds"
              disabled={subscription != null}
              value={String(filters[filterIndex].since)}
              onChange={(e) => {
                if (e.target.value === '') {
                  setFilterItemAt(filterIndex, 'since', undefined);
                } else {
                  setFilterItemAt(filterIndex, 'since', parseInt(e.target.value));
                }
              }}
            />

            <InputWithTitle
              type="number"
              min={0}
              title="Until"
              placeholder="Timestamp in seconds"
              disabled={subscription != null}
              value={String(filters[filterIndex].until)}
              onChange={(e) => {
                if (e.target.value === '') {
                  setFilterItemAt(filterIndex, 'until', undefined);
                } else {
                  setFilterItemAt(filterIndex, 'until', parseInt(e.target.value));
                }
              }}
            />
          </div>
        </div>
      ))}
    </Card.Container>
  );
};
