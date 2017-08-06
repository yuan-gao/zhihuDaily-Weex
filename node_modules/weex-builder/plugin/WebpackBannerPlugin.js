/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra
 */
var ConcatSource = require("webpack-core/lib/ConcatSource")
var ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers")


function BannerPlugin(banner, options) {
    this.options = options || {}
    this.banner = banner
}
module.exports = BannerPlugin

BannerPlugin.prototype.apply = function (compiler) {
    var options = this.options
    var banner = this.banner

    compiler.plugin("compilation", function (compilation) {
        compilation.plugin("optimize-chunk-assets", function (chunks, callback) {
            chunks.forEach(function (chunk) {
                if (options.entryOnly && !chunk.initial) return
                chunk.files.filter(ModuleFilenameHelpers.matchObject.bind(undefined, options)).forEach(function(file) {
                    let rawFile=chunk.origins[0].module.resource.split('?')[0]
                    let bannerStr = typeof banner === 'string' ? banner : banner.call(compilation, rawFile, chunks)
                    compilation.assets[file] = new ConcatSource(bannerStr, "\n", compilation.assets[file])
                })
            })
            callback()
        })
    })
}
