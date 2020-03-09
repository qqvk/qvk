SPA = [
    {
        entry: 'spademo'
    }
]

SSR = [
    {
        entry: 'ssrdemo',
        dependencies: {
            js: ['index_index'],
            css: ['index_index']
        }
    }
]

exports.SPA = SPA
exports.SSR = SSR