import {extend} from 'flarum/common/extend';
import Button from 'flarum/forum/components/Button';
import CommentPost from 'flarum/forum/components/CommentPost';
import TextEditor from 'flarum/forum/components/TextEditor';

import {playerData, extensions, playerCSS} from './extensions';
import EmbedVideoModal from './components/EmbedVideoModal';

app.initializers.add('johnniefucker-embed-video', app => {
    extend(TextEditor.prototype, 'controlItems', function (items) {
        if (!app.forum.attribute('embedVideoCreate')) {
            return;
        }

        const editor = this.attrs.composer.editor;

        items.add(
            'JohnniefuckerEmbedVideo',
            m(Button, {
                icon: 'fas fa-video',
                class: 'Button Button--icon',
                onclick: () => app.modal.show(EmbedVideoModal, {editor: editor}),
                oncreate: vnode => $(vnode.dom).tooltip()
            }, app.translator.trans('johnniefucker-embed-video.forum.button_tooltip_title'))
        );
    });

    const loadPlayers = containers => {
        for (const p of containers) {
            const videoUrl = p.dataset.url;
            const videoType = p.dataset.type;
            const liveMode = p.dataset.live;
            const qualities = p.dataset.qualities;

            let qualitySwitching = [];

            if (qualities) {
                if (videoUrl) {
                    qualitySwitching.push({
                        name: 'default',
                        url: videoUrl,
                        type: videoType
                    });
                }

                qualities.split(',').forEach(q => {
                    const qData = q.split(';');
                    qualitySwitching.push({
                        name: qData[0],
                        url: qData[1],
                        type: qData.length < 3 ? 'auto' : qData[2]
                    });
                });
            }

            const isQualitySwitching = app.forum.attribute('embedVideoQualitySwitching') && qualitySwitching.length > 0;

            new DPlayer({
                element: p,
                live: liveMode === 'true' ? true : false,
                theme: app.forum.attribute('embedVideoTheme') || '#b7daff',
                logo: app.forum.attribute('embedVideoLogo') || '',
                lang: app.forum.attribute('embedVideoLang') || '',
                airplay: app.forum.attribute('embedVideoAirplay') || false,
                hotkey: app.forum.attribute('embedVideoHotkey') || false,
                preload: 'auto',
                autoplay: false,
                video: !isQualitySwitching ? {
                    url: videoUrl,
                    type: videoType
                } : {quality: qualitySwitching, defaultQuality: 0}
            });
        }
    };

    const loadScript = extension => {
        return new Promise(resolve => {
            const script = document.createElement('script');
            script.src = extension.url;
            script.onload = resolve;
            document.body.appendChild(script);
        });
    };
    const loadCSS = playerCSS => {
        return new Promise(resolve => {
            let head = document.getElementsByTagName('head').item(0);
            const css = document.createElement('link');
            css.href = playerCSS.url;
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.onload = resolve;
            head.appendChild(css);
        });
    }

    extend(CommentPost.prototype, 'oncreate', function () {
        const containers = this.element.querySelectorAll('.dplayer-container');

        if (containers.length) {
            const cssPromise = new Promise(resolveCSS => {
                if (playerCSS.loaded) {
                    const interval = setInterval(async () => {
                        if (window.DPlayer) {
                            clearInterval(interval);
                            resolveCSS();
                        }
                    }, 1000);
                } else {
                    playerCSS.loaded = true;
                    loadCSS(playerCSS).then(() => resolveCSS());
                }
                resolveCSS();
            });

            const extensionsPromise = new Promise(resolveExtensions => {
                let flag = 0;
                let len = extensions.length;
                for (let i = 0; i < len; i++) {
                    let ex = extensions[i];
                    if (ex.loaded) {
                        const interval = setInterval(async () => {
                            if (ex.window) {
                                clearInterval(interval);
                            }
                        }, 1000);
                        flag++;
                        if (flag === len) {
                            resolveExtensions();
                        }
                    } else {
                        ex.loaded = true;
                        loadScript(ex).then(() => {
                            flag++;
                            if (flag === len) {
                                resolveExtensions();
                            }
                        });
                    }
                }
            });
            const initPlayer = new Promise(resolve => {
                if (playerData.loaded) {
                    const interval = setInterval(async () => {
                        if (window.DPlayer) {
                            clearInterval(interval);
                            resolve();
                        }
                    }, 1000);
                } else {
                    playerData.loaded = true;
                    loadScript(playerData).then(() => resolve());
                }
            });

            cssPromise.then(() => extensionsPromise.then(() => initPlayer.then(() => loadPlayers(containers))));

        }
    });
});
