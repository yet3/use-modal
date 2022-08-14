import { ModalBaseProps } from '../../src';

interface Props extends ModalBaseProps {
  text?: string;
}

const Modal = ({ closeModal, text }: Props) => {
  return (
    <>
      <header className="p-3 text-lg font-medium">Title</header>
      <main className="px-3 py-2 w-80">Super cool modal{text ? `: ${text}` : ''}</main>
      <footer className="p-3 grid place-items-center">
        <button className="button" onClick={() => closeModal()}>
          Close
        </button>
      </footer>
    </>
  );
};

export { Modal };
