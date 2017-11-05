
exports.log = function ( a ) {
    console.log( a );
};

exports.mergeDateTime = function ( d1, d2 ) {

        var h = d2.getHours();
        var m = d2.getMinutes();
        var s = d2.getSeconds();
        var ms = d2.getMilliseconds();

        d1.setHours(h);
        d1.setMinutes(m);
        d1.setSeconds(s);

        return d1;
}

exports.getArrFromStr = function( str ){
        //var array = JSON.parse("[" + str + "]");
        var arr = str.split(",").map(function(item) {
                return item.trim();
        });
        return arr;
}