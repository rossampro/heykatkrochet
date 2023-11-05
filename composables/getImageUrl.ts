/**
 * Dynamically gets an image url for images within the Assets Directory
 * @param {string} name
 * @returns {string}
 */
export default function getImageUrl(name: string): string {
    return new URL(`../assets/images/${name}`, import.meta.url).href;
}
