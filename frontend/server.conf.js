const PROXY_CONFIG = [
    {
        context: [
            "/server.json"
        ],
        target: "http://localhost:8090",
        secure: false
    },
    {
        context: [
            "/api/events",
            "/api/events/",
        ],
        target: "http://127.0.0.1:8080",
        //target: "http://google.es",
        secure: false
    }
]

module.exports = PROXY_CONFIG;