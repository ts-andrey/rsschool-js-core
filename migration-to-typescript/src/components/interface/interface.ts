export type dataArticle = {
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
};

export type dataSource = {
    id: null | string;
    name: string;
};

export interface IData {
    articles: Array<dataArticle>;
    sources: Array<dataSource>;
}

export type callbackType<T> = (data: T) => void;
