import mixpanel from 'mixpanel-browser';


class Mixpanel {
    constructor() {
        if (process.env.NODE_ENV === 'production') {
            mixpanel.init('87bd792ed0bb2f5e6767071887c161dd', {debug: true});
        }
    }

    track(event, props = {}) {
        if (process.env.NODE_ENV === 'production') {
            mixpanel.track(event, props);
        }
    }
}

export default new Mixpanel();