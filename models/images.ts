export interface IImage {
    id: string,
    name: string,
    product_id: string,
};

export interface IImagePostRequest {
    name: string,
    product_id: string,
};

export interface IImagePostResponse {
    id: string,
    status: number,
    statusMessage: string,
};
