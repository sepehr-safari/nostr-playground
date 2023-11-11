import { ArrayInputWithTitle, Card } from '@/common/components';

import { useRelays } from './hooks';

export const Relays = () => {
  const { addRelay, relays, removeRelay } = useRelays();

  return (
    <Card.Container>
      <Card.Title>{`Relays`}</Card.Title>

      <ArrayInputWithTitle
        title=""
        placeholder="wss://nos.lol"
        array={relays}
        onAdd={addRelay}
        onRemove={removeRelay}
      />
    </Card.Container>
  );
};
