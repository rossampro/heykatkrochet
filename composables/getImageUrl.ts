/**
 * Dynamically gets an image url for images within the Assets Directory
 * @param {string} name
 * @returns {string}
 */
export default function getImageUrl(name: string, meta: string): string {
    return new URL(`../assets/images/${name}`, meta).href;
}
