import { IUseModal } from './types';

export const UseModal: IUseModal = function () {};

UseModal.options = {
  portalElement: typeof document === 'undefined' ? null : document.body,
};

UseModal.resetOptions = function () {
  this.options = {
    portalElement: typeof document === 'undefined' ? null : document.body,
  };
};

UseModal.setOptions = function (opts) {
  this.options = { ...this.options, ...opts };
};

UseModal.setPortalElement = function (element) {
  if (!element) return;
  this.options.portalElement = element;
};
