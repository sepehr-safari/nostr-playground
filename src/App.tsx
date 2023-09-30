import { PlusIcon } from '@heroicons/react/24/outline';
import { Event, Filter, SimplePool, Sub } from 'nostr-tools';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const pool = new SimplePool();

function App() {
  const [relayInput, setRelayInput] = useState<string>('');
  const [authorsInput, setAuthorsInput] = useState<string>('');
  const [IDsInput, setIDsInput] = useState<string>('');
  const [kindsInput, setKindsInput] = useState<string>('');

  const [sub, setSub] = useState<Sub | null>(null);
  const [relays, setRelays] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [eose, setEose] = useState(false);

  const addRelay = useCallback(() => {
    if (!relayInput) return;
    if (relays.includes(relayInput)) return;
    if (!relayInput.startsWith('wss://')) return;

    setRelays((prev) => [...prev, relayInput]);
    setRelayInput('');
  }, [relayInput, relays, setRelays, setRelayInput]);

  const addAuthor = useCallback(
    (filterIndex: number) => {
      if (!authorsInput) return;

      setAuthorsInput('');

      setFilters((prev) => {
        const newFilters = [...prev];
        const authors = newFilters[filterIndex].authors || [];
        if (authors.includes(authorsInput)) return newFilters;
        newFilters[filterIndex].authors = [...authors, authorsInput];
        return newFilters;
      });
    },
    [authorsInput, setAuthorsInput, filters, setFilters]
  );

  const addID = useCallback(
    (filterIndex: number) => {
      if (!IDsInput) return;

      setIDsInput('');

      setFilters((prev) => {
        const newFilters = [...prev];
        const IDs = newFilters[filterIndex].ids || [];
        if (IDs.includes(IDsInput)) return newFilters;
        newFilters[filterIndex].ids = [...IDs, IDsInput];
        return newFilters;
      });
    },
    [IDsInput, setIDsInput, filters, setFilters]
  );

  const addKind = useCallback(
    (filterIndex: number) => {
      if (!kindsInput) return;

      setKindsInput('');

      setFilters((prev) => {
        const newFilters = [...prev];
        const kinds = newFilters[filterIndex].kinds || [];
        if (kinds.includes(+kindsInput)) return newFilters;
        newFilters[filterIndex].kinds = [...kinds, +kindsInput];
        return newFilters;
      });
    },
    [kindsInput, setKindsInput, filters, setFilters]
  );

  const newFilter = useCallback(() => {
    setFilters((prev) => [...prev, {}]);
  }, [setFilters]);

  const subscribe = useCallback(() => {
    if (filters.length > 0 && relays.length > 0) {
      setSub(pool.sub(relays, filters));

      toast('Subscription started', { type: 'success' });
    }
  }, [relays, filters, setEvents, sub, setSub]);

  const unsubscribe = useCallback(() => {
    if (sub) {
      sub.unsub();
      setSub(null);
      setEose(false);

      toast('Subscription stoped', { type: 'success' });
    }
  }, [sub, setSub, setEose]);

  useEffect(() => {
    if (!sub) return;

    sub.on('event', (event) => {
      setEvents((prev) => [...prev, event]);
    });

    sub.on('eose', () => {
      setEose(true);

      toast('EOSE (End of subscription event)', { type: 'info' });
    });
  }, [sub, setEvents, setEose]);

  return (
    <div className="flex flex-col w-full h-full justify-center gap-4">
      <div className="h-14 w-full flex items-center gap-4 bg-indigo-600 text-white shadow-md px-4">
        <a href="/" className="flex gap-4">
          <img
            src="/nostr-playground.svg"
            className="h-8 w-8 hidden sm:block"
            alt="Nostr Playground Logo"
          />

          <div className="flex flex-col">
            <span className="text-lg font-black sm:text-2xl">Nostr Playground</span>
            <span className="ml-auto -mt-2 text-[0.6rem] font-extralight sm:text-[0.7rem]">
              by Sepehr
            </span>
          </div>
        </a>

        <button className="ml-auto text-xs font-medium bg-indigo-500/70 px-3 py-1 rounded-md hover:bg-indigo-500 sm:text-sm">
          Donate
          <span className="-mr-1 ml-1">⚡️</span>
        </button>

        <a
          href="https://github.com/sepehr-safari/nostr-playground"
          target="_blank"
          className="text-xs font-medium bg-indigo-500/70 px-3 py-1 rounded-md hover:bg-indigo-500 sm:text-sm"
        >
          Github
        </a>
      </div>

      <div className="w-full grid grid-cols-1 gap-8 px-4 pb-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="p-4 rounded-xl shadow-lg border border-gray-300 bg-gray-50 duration-200 hover:border-indigo-600">
            <h3 className="block text-md font-semibold text-gray-900">Relays</h3>

            <hr className="my-4 border-gray-300" />

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                name="Relays"
                className="block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                placeholder="wss://nos.lol"
                value={relayInput}
                onChange={(e) => setRelayInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addRelay();
                  }
                }}
              />

              <button
                onClick={addRelay}
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
                Add
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              {relays.length == 0 && (
                <span className="inline-flex items-center gap-x-2 rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                  {`Nothing yet!`}
                </span>
              )}

              {relays.map((relay, index) => (
                <span
                  key={relay}
                  className="inline-flex items-center gap-x-2 rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600"
                >
                  {relay}
                  <button
                    onClick={() => {
                      setRelays((prev) => prev.filter((_, i) => i !== index));
                    }}
                    type="button"
                    className="group relative -mr-2 -my-1 p-1 rounded-full hover:bg-gray-500/20"
                  >
                    <span className="sr-only">Remove</span>
                    <svg
                      viewBox="0 0 14 14"
                      className="h-4 w-4 stroke-gray-600/50 group-hover:stroke-gray-600/75"
                    >
                      <path d="M4 4l6 6m0-6l-6 6" />
                    </svg>
                    <span className="absolute -inset-1" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl shadow-lg border border-gray-300 bg-gray-50 duration-200 hover:border-indigo-600">
            <div className="flex gap-4 items-center justify-between">
              <h3 className="block text-md font-semibold leading-6 text-gray-900">Filters</h3>

              <button
                onClick={newFilter}
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                    onClick={() => {
                      setFilters((prev) => prev.filter((_, i) => i !== filterIndex));
                    }}
                    type="button"
                    className="group relative -mr-1 p-1 rounded-full hover:bg-gray-500/20"
                  >
                    <span className="sr-only">Remove</span>
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
                  <div className="rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
                    <label
                      htmlFor={`filter-authors-${filterIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {`Authors`}
                    </label>

                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        name={`filter-authors-${filterIndex}`}
                        className="block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        placeholder="pubkey (in hex format)"
                        value={authorsInput}
                        onChange={(e) => setAuthorsInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addAuthor(filterIndex);
                          }
                        }}
                      />

                      <button
                        onClick={() => addAuthor(filterIndex)}
                        type="button"
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <PlusIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
                        {`Add`}
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4">
                      {!filter.authors || filter.authors.length == 0 ? (
                        <span className="inline-flex items-center gap-x-2 rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                          {`Nothing yet!`}
                        </span>
                      ) : (
                        filter.authors.map((author) => (
                          <span
                            key={author}
                            className="inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600"
                          >
                            {author}
                            <button
                              onClick={() => {
                                setFilters((prev) => {
                                  const newFilters = [...prev];
                                  const authors = newFilters[filterIndex].authors || [];
                                  newFilters[filterIndex].authors = authors.filter(
                                    (v) => v !== author
                                  );
                                  return newFilters;
                                });
                              }}
                              type="button"
                              className="group relative -mr-2 -my-1 p-1 rounded-full hover:bg-gray-500/20"
                            >
                              <span className="sr-only">Remove</span>
                              <svg
                                viewBox="0 0 14 14"
                                className="h-4 w-4 stroke-gray-600/50 group-hover:stroke-gray-600/75"
                              >
                                <path d="M4 4l6 6m0-6l-6 6" />
                              </svg>
                              <span className="absolute -inset-1" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
                    <label
                      htmlFor={`filter-ids-${filterIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {`IDs`}
                    </label>

                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        name={`filter-ids-${filterIndex}`}
                        className="block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        placeholder="event id"
                        value={IDsInput}
                        onChange={(e) => setIDsInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addID(filterIndex);
                          }
                        }}
                      />

                      <button
                        onClick={() => addID(filterIndex)}
                        type="button"
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <PlusIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
                        {`Add`}
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4">
                      {!filter.ids || filter.ids.length == 0 ? (
                        <span className="inline-flex items-center gap-x-2 rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                          {`Nothing yet!`}
                        </span>
                      ) : (
                        filter.ids.map((id) => (
                          <span
                            key={id}
                            className="inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600"
                          >
                            {id}
                            <button
                              onClick={() => {
                                setFilters((prev) => {
                                  const newFilters = [...prev];
                                  const ids = newFilters[filterIndex].ids || [];
                                  newFilters[filterIndex].ids = ids.filter((v) => v !== id);
                                  return newFilters;
                                });
                              }}
                              type="button"
                              className="group relative -mr-2 -my-1 p-1 rounded-full hover:bg-gray-500/20"
                            >
                              <span className="sr-only">Remove</span>
                              <svg
                                viewBox="0 0 14 14"
                                className="h-4 w-4 stroke-gray-600/50 group-hover:stroke-gray-600/75"
                              >
                                <path d="M4 4l6 6m0-6l-6 6" />
                              </svg>
                              <span className="absolute -inset-1" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
                    <label
                      htmlFor={`filter-kinds-${filterIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {`Kinds`}
                    </label>

                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        name={`filter-kinds-${filterIndex}`}
                        className="block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        placeholder="event kind (e.g. 0, 1, 9735, etc.)"
                        value={kindsInput}
                        onChange={(e) => setKindsInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addKind(filterIndex);
                          }
                        }}
                      />

                      <button
                        onClick={() => addKind(filterIndex)}
                        type="button"
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <PlusIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
                        {`Add`}
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4">
                      {!filter.kinds || filter.kinds.length == 0 ? (
                        <span className="inline-flex items-center gap-x-2 rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600">
                          {`Nothing yet!`}
                        </span>
                      ) : (
                        filter.kinds.map((kind) => (
                          <span
                            key={kind}
                            className="inline-flex items-center gap-x-2 rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300 duration-200 hover:ring-indigo-600"
                          >
                            {kind}
                            <button
                              onClick={() => {
                                setFilters((prev) => {
                                  const newFilters = [...prev];
                                  const kinds = newFilters[filterIndex].kinds || [];
                                  newFilters[filterIndex].kinds = kinds.filter((v) => v !== kind);
                                  return newFilters;
                                });
                              }}
                              type="button"
                              className="group relative -mr-2 -my-1 p-1 rounded-full hover:bg-gray-500/20"
                            >
                              <span className="sr-only">Remove</span>
                              <svg
                                viewBox="0 0 14 14"
                                className="h-4 w-4 stroke-gray-600/50 group-hover:stroke-gray-600/75"
                              >
                                <path d="M4 4l6 6m0-6l-6 6" />
                              </svg>
                              <span className="absolute -inset-1" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
                    <label
                      htmlFor={`filter-limit-${filterIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {`Limit`}
                    </label>
                    <input
                      type="number"
                      min={0}
                      name={`filter-limit-${filterIndex}`}
                      className="mt-4 block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      placeholder="maximum number of events"
                      value={filter.limit}
                      onChange={(e) => {
                        const limit = parseInt(e.target.value);
                        setFilters((prev) => {
                          const newFilters = [...prev];
                          newFilters[filterIndex].limit = limit;
                          return newFilters;
                        });
                      }}
                    />
                  </div>

                  <div className="rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
                    <label
                      htmlFor={`filter-search-${filterIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {`Search`}
                    </label>
                    <input
                      type="text"
                      name={`filter-search-${filterIndex}`}
                      className="mt-4 block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      placeholder="search string"
                      value={filter.search}
                      onChange={(e) => {
                        const search = e.target.value;
                        setFilters((prev) => {
                          const newFilters = [...prev];
                          newFilters[filterIndex].search = search;
                          return newFilters;
                        });
                      }}
                    />
                  </div>

                  <div className="rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
                    <label
                      htmlFor={`filter-since-${filterIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {`Since`}
                    </label>
                    <input
                      type="number"
                      min={0}
                      name={`filter-since-${filterIndex}`}
                      className="mt-4 block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      placeholder="timestamp in seconds"
                      value={filter.since}
                      onChange={(e) => {
                        const since = parseInt(e.target.value);
                        setFilters((prev) => {
                          const newFilters = [...prev];
                          newFilters[filterIndex].since = since;
                          return newFilters;
                        });
                      }}
                    />
                  </div>

                  <div className="rounded-md border border-gray-300 p-4 duration-200 hover:border-indigo-600">
                    <label
                      htmlFor={`filter-until-${filterIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {`Until`}
                    </label>
                    <input
                      type="number"
                      min={0}
                      name={`filter-until-${filterIndex}`}
                      className="mt-4 block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      placeholder="timestamp in seconds"
                      value={filter.until}
                      onChange={(e) => {
                        const until = parseInt(e.target.value);
                        setFilters((prev) => {
                          const newFilters = [...prev];
                          newFilters[filterIndex].until = until;
                          return newFilters;
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl shadow-lg border border-gray-300 bg-gray-50 duration-200 hover:border-indigo-600">
            <h3 className="block text-md font-semibold text-gray-900">Controls</h3>

            <hr className="my-4 border-gray-300" />

            <div className="flex gap-4 items-center">
              <div className="ml-auto flex gap-4 items-center">
                <button
                  onClick={unsubscribe}
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md border-gray-400 border bg-white px-3 py-2 text-sm font-semibold text-gray-600 duration-200 hover:bg-gray-100 hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={filters.length === 0 || relays.length === 0 || !sub}
                >
                  {`Unsubscribe`}
                </button>
                <button
                  onClick={subscribe}
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={filters.length === 0 || relays.length === 0 || !!sub}
                >
                  {`Subscribe`}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl shadow-lg border border-gray-300 bg-gray-50 duration-200 hover:border-indigo-600">
            <div className="flex gap-4 items-center justify-between">
              <h3 className="block text-md font-semibold leading-6 text-gray-900">{`Events`}</h3>

              <button
                onClick={() => setEvents([])}
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md border-gray-400 border bg-white px-3 py-2 text-sm font-semibold text-gray-600 duration-200 hover:bg-gray-100 hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
              >
                {`Clear Events`}
              </button>
            </div>

            <hr className="my-4 border-gray-300" />

            {events.map((event, index) => (
              <div
                key={index}
                className="mt-4 border border-gray-300 rounded-lg duration-200 hover:border-indigo-600"
              >
                <div className="p-4 flex gap-4 items-center justify-between">
                  <h3 className="block text-md font-semibold text-indigo-600">
                    {`Event #${index + 1}`}
                  </h3>

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
                                <span
                                  key={v + i + j}
                                  className="w-full text-xs font-bold text-gray-600"
                                >
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
                    <span className="block text-sm font-medium text-gray-700">Signature</span>

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
        </div>
      </div>
    </div>
  );
}

export default App;
