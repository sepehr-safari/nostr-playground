import { ArrayInputWithTitle, Card } from '@/common/components';

import { useRelays } from './hooks';

export const Relays = () => {
  const { addRelay, relays, removeRelay, subscription } = useRelays();

  return (
    <Card.Container>
      <Card.Title>{`Relays`}</Card.Title>

      <ArrayInputWithTitle
        title=""
        placeholder="wss://nos.lol"
        defaultValue={'wss://'}
        disabled={subscription != null}
        array={relays}
        onAdd={addRelay}
        onRemove={removeRelay}
      />
    </Card.Container>
  );
};
