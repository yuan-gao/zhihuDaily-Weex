/**
 * Created by exolution on 17/1/6.
 */
const WebpackBuilder = require('./WebpackBuilder')
const fs = require('fs')
const pathTool = require('path')
const webpack = require('webpack')
const BannerPlugin = require('../plugin/WebpackBannerPlugin')
const ext2framework = {
    '.vue': 'Vue',
    '.we': 'Weex',
    '.js': 'Vue'
}
function loadModulePath(moduleName, extra) {
    try {
        var path = require.resolve(pathTool.join(moduleName, extra || ''))
        return path.slice(0, path.indexOf(moduleName) + moduleName.length)
    } catch (e) {
        return moduleName
    }
}
let defaultExt = ['we', 'vue', 'js']
class WeexBuilder extends WebpackBuilder {
    constructor(source, dest, options = {}) {
        if (options.ext && typeof options.ext === 'string') {
            options.ext = options.ext.split(/,|\|/).filter(e=>defaultExt.indexOf(e) === -1).concat(defaultExt).join('|')
        }
        else {
            options.ext = defaultExt.join('|')

        }
        super(source, dest, options)
    }

    initConfig() {
        super.initConfig()
        this.config.entry = this.source.map(s=>s + '?entry=true')
        var bannerPlugin = new BannerPlugin(function (file) {
            let ext = pathTool.extname(file)
            return '// { "framework": "' + ext2framework[ext] + '" }'
        })

        this.config.module.loaders.push({
            test: /\.js(\?[^?]+)?$/,
            loader: loadModulePath('babel-loader'),
            exclude: /node_modules/
        })
        this.config.babel = {
            presets: [loadModulePath('babel-preset-es2015')],
            plugins: [
                loadModulePath('babel-plugin-transform-runtime'),
                loadModulePath('babel-plugin-add-module-exports')
            ],
            babelrc:false
        }
        let weexLoader = loadModulePath('weex-loader')
        let vueLoader = loadModulePath('vue-loader')

        this.config.module.loaders.push({
            test: /\.we(\?[^?]+)?$/,
            loader: weexLoader
        })
        if (this.options.web) {
            this.config.module.loaders.push({
                test: /\.vue(\?[^?]+)?$/,
                loader: vueLoader
            })
        }
        else {
            this.config.module.loaders.push({
                test: /\.vue(\?[^?]+)?$/,
                loader: weexLoader
            })
        }
        this.config.resolveLoader = {
            root: pathTool.dirname(weexLoader)
        }
        this.config.resolve = {
            alias: {
                'babel-runtime': loadModulePath('babel-runtime', 'core-js'),
                'babel-polyfill': loadModulePath('babel-polyfill'),
            }
        }
        this.config.plugins.push(bannerPlugin)
        if (this.options.onProgress) {
            this.config.plugins.push(new webpack.ProgressPlugin(this.options.onProgress))
        }
    }
}
module.exports = WeexBuilder

