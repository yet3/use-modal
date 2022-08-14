import { ModalData, ModalOptions, UseModalHookOptions } from '../types';
import { UseModal } from '../UseModal';

const mergeOptions = <P>(hOptions: UseModalHookOptions<P>, mOptions?: ModalOptions<P> | null) => {
  return {
    ...UseModal.options,
    ...hOptions,
    ...mOptions,
    props: { ...hOptions.props, ...mOptions?.props },
  } as ModalData<P>;
};

export { mergeOptions };
