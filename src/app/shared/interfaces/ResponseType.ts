

export interface ResponseHttp<T> {
    error: Partial<Error> | null ;
    isSuccess: boolean,
    value: T ;
}

export interface Warning {
    data: Partial<Error> ;
    IsSucess: boolean;
}

interface Error {
    message: string;
    name: string;
}