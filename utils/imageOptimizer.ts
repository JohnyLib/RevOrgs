/**
 * Image optimization utilities
 */

/**
 * Generate optimized image URL with size parameters
 */
export const getOptimizedImageUrl = (
  url: string,
  width?: number,
  quality: number = 80
): string => {
  if (!url) return '';
  
  // If it's an Unsplash URL, add optimization parameters
  if (url.includes('unsplash.com')) {
    const urlObj = new URL(url);
    if (width) {
      urlObj.searchParams.set('w', width.toString());
    }
    urlObj.searchParams.set('q', quality.toString());
    urlObj.searchParams.set('auto', 'format');
    urlObj.searchParams.set('fit', 'crop');
    return urlObj.toString();
  }
  
  // For other URLs, return as-is (screenshot services handle their own optimization)
  return url;
};

/**
 * Get responsive image sizes
 */
export const getImageSizes = (): string => {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
};

/**
 * Generate srcset for responsive images
 */
export const generateSrcSet = (
  baseUrl: string,
  widths: number[] = [400, 800, 1200, 1600]
): string => {
  return widths
    .map(width => `${getOptimizedImageUrl(baseUrl, width)} ${width}w`)
    .join(', ');
};

