export const playerData = {
    url: 'https://cdn.bootcdn.net/ajax/libs/dplayer/1.9.1/DPlayer.min.js',
    loaded: false
};

export const playerCSS = {
    url: 'https://cdn.bootcdn.net/ajax/libs/dplayer/1.9.1/DPlayer.min.css',
    loaded: false
};

export const extensions = [
    {
        attributeName: 'Flv',
        url: 'https://cdn.bootcdn.net/ajax/libs/flv.js/1.5.0/flv.min.js',
        loaded: false,
        window: window.FlvJs
    },
    {
        attributeName: 'Hls',
        url: 'https://cdn.bootcdn.net/ajax/libs/hls.js/1.0.0-rc.5.0.canary.6993/hls.min.js',
        loaded: false,
        window: window.Hls
    }
];
