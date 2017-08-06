/**
 * Created by exolution on 17/1/6.
 */
const pathTool = require('path')
const chalk = require('chalk')
const sourcer = require('sourcer')
const webpack = require('webpack')
const util = require('../util')
const _blank = '                                                            '
module.exports = class WebpackBuilder {
    constructor(source, dest, options = {}) {
        let root = options.root || process.cwd()
        this.sourceDef = source
        this.source = sourcer.find(root, source, {recursive: true})
        this.base = sourcer.base(source)
        if (options.ext) {
            let reg = new RegExp('\\.(' + options.ext + ')$')
            this.source = this.source.filter(s=>reg.test(pathTool.extname(s)))
        }

        this.dest = dest
        this.options = options
    }

    build(callback) {

        this.initConfig()
        if (this.source.length == 0) {
            return callback('no ' + (this.options.ext || '') + ' files found in source "' + this.sourceDef + '"')
        }
        let entry = {}
        this.config.entry.forEach((e)=> {
            let basename = pathTool.basename(e, pathTool.extname(e))
            let relative = pathTool.relative(this.base, pathTool.dirname(e))
            entry[pathTool.join(relative, basename).split('?')[0]] = e

        })
        this.config.entry = entry
        let lastHash = null
        webpack(this.config, (err, stats) => {
            if (err) {
                return callback && callback(err)
            }
            var jsonStats = stats.toJson({
                colors: {level: 2, hasBasic: true, has256: true, has16m: false},
                cached: false,
                cachedAssets: false,
                modules: true,
                chunks: false,
                reasons: false,
                errorDetails: true,
                chunkOrigins: false,
                exclude: ['node_modules', 'bower_components', 'jam', 'components']
            })
            if (jsonStats.hash && jsonStats.hash === lastHash) {
                return
            }
            lastHash = jsonStats.hash
            let errorString
            if (jsonStats.errors.length > 0) {
                errorString = '[webpack errors]\n' + jsonStats.errors.join('\n')
                return callback && callback(errorString, null, jsonStats)
            }
            let sizeMap = {}
            jsonStats.assets.forEach(e=> {
                sizeMap[e.name.split('.')[0]] = e.size
            })
            let result = Object.keys(this.config.entry).map((e)=> {
                return {
                    from: pathTool.join(this.base, e + pathTool.extname(this.config.entry[e].split('?')[0])),
                    to: pathTool.join(this.dest, typeof jsonStats.assetsByChunkName[e] === 'string' ? jsonStats.assetsByChunkName[e] : jsonStats.assetsByChunkName[e][0]),
                    size: sizeMap[e]
                }
            })

            result.toString = function () {
                let fromMaxLen = 0, toMaxLen = 0
                for (let i = 0; i < this.length; i++) {
                    let entry = this[i]
                    fromMaxLen = entry.from.length > fromMaxLen ? entry.from.length : fromMaxLen
                    toMaxLen = entry.to.length > toMaxLen ? entry.to.length : toMaxLen
                }
                return this.map(e=>'    ' + e.from + _blank.substr(0, fromMaxLen - e.from.length) + '   --> ' + _blank.substr(0, fromMaxLen / 4) + e.to + ' - ' + util.resolveSizeUnit(e.size)).join('\n')
            }
            callback && callback(errorString, result, jsonStats)
        })
    }


    initConfig() {
        let destExt = pathTool.extname(this.dest)
        let path, filename
        if (destExt && this.dest[this.dest.length - 1] !== '/') {
            path = pathTool.dirname(this.dest)
            filename = pathTool.basename(this.dest)
        }
        else {
            path = this.dest
            filename = '[name].js'
        }
        this.config = {
            entry: this.source.map(s=>s + (this.options.entry && pathTool.basename(s) == this.options.entry ? '?entry=true' : '')),
            output: {
                path: path,
                filename: filename
            },
            module: {
                loaders: []
            },
            plugins: []
        }

        if (this.options.min) {
            this.options.devtool = this.options.devtool ? 'source-map' : null
            this.config.plugins.push(
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }))
        }
        if (this.options.devtool) {
            this.config.devtool = this.options.devtool
        }
        if (this.options.watch) {
            this.config.watch = true
        }
    }
}
