module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            externals: ['bindings', 'nfc-pcsc']
        },
    },
}