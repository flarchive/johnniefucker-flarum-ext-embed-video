app.initializers.add('johnniefucker-embed-video', app => {
    app.extensionData.for('johnniefucker-embed-video')
        .registerSetting(
            {
                setting: 'johnniefucker-embed-video.admin.settings.video_type.flv',
                label: app.translator.trans('johnniefucker-embed-video.admin.settings.video_types.flv'),
                type: 'boolean'
            }
        )
        .registerSetting(
            {
                setting: 'johnniefucker-embed-video.admin.settings.video_type.hls',
                label: app.translator.trans('johnniefucker-embed-video.admin.settings.video_types.hls'),
                type: 'boolean'
            }
        )
        .registerSetting(function () {
            return [
                m('.Form-group', [
                    m('label', app.translator.trans('johnniefucker-embed-video.admin.settings.options.theme')),
                    m('input', {
                        type: 'text',
                        class: 'FormControl',
                        bidi: this.setting('johnniefucker-embed-video.admin.settings.options.theme'),
                        placeholder: '#b7daff'
                    })
                ])
            ]
        })
        .registerSetting(
            {
                setting: 'johnniefucker-embed-video.admin.settings.options.logo',
                label: app.translator.trans('johnniefucker-embed-video.admin.settings.options.logo'),
                type: 'text'
            }
        )
        .registerSetting(
            {
                setting: 'johnniefucker-embed-video.admin.settings.options.lang',
                label: app.translator.trans('johnniefucker-embed-video.admin.settings.options.lang'),
                type: 'select',
                options: {
                    en: 'English',
                    'zh-cn': 'Chinese Simplified',
                    'zh-tw': 'Chinese Traditional'
                },
                default: 'en'
            }
        )
        .registerSetting(
            {
                setting: 'johnniefucker-embed-video.admin.settings.options.airplay',
                label: app.translator.trans('johnniefucker-embed-video.admin.settings.options.airplay'),
                type: 'boolean'
            }
        )
        .registerSetting(
            {
                setting: 'johnniefucker-embed-video.admin.settings.options.hotkey',
                label: app.translator.trans('johnniefucker-embed-video.admin.settings.options.hotkey'),
                type: 'boolean'
            }
        )
        .registerSetting(
            {
                setting: 'johnniefucker-embed-video.admin.settings.options.quality_switching',
                label: app.translator.trans('johnniefucker-embed-video.admin.settings.options.quality_switching'),
                type: 'boolean'
            }
        )
        .registerPermission(
            {
                icon: 'fas fa-tag',
                label: app.translator.trans('johnniefucker-embed-video.admin.settings.permissions.can_create_video_player'),
                permission: 'johnniefucker.embedvideo.create',
            },
            'start',
            95
        );
});
