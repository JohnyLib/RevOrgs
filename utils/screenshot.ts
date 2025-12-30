/**
 * Utility functions for generating real-time website screenshots
 */

/**
 * Generates a screenshot URL from a website link using a screenshot service
 * @param url - The website URL to screenshot
 * @param width - Screenshot width (default: 1200)
 * @param height - Screenshot height (default: 800)
 * @returns Screenshot URL
 */
export const getScreenshotUrl = (
  url: string,
  width: number = 1200,
  height: number = 800
): string => {
  if (!url) return '';
  
  // Encode the URL
  const encodedUrl = encodeURIComponent(url);
  
  // Using image.thum.io service (free tier available)
  // Alternative: You can use other services like screenshotapi.net, urlbox.io, etc.
  return `https://image.thum.io/get/width/${width}/height/${height}/noanimate/${url}`;
};

/**
 * Generates multiple screenshot URLs for a gallery
 * @param baseUrl - The base website URL
 * @param count - Number of screenshots to generate (default: 3)
 * @returns Array of screenshot URLs
 */
export const getScreenshotGallery = (
  baseUrl: string,
  count: number = 3
): string[] => {
  if (!baseUrl) return [];
  
  // Generate variations by adding different paths or query params
  // For now, we'll use the same URL but you can customize this
  return Array.from({ length: count }, () => getScreenshotUrl(baseUrl));
};

/**
 * Alternative screenshot service using screenshotapi.net
 * Requires API key - uncomment and add your API key if needed
 */
export const getScreenshotUrlAlt = (
  url: string,
  apiKey?: string,
  width: number = 1200,
  height: number = 800
): string => {
  if (!url || !apiKey) return '';
  
  const encodedUrl = encodeURIComponent(url);
  return `https://api.screenshotapi.net/screenshot?url=${encodedUrl}&width=${width}&height=${height}&apiKey=${apiKey}`;
};

