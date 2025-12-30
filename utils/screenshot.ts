/**
 * Generate screenshot URL from project link using image.thum.io
 * @param url - Project URL
 * @param width - Screenshot width
 * @param height - Screenshot height
 * @returns Screenshot URL
 */
export const getScreenshotUrl = (url: string, width: number, height: number): string => {
  // Using image.thum.io for screenshots (free tier available)
  // Alternative services: screenshotapi.net, urlbox.io
  return `https://image.thum.io/get/width/${width}/height/${height}/crop/true/noanimate/noads/${url}`;
};

/**
 * Generate multiple screenshot URLs for gallery
 * @param url - Project URL
 * @param count - Number of screenshots to generate
 * @returns Array of screenshot URLs
 */
export const getScreenshotGallery = (url: string, count: number): string[] => {
  const screenshots: string[] = [];
  for (let i = 0; i < count; i++) {
    // Generate screenshots with same dimensions for gallery
    screenshots.push(getScreenshotUrl(url, 1200, 800));
  }
  return screenshots;
};

