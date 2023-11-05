import { products } from "~/drizzle/schema"
export interface IPlushie {
    id: string,
    name: string,
    description: string,
    lowerPrice: number,
    upperPrice: number | null,
    size: string,
    quantity: number,
    templateCredit: string,
    createdAt: number,
    updatedAt: number
};

export interface IPlushiePost {
    name: string,
    description: string,
    lowerPrice: number,
    upperPrice: number,
    size: string,
    quantity: number,
    templateCredit: string
};

export interface IPlushiePostResponse {
    id: string,
    status: number,
    message: string
}

export type IPlushiePut = typeof products.$inferInsert;
