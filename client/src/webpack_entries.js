SPA = [
    {
        "filename": "spa_demo",
        "dependencies": {}
    }
]

SSR = [
    {
        "filename": "index_demo",
        "dependencies": {
            "js": ["index_index"],
            "css": ["index_index"]
        }
    }
]

module.exports = SPA.concat(SSR)