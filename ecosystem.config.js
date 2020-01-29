module.exports = {
  apps: [{
    script: "server.js",
    // Delay between restart
    watch_delay: 1000,
    ignore_watch : ["node_modules", "./json.sqlite"],
    watch_options: {
      "followSymlinks": false
    }
  }]
}