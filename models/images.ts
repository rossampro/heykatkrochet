import { images } from "~/drizzle/schema"
export interface IImage {
    id: string,
    name: string,
    productId: string,
};

export interface IImagePostRequest {
    name: string,
    productId: string,
};

export interface IImagePostResponse {
    id: string,
    status: number,
    statusMessage: string,
};

export interface IImageGetRequest {
    productId: string
};

export type DbImage = typeof images.$inferSelect;
