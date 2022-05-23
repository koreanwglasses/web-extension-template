import { Configuration } from "webpack";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

const baseConfig: Configuration = {
  entry: {
    background: "./src/background/index.ts",
    content: "./src/content/index.ts",
    popup: "./src/popup/index.tsx",
  },
  externals: { jquery: "$" },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};

const devConfig: Configuration = {
  ...baseConfig,
  mode: "development",
  devtool: "source-map",
};
const prodConfig: Configuration = {
  ...baseConfig,
  mode: "production",
};

const config = (env: any, argv: any) =>
  argv.mode === "development" ? devConfig : prodConfig;

export default config;
