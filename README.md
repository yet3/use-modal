# useModal

![GitHub license](https://img.shields.io/github/license/yet3/use-modal?style=flat)

React hook that makes using modals easier.

### Table of Contents
- [Installation](#installation)
- [Usage](#simple-usage)
  - [Simple](#simple-usage)
  - [With props](#with-props)
  - [With modalWrapper](#with-modalwrapper)
- [Options](#options)

### Installation

```sh
yarn add @yet3/use-modal
```

or with npm

```sh
npm install @yet3/use-modal
```

### Simple usage

```tsx
import { useModal } from '@yet3/use-modal';

const MyModal = () => {
  return ( 
    ...
  )
}

const Component = () => {
  const modal = useModal(MyModal)

  return (
    <div>
      <button onClick={modal.open}>Open modal</button>
      {modal.component}
    </div>
  )
}
```

### Options
```ts
export interface CommonOptions {
  closeAfter?: null | false | number;
  portalElement?: PortalElement | null;

  backdropColor?: string | null | false;
  backdrop?: boolean | null | JSX.Element | ((children: ReactNode, opts: BackdropOptions) => JSX.Element);
  closeOnBackdropClick?: boolean
  onBackdropClick?: (d: {closeModal: ModalCloseFunc}) => void | null | false
  modalWrapper?: false | null | ((children: ReactNode, opts: ModalWrapperOptions) => JSX.Element) | JSX.Element;
}

// Options passed via UseModal.setOptions(Options)
export interface UseModalOptions extends CommonOptions {
  startOpen?: boolean;
}

// Options passed to useModal(Options) hook
export interface UseModalHookOptions<P extends ModalProps> extends CommonOptions {
  startOpen?: boolean;
  props?: Partial<P>;
}

// Options passed to open/toggle functions
export interface ModalOptions<P extends ModalProps> extends CommonOptions {
  props?: P;
}
```

### useModal

useModal hook returns:
- isOpen: boolean - whether modal is open
- open: (options?: [ModalOptions](#options)) => void - function to open modal
- close: () => void - function to close modal
- toggle: (options?: [ModalOptions](#options)) => void - function to open/close modal
- component: ReactPortal | null - modal's portal
- options: [ModalOptions](#options) | null - when modal's open will return its options otherwise will return null


### UseModal


### Other type
- ModalCloseFunc: () => void
- ModalBaseProps:
  - closeModal: [ModalCloseFunc](#other-type) - function passed to every modal that allows to close it 


## Examples
### With props
```tsx
import { useModal, ModalBaseProps } from '@yet3/use-modal';

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
```
## With modalWrapper
```tsx
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
```