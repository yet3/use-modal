import { useState } from 'react';

const Modal = () => {
  const hook = useState(false);
  return <div>Modal: {hook ? 'true' : 'false'}</div>;
};

export { Modal };
