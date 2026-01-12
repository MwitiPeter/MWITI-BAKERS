/**
 * Image optimization utilities
 */

/**
 * Generate optimized image sources with WebP support
 * @param {string} src - Original image source
 * @returns {object} Object with src and srcSet for modern formats
 */
export const getOptimizedImageSrc = (src) => {
  if (!src || src.includes('placeholder')) {
    return { src, srcSet: null };
  }

  // Check if it's a Cloudinary URL
  const isCloudinary = src.includes('cloudinary.com');
  
  if (isCloudinary) {
    // For Cloudinary images, use their transformation API
    const webpSrc = src.replace('/upload/', '/upload/f_auto,q_auto/');
    return {
      src: webpSrc,
      srcSet: `${webpSrc} 1x, ${src.replace('/upload/', '/upload/f_auto,q_auto,dpr_2.0/')} 2x`,
    };
  }

  // For local images
  const extension = src.split('.').pop();
  const basePath = src.replace(`.${extension}`, '');
  
  return {
    src,
    srcSet: null, // Can be extended for local WebP conversion
  };
};

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

/**
 * Check if browser supports WebP
 * @returns {Promise<boolean>}
 */
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    const img = new Image();
    img.onload = () => resolve(img.width === 1);
    img.onerror = () => resolve(false);
    img.src = webP;
  });
};

/**
 * Lazy load images with Intersection Observer
 * @param {HTMLImageElement} img - Image element
 * @param {string} src - Image source
 */
export const lazyLoadImage = (img, src) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px', // Start loading 50px before entering viewport
    }
  );

  observer.observe(img);
};
