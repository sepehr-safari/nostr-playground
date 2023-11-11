import { Button, Card } from '@/common/components';

import { useControls } from './hooks';

export const Controls = () => {
  const { clearEvents, events, filters, relays, setEose, subscribe, subscription, unsubscribe } =
    useControls();

  return (
    <Card.Container>
      <Card.Title>{`Controls`}</Card.Title>

      <Card.Divider />

      <div className="flex gap-4 items-center">
        <div className="ml-auto flex gap-4 items-center">
          <Button
            variant="secondary"
            onClick={() => {
              clearEvents();
              setEose(false);
            }}
            disabled={events.length === 0}
          >
            {`Clear Events`}
          </Button>

          <Button
            variant="secondary"
            onClick={unsubscribe}
            disabled={filters.length === 0 || relays.length === 0 || !subscription}
          >
            {`Unsubscribe`}
          </Button>

          <Button
            variant="primary"
            onClick={subscribe}
            disabled={filters.length === 0 || relays.length === 0 || !!subscription}
          >
            {`Subscribe`}
          </Button>
        </div>
      </div>
    </Card.Container>
  );
};
