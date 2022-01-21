import viewportAction from '$lib/functions/intersectionObserver';

export default function lazyImage(element) {
  const viewportActionMethods = viewportAction(element);
  element.addEventListener('enterViewport', enterViewport);

  function enterViewport() {
    element.src = element.dataset.src;
    element.removeEventListener('enterViewport', enterViewport);
  }

  return {
    destroy() {
      viewportActionMethods.destroy();
      element.removeEventListener('enterViewport', enterViewport);
    },
  };
}
