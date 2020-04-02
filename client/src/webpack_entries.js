SPA = [
    {
        entry: 'vuedemo',
        lib: 'vue'
    },
    {
        entry: 'sveltedemo',
        lib: 'svelte'
    },
    {
        entry: 'reactdemo',
        lib: 'react'
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