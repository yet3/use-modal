import { ModalOptions, UseModalHookOptions } from '../types';
import { UseModal } from '../UseModal';

const getPortalElement = <P>(hOptions: UseModalHookOptions<P>, mOptions?: ModalOptions<P> | null) => {
  if (mOptions?.portalElement) return mOptions.portalElement;
  if (hOptions.portalElement) return hOptions.portalElement;
  return UseModal.options.portalElement;
};

export { getPortalElement };
