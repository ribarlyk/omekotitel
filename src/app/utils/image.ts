/**
 * Magento serves resized images from a cache path like:
 * /pub/media/catalog/product/cache/<hash>/path/to/image.jpg
 *
 * Stripping the cache segment gives the original full-size image,
 * which Next.js <Image> will then optimise on its own.
 */
export function magentoImageUrl(url: string): string {
  return url.replace(/\/cache\/[a-f0-9]{32}\//, "/");
}
