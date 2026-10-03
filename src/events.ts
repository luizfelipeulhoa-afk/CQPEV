/**
 * Helpers de eventos globais: toast e cortina de transição.
 */

export interface ToastPayload {
  message: string;
  type?: 'info' | 'success';
}

export function showToast(message: string, type: 'info' | 'success' = 'info') {
  window.dispatchEvent(
    new CustomEvent<ToastPayload>('cqpev-toast', { detail: { message, type } })
  );
}

export interface CurtainPayload {
  callback: () => void;
}

export function triggerCurtain(callback: () => void) {
  window.dispatchEvent(
    new CustomEvent<CurtainPayload>('cqpev-curtain', { detail: { callback } })
  );
}
