/**
 * Generate screenshot URL from project link using image.thum.io
 * @param url - Project URL
 * @param width - Screenshot width
 * @param height - Screenshot height
 * @param quality - Image quality (1-100, default: 90)
 * @param fullPage - Whether to capture full page (default: false)
 * @returns Screenshot URL
 */
export const getScreenshotUrl = (
  url: string, 
  width: number, 
  height: number,
  quality: number = 90,
  fullPage: boolean = false
): string => {
  // Using image.thum.io for screenshots (free tier available)
  // Alternative services: screenshotapi.net, urlbox.io
  const qualityParam = quality < 100 ? `&quality=${quality}` : '';
  const fullPageParam = fullPage ? '&fullpage=true' : '';
  return `https://image.thum.io/get/width/${width}/height/${height}/crop/true/noanimate/noads${fullPageParam}${qualityParam}/${url}`;
};

/**
 * Generate high-quality screenshot URL optimized for portfolio
 * @param url - Project URL
 * @param width - Screenshot width (default: 1280)
 * @param height - Screenshot height (default: 720)
 * @returns Optimized screenshot URL
 */
export const getPortfolioScreenshot = (
  url: string,
  width: number = 1280,
  height: number = 720
): string => {
  return getScreenshotUrl(url, width, height, 95, false);
};

/**
 * Generate multiple screenshot URLs for gallery with different viewports
 * @param url - Project URL
 * @returns Array of screenshot URLs with different sizes
 */
export const getScreenshotGallery = (url: string): string[] => {
  // Generate screenshots for different viewport sizes to show responsive design
  const screenshots: string[] = [
    getPortfolioScreenshot(url, 1920, 1080), // Desktop full HD
    getPortfolioScreenshot(url, 1280, 720),  // Desktop HD
    getPortfolioScreenshot(url, 768, 1024),  // Tablet portrait
  ];
  return screenshots;
};

/**
 * Generate responsive screenshot URLs for different device sizes
 * @param url - Project URL
 * @returns Object with screenshots for different viewports
 */
export const getResponsiveScreenshots = (url: string) => {
  return {
    desktop: getPortfolioScreenshot(url, 1920, 1080),
    tablet: getPortfolioScreenshot(url, 1024, 768),
    mobile: getPortfolioScreenshot(url, 375, 667),
    thumbnail: getPortfolioScreenshot(url, 400, 300),
  };
};

