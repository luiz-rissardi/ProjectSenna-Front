

export interface ResponseHttp {
    error: Partial<Error> | null ;
    isSuccess: boolean,
    value: any;
}

export interface Warning {
    error: Partial<Error> ;
    IsSucess: boolean;
}

interface Error {
    message: string;
    name: string;
}