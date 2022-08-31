import { renderHook, act } from '@testing-library/react';
import { isValidElement, useState } from 'react';
import { UseModal } from '../src/UseModal';
import { useModal } from '../src/useModal.hook';

const Modal = () => {
  const hook = useState(false);
  return <div>Modal: {hook ? 'true' : 'false'}</div>;
};

describe('useModal hook', () => {
  beforeAll(() => {
    UseModal.resetOptions();
  });

  it('init with no options', () => {
    const { result, unmount } = renderHook(() => useModal(Modal));

    expect(result.current.isOpen).toEqual(false);
    expect(result.current.component).toBeNull();

    unmount();
  });

  it('opening and closing', () => {
    const { result, unmount } = renderHook(() => useModal(Modal));

    act(() => result.current.open());
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.component).not.toBeNull();

    act(() => result.current.close());
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.component).toBeNull();

    act(() => result.current.toggle());
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.component).not.toBeNull();

    act(() => result.current.toggle());
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.component).toBeNull();

    unmount();
  });

  it('closeModal prop', () => {
    const { result, unmount } = renderHook(() => useModal(Modal));

    act(() => result.current.open());
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.component).not.toBeNull();

    expect(isValidElement(result.current.component!.children)).toBe(true);
    const child = result.current.component!.children as JSX.Element;
    let closeModal: null | Function = null;
    if (child.props?.children) {
      child.props.children.some((c: JSX.Element) => {
        if (c.props?.closeModal) closeModal = c.props.closeModal
        return false;
      });
    }
    expect(closeModal).toEqual(expect.any(Function));
    act(() => closeModal!());
    expect(result.current.isOpen).toBe(false);

    unmount();
  });

  it('closeAfter option', async () => {
    UseModal.setOptions({ closeAfter: 600 });
    const { result, unmount } = renderHook(() => useModal(Modal, { closeAfter: 250 }));

    act(() => result.current.open());
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.component).not.toBeNull();

    await new Promise((r) => setTimeout(r, 300));
    expect(result.current.isOpen).toBe(false);
    expect(result.current.component).toBeNull();

    act(() => result.current.open({ closeAfter: 500 }));
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.component).not.toBeNull();

    await new Promise((r) => setTimeout(r, 300));
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.component).not.toBeNull();

    await new Promise((r) => setTimeout(r, 250));
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.component).toBeNull();

    unmount();

    const { result: result2, unmount: unmount2 } = renderHook(() => useModal(Modal));

    act(() => result2.current.open());
    expect(result2.current.isOpen).toEqual(true);
    expect(result2.current.component).not.toBeNull();

    await new Promise((r) => setTimeout(r, 300));
    expect(result2.current.isOpen).toEqual(true);
    expect(result2.current.component).not.toBeNull();

    await new Promise((r) => setTimeout(r, 350));
    expect(result2.current.isOpen).toEqual(false);
    expect(result2.current.component).toBeNull();

    unmount2();

    UseModal.resetOptions();
  });
});
