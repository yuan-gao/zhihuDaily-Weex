const WeexBuilder = require('./builder/WeexBuilder');
exports.build = function (source, dest, options,callback) {
    if(!source||typeof source!=='string'||(Array.isArray(source)&&source.length==0)){
        return Promise.reject('"source" can not be empty!');
    }
    if(!dest||typeof source!=='string'){
        return Promise.reject('"dest" can not be empty or non-string!');
    }
    return new WeexBuilder(source, dest, options).build(callback);
}