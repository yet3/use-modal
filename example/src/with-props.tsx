import { useModal, ModalBaseProps } from '../../src';

interface ModalProps extends ModalBaseProps {
  text: string;
  color?: string;
}

const MyModal = ({ closeModal, text, color = 'black' }: ModalProps) => {
  return (
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
    >
      <header style={{ fontSize: 18, fontWeight: 'bold' }}>Super cool modal</header>
      <main style={{ color: color }}>{text}</main>
      <footer>
        <button onClick={closeModal} style={{ border: '1px solid rgb(200, 200, 200)', padding: 4, cursor: 'pointer' }}>
          Close
        </button>
      </footer>
    </aside>
  );
};

const Component = () => {
  const modal = useModal(MyModal, { props: { color: 'red' } });

  return (
    <div>
      <button onClick={() => modal.open({ props: { text: 'Super cool text' } })}>Open modal</button>
      {modal.component}
    </div>
  );
};
export { Component };
