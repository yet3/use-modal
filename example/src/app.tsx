import { useState } from 'react';
import { useModal, UseModal } from '../../src';
import { Modal } from './modal';

UseModal.setPortalElement(document.getElementById('modals')!);
UseModal.setOptions({
  modalWrapper: <aside className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm" />,
});

const App = () => {
  const [closeAfter, setCloseAfter] = useState(0);
  const modal = useModal(Modal, { props: { text: 'Yay' } });

  return (
    <main>
      <div className="z-30 fixed grid grid-flow-col justify-start gap-2 p-2">
        <button className="button" disabled={modal.isOpen} onClick={() => modal.open({ props: { text: '.open' } })}>
          Open
        </button>
        <button className="button" disabled={!modal.isOpen} onClick={() => modal.close()}>
          Close
        </button>
        <button className="button" onClick={() => modal.toggle({ props: { text: '.toggle' } })}>
          Toggle
        </button>
        <label className="flex flex-col">
          Close after (ms)
          <input
            className="border border-blue-500 rounded-sm"
            type="number"
            min={0}
            onChange={(e) => setCloseAfter(parseInt(e.target.value, 10))}
            value={closeAfter}
          />
        </label>
      </div>
      {modal.component}
    </main>
  );
};

export { App };
