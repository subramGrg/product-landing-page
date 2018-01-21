const path = require("path");

module.exports = {
    entry: "./app/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "react"],
                    },
                }],
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [ "style-loader", "css-loader", "sass-loader" ],
            }
        ],
    },
};
