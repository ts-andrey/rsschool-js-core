import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '6be529d985bf49e09c27ba3b4257cba7', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
