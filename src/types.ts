import { ComponentProps, CSSProperties, FunctionComponent, ReactNode, ReactPortal } from 'react';

export type Props<T extends FunctionComponent<any>> = Omit<ComponentProps<T>, 'closeModal'>;

export type PortalElement = Element | DocumentFragment;
export type ModalProps = Record<string, any>;

export interface IUseModal {
  options: UseModalOptions;
  setOptions(opts: Partial<UseModalOptions>): void;
  setPortalElement(element: PortalElement): void;
  resetOptions(): void;
}

export interface BackdropOptions {
  backdropColor: string;
  closeOnBackdropClick?: boolean
  onBackdropClick?: (d: {closeModal: ModalCloseFunc}) => void | null | false
  backdropStyle?: CSSProperties
}
export interface ModalWrapperOptions extends BackdropOptions { }

export interface CommonOptions {
  closeAfter?: null | false | number;
  portalElement?: PortalElement | null;

  backdropColor?: string | null | false;
  backdrop?: boolean | null | JSX.Element | ((opts: BackdropOptions) => JSX.Element);
  closeOnBackdropClick?: boolean
  onBackdropClick?: (d: {closeModal: ModalCloseFunc}) => void | null | false
  backdropStyle?: CSSProperties
  modalWrapper?: false | null | ((children: ReactNode, opts: ModalWrapperOptions) => JSX.Element) | JSX.Element;
}

export interface UseModalOptions extends CommonOptions {
  startOpen?: boolean;
}

export interface UseModalHookOptions<P extends ModalProps> extends CommonOptions {
  startOpen?: boolean;
  props?: Partial<P>;
}

export interface ModalOptions<P extends ModalProps> extends CommonOptions {
  props?: P;
}

export type ModalData<P extends ModalProps> = UseModalHookOptions<P> & ModalOptions<P> & UseModalOptions;

export type ModalCloseFunc = () => void;

export interface UseModalResult<O> {
  isOpen: boolean;
  open: (options?: O) => void;
  close: () => void;
  toggle: (options?: O) => void;
  component: ReactPortal | null;
  options: O | null;
}

export interface ModalBaseProps {
  closeModal: ModalCloseFunc;
}
