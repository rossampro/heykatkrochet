export interface IPlushie {
    id: string,
    name: string,
    description: string,
    price: number,
    image: string,
    size: string,
    quantity: number,
    templateCredit: string,
    createdAt: number,
    updatedAt: number
};

export interface IPlushiePost {
    name: string,
    description: string,
    price: number,
    image: string,
    size: string,
    quantity: number,
    templateCredit: string
};

export interface IPlushiePostResponse {
    id: string,
    status: number,
    message: string
}

export interface IPlushieErrorResponse {
    status: number,
    message: string
}
