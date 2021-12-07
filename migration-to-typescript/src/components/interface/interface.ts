export interface IDataArticle {
    source: {
        id: null | string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface IDataSource {
    id: null | string;
    name: string;
}

export interface IData {
    articles: IDataArticle[];
    sources: IDataSource[];
}

export type callbackType<T> = (data: T) => void;
