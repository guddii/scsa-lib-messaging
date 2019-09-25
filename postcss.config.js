module.exports = {
    plugins: [
        require("autoprefixer"),
        require("postcss-import"),
        require("cssnano")
    ],
    browsers: ["> 0.25%", "ie >= 11"]
};
