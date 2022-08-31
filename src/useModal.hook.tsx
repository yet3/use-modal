import {
  cloneElement,
  createElement,
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ModalOptions, Props, UseModalHookOptions, UseModalResult } from './types';
import { getPortalElement } from './utils/getPortalElement.util';
import { mergeOptions } from './utils/mergeOptions.util';

const useModal = <T extends FunctionComponent<any>>(modal: T, hOptions: UseModalHookOptions<Props<T>> = {}) => {
  type Opts = ModalOptions<Props<T>>;

  const [modalData, setModalData] = useState<null | Opts>();
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const opts = mergeOptions(hOptions);

    if (opts.startOpen) {
      handleOpen();
    }

    return () => {
      if (closeTimeout.current != null) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  const handleOpen = (options?: Opts | null) => {
    if (closeTimeout.current != null) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }

    const opts = mergeOptions(hOptions, options);
    setModalData({ ...opts });

    if (opts.closeAfter && opts.closeAfter > 0) {
      closeTimeout.current = setTimeout(() => {
        handleClose();
        closeTimeout.current = null;
      }, opts.closeAfter);
    }
  };

  const handleClose = () => {
    setModalData(null);
  };

  const component = useMemo(() => {
    if (!modalData) return null;

    const portalEl = getPortalElement(hOptions, modalData);
    if (!portalEl) return null;

    const backdropColor = modalData.backdropColor || 'rgba(0, 0, 0, 0.7)';

    let el;
    if (!modalData.modalWrapper) el = createElement(modal, { ...modalData.props, closeModal: handleClose });
    else {
      if (typeof modalData.modalWrapper === 'function') {
        el = modalData.modalWrapper(createElement(modal, { ...modalData.props, closeModal: handleClose }), {
          backdropColor,
        });
      } else {
        el = cloneElement(
          modalData.modalWrapper,
          undefined,
          createElement(modal, { ...modalData.props, closeModal: handleClose })
        );
      }
    }

    if (modalData.backdrop ?? true) {
      let shouldCloseOnClick = modalData.closeOnBackdropClick ?? true;
      if (modalData.closeOnBackdropClick == null && modalData.onBackdropClick) shouldCloseOnClick = false;

      let backdrop: JSX.Element;
      if (!modalData.backdrop || modalData.backdrop === true) {
        backdrop = (
          <div
            onClick={() => {
              if (typeof modalData.onBackdropClick === 'function') {
                modalData.onBackdropClick({ closeModal: handleClose });
              }

              if (shouldCloseOnClick) handleClose();
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: backdropColor,
              ...modalData.backdropStyle,
            }}
          />
        );
      } else {
        if (typeof modalData.backdrop === 'function') {
          backdrop = modalData.backdrop({
            backdropColor,
            closeOnBackdropClick: shouldCloseOnClick,
            onBackdropClick: modalData.onBackdropClick,
            backdropStyle: modalData.backdropStyle,
          });
        } else {
          backdrop = cloneElement(modalData.backdrop, {
            backdropColor,
            closeOnBackdropClick: shouldCloseOnClick,
            onBackdropClick: modalData.onBackdropClick,
            backdropStyle: modalData.backdropStyle,
          });
        }
      }
      backdrop = cloneElement(backdrop, { 'data-backdrop': true });

      return createPortal(
        <div>
          {backdrop}
          {el}
        </div>,
        portalEl
      );
    }

    return createPortal(el, portalEl);
  }, [
    modalData != null,
    modalData?.closeAfter,
    modalData?.backdropColor,
    modalData?.backdrop,
    modalData?.modalWrapper,
    modalData?.props,
    modalData?.portalElement,
  ]);

  const isOpen = modalData != null;
  return {
    isOpen,
    open: handleOpen,
    close: handleClose,
    toggle: (options) => (isOpen ? handleClose() : handleOpen(options)),
    component,
    options: isOpen ? modalData : null,
  } as UseModalResult<Opts>;
};

export { useModal };
