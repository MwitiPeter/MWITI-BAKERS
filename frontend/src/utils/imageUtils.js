/**
 * Preload critical images
 * @param {string[]} imageSrcs - Array of image sources to preload
 */
export const preloadImages = (imageSrcs) => {
  if (typeof window === 'undefined') return;

  imageSrcs.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};
