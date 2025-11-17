const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { execSync } = require("child_process");
const webpack = require("webpack");
const pkg = require("./package.json");

// Compute commit hash and build date
const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
const buildDate = new Date().toISOString();

// Base config that applies to either development or production mode.
const config = {
  entry: './src/index.tsx',
  output: {
    // Compile the source files into a bundle.
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // Enable webpack-dev-server to get hot refresh of the app.
  devServer: {
    static: './build',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // Load CSS files. They can be imported into JS files.
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // Generate the HTML index page based on our template.
    // This will output the same index page with the bundle we
    // created above added in a script tag.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

      new webpack.DefinePlugin({
          __APP_VERSION__: JSON.stringify(pkg.version),
          __BLOCKLY_VERSION__: JSON.stringify(pkg.dependencies["blockly"]),
          __PLUGIN_VERSION__: JSON.stringify(pkg.dependencies["@blockly/keyboard-navigation"]),
          __GIT_HASH__: JSON.stringify(commitHash),
          __BUILD_DATE__: JSON.stringify(buildDate),
      }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // Set the output path to the `build` directory
    // so we don't clobber production builds.
    config.output.path = path.resolve(__dirname, 'build');

    // Generate source maps for our code for easier debugging.
    // Not suitable for production builds. If you want source maps in
    // production, choose a different one from https://webpack.js.org/configuration/devtool
    config.devtool = 'eval-cheap-module-source-map';

    // Include the source maps for Blockly for easier debugging Blockly code.
    config.module.rules.push({
      test: /(blockly[/\\].*\.js)$/,
      use: [require.resolve('source-map-loader')],
      enforce: 'pre',
    });

    // Ignore spurious warnings from source-map-loader
    // It can't find source maps for some Closure modules and that is expected
    config.ignoreWarnings = [/Failed to parse source map.*blockly/];
  }
  return config;
};
