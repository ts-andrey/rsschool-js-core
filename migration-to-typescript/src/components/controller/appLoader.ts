import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '887c3596c2064c218f7efa45e150baca', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
