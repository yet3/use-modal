import { useModal, ModalBaseProps, UseModal } from '../../src';

UseModal.setOptions({
  modalWrapper: (
    <aside
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '1px solid rgb(150, 150, 150)',
        padding: 16,
      }}
    />
  ),
});

const FirstModal = ({ closeModal }: ModalBaseProps) => {
  return (
    <>
      <span>First Modal</span>
      <button
        onClick={closeModal}
        style={{ marginLeft: 5, border: '1px solid rgb(200, 200, 200)', padding: 4, cursor: 'pointer' }}
      >
        Close
      </button>
    </>
  );
};

const SecondModal = ({ closeModal }: ModalBaseProps) => {
  return (
    <>
      <span>Second Modal</span>
      <button
        onClick={closeModal}
        style={{ marginLeft: 5, border: '1px solid rgb(200, 200, 200)', padding: 4, cursor: 'pointer' }}
      >
        Close
      </button>
    </>
  );
};

const Component = () => {
  const modal1 = useModal(FirstModal);
  const modal2 = useModal(SecondModal, {
    backdropColor: 'rgba(255, 100, 100, 0.7)',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={() => modal1.toggle()}>Toggle modal 1</button>
      <button onClick={() => modal2.toggle()}>Toggle modal 2</button>
      {modal1.component}
      {modal2.component}
    </div>
  );
};
export { Component };
