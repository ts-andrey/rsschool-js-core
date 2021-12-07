import News from './news/news';
import Sources from './sources/sources';
import { IData } from './../interface/interface';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IData) {
        const values = data?.articles || [];
        this.news.draw(values);
    }

    drawSources(data: IData) {
        const values = data?.sources || [];
        this.sources.draw(values);
    }
}

export default AppView;
