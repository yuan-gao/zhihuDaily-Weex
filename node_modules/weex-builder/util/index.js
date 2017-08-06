/**
 * Created by exolution on 17/2/22.
 */
const _sizeUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
exports.resolveSizeUnit = function resolveSizeUnit(size, i = 0) {
    if(isNaN(size)){
        return ''
    }
    if (size < 1000) {
        return size.toFixed(2).replace(/\.?0+$/, '') + _sizeUnits[i]
    }
    else {
        return resolveSizeUnit(size / 1024, i + 1)
    }
}