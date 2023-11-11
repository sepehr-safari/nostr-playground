import { Controls, Events, Filters, Relays } from '@/features1';

export const Page = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center gap-4">
      <div className="h-14 w-full flex items-center gap-4 bg-indigo-600 text-white shadow-md px-4">
        <a href="/" className="flex gap-4">
          <img src="/nostr-playground.svg" className="h-8 w-8" alt="Nostr Playground Logo" />

          <div className="flex flex-col">
            <span className="text-lg font-black sm:text-2xl">{`Nostr Playground`}</span>
            <span className="ml-auto -mt-2 text-[0.6rem] font-extralight sm:text-[0.7rem]">
              {`by Sepehr`}
            </span>
          </div>
        </a>

        <a
          href="https://github.com/sepehr-safari/nostr-playground"
          target="_blank"
          className="ml-auto text-xs font-medium bg-indigo-500/70 px-3 py-1 rounded-md hover:bg-indigo-500 sm:text-sm"
        >
          {`Github`}
        </a>
      </div>

      <div className="w-full grid grid-cols-1 gap-8 px-4 pb-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <Relays />

          <Filters />

          <Controls />
        </div>

        <div className="flex flex-col gap-4">
          <Events />
        </div>
      </div>
    </div>
  );
};
