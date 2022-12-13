import path from 'path';

import SentryWebpackPlugin from '@sentry/webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration, DefinePlugin, ExternalsPlugin } from 'webpack';

import pack from './package.json';

const dependencies = Object.keys(pack.dependencies);

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const releaseVersion = pack.version;

const sentryPlugin = new SentryWebpackPlugin({
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: 'shivase',
  project: 'obsidian-textlint',
  release: releaseVersion,
  ignore: ['node_modules', 'webpack.config.ts'],
  include: 'dist',
});

const config: Configuration = {
  context: __dirname,
  entry: {
    main: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
    clean: true,
  },
  target: 'node',
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /textlint-worker\.js$/i,
        loader: 'worker-loader',
        options: {
          esModule: false,
          inline: 'no-fallback',
        },
      },
    ],
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {},
      }),
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './manifest.json',
          to: '.',
        },
      ],
    }),
    new DefinePlugin({
      PACKAGE_NAME: JSON.stringify(pack.name),
      VERSION: JSON.stringify(releaseVersion),
      PRODUCTION: JSON.stringify(isProduction),
    }),
    new ExternalsPlugin('commonjs', dependencies),
    ...(isProduction ? [sentryPlugin] : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
    mainFields: ['browser', 'module', 'main'],
  },
};

export default config;
