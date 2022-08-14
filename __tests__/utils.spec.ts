import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { UseModal } from '../src/UseModal';
import { useModal } from '../src/useModal.hook';
import { Modal } from './modal';

describe('utils', () => {
  beforeAll(() => {
    UseModal.resetOptions();
  });

  it('options merging', () => {
    UseModal.setOptions({ closeAfter: 3000, startOpen: true, portalElement: document.body });
    const modalsDiv = document.createElement('div');
    modalsDiv.id = 'modals';
    document.body.appendChild(modalsDiv);

    const { result, unmount } = renderHook(() => useModal(Modal));
    expect(result.current.isOpen).toBe(true);
    expect(result.current.component).not.toBeNull();
    expect(result.current.options).toMatchObject({ closeAfter: 3000, startOpen: true });
    expect((result.current.options?.portalElement as HTMLDivElement).nodeName).toBe('BODY');

    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.component).toBeNull();

    act(() => result.current.open({ closeAfter: 333, portalElement: document.getElementById('modals') }));
    expect(result.current.isOpen).toBe(true);
    expect(result.current.component).not.toBeNull();
    expect(result.current.options).toMatchObject({ closeAfter: 333, startOpen: true });
    expect((result.current.options?.portalElement as HTMLDivElement).id).toBe('modals');

    unmount();

    const { result: result2, unmount: unmount2 } = renderHook(() =>
      useModal(Modal, { closeAfter: 2500, startOpen: false, portalElement: document.getElementById('modals') })
    );
    expect(result2.current.isOpen).toBe(false);
    expect(result2.current.component).toBeNull();
    act(() => result2.current.open());
    expect(result2.current.options).toMatchObject({ closeAfter: 2500, startOpen: false });
    expect((result2.current.options?.portalElement as HTMLDivElement).id).toBe('modals');

    unmount2();

    UseModal.resetOptions();
  });
});
