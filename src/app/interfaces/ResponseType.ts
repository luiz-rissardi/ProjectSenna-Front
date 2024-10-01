

export interface ResponseHttp {
    error: Error | null ;
    isSuccess: boolean,
    value: any;
}

export interface Warning {
    error: Error;
    IsSucess: boolean;
}

interface Error {
    message: string;
    name: string;
}