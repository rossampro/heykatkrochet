export class PlushieErrorResponse extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
};

export class ImageErrorResponse extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}
