
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

exports.isEmpty = function ( x ) {
        var y = !x ? true : false;
        return y;
}

exports.isEmptyObject = function ( obj ) {
        return Object.keys(obj).length === 0 && obj.constructor === Object
}

exports.isNonEmptyObject = function ( obj ) {
        //if its null undefined etc.. return false
        return obj !== undefined && obj && Object.keys(obj).length > 0  && obj.constructor === Object
}

exports.isNonEmptyArray = function ( obj ) {
        //if its null undefined etc.. return false
        return obj && obj.constructor === Array  && obj.length > 0
}

//questids list with item.selected = true
exports.getSelectedQuestionsIds = function( qList ){
        var res = [ ];
        qList.map( function( item, index ){
                if( item.selected == true ){
                        res.push( item._id );
                }
        });
        return res;
}

//quest list with item.selected = true
exports.getSelectedQuestions = function( qList ){
        var res = [ ];
        qList.map( function( item, index ){
                if( item.selected == true ){
                        res.push( item );
                }
        });
        return res;
}

exports.getProfileUrlFromId = function ( id ) {
        return '/profile/'+id;
}

exports.getVideoUrl = function ( id ) {
        return  '/videoshow/'+id;
}

exports.getSeminarForSUrl = function ( id ) {
        return '/seminar/SM'+id;
}

exports.getSeminarForPUrl = function ( id ) {
        return '/seminar/PM'+id;
}

exports.openInNewTab = function(url) {
        var win = window.open(url, '_blank');
        win.focus();
}

exports.getProfileUrl = function ( userId ) {
        return '/profile/'+userId;
}

exports.getProfileEditUrl = function ( userId ) {
        return '/profile/edit/'+userId;
}