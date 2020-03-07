SPA = [
    // {
    //     "filename": "spa_demo",
    //     "dependencies": {}
    // }
]

SSR = [
    {
        "filename": "index_index",
        "dependencies": {
            "js": ["index_index"],
            "css": ["index_index"]
        }
    },
    {
        "filename": "pixel_demo",
        "dependencies": {
            "js": [],
            "css": ["pixel_demo"]
        }
    }
]

module.exports = SPA.concat(SSR)