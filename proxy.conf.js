const PROXY_CONFIG = [
    {
        context: [
            "/auth",
            "/ds",
            "/ums"
        ],
        target: "https://8e8f83fa-48e5-46ea-8037-3917c0450383.app.jexia.com",
        secure: false,
        changeOrigin: true,
    }
]
 
module.exports = PROXY_CONFIG;
