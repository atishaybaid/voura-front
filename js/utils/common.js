
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

exports.getStringFromArr = function ( arr ) {
        var str = '';
        if( arr ){
                str = arr.join(',');
        }
        return str;
}

exports.getDateFromYoutubeTime = function( ytime ){
        var d = new Date( ytime );
        return d.toLocaleDateString();
}

exports.getTimeFromYoutubeTime = function( ytime ){
        var d = new Date( ytime );
        return d.toLocaleTimeString();
}

isEmpty = exports.isEmpty = function ( x ) {
        var y = !x ? true : false;
        return y;
}

exports.isEmptyObject = function ( obj ) {
        if( isEmpty(obj) )
            return true;
        return Object.keys(obj).length === 0 && obj.constructor === Object
}

exports.isStrictEmptyObject  = function ( obj ) {
        return !isEmpty(obj) && Object.keys(obj).length === 0 && obj.constructor === Object
}

exports.isNonEmptyObject = function ( obj ) {
        //if its null undefined etc.. return false
        return obj !== undefined && obj && Object.keys(obj).length > 0  && obj.constructor === Object
}


exports.isEmptyArray = function ( obj ) {
        //if its null undefined etc.. return false
        if( isEmpty(obj) )
            return true;
        return obj && obj.constructor === Array  && obj.length == 0
}

exports.isStrictEmptyArray= function ( obj ) {
        //if its null undefined etc.. return false
        return !isEmpty(obj) && obj && obj.constructor === Array  && obj.length == 0
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

exports.getTagRatingArray = function( arr ){
        var res = [];
        if( arr ) {
                arr.forEach(function (item, inx) {
                        var temp = {};
                        temp.tag = item;
                        temp.rating = 0;
                        res.push(temp);
                });
        }
        return res;
}


exports.getTagsFromTagRatingArray = function( arr ){
        var res = [];
        if( arr ) {
                arr.forEach(function (item, inx) {
                        res.push( item.tag );
                });
        }
        return res;
}

exports.getFileObjectFromBase64 = function( base64 ){
        if( base64 ){
                return {
                     base64: base64
                }
        }
        return {
                base64 : 'data:image/png;base64,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'
        }
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
        return '/profile-new/'+id;
}

exports.getVideoUrl = function ( id ) {
        return  '/videoshow/'+id;
}

exports.getSeminarForSUrl = function ( id ) {
        return '/seminar/SM/'+id;
}

exports.getSeminarForPUrl = function ( id ) {
        return '/seminar/PM/'+id;
}

exports.openInNewTab = function(url) {
        var win = window.open(url, '_blank');
        win.focus();
}

exports.getProfileUrl = function ( userId ) {
        return '/profile-new/'+userId;
}

exports.getProfileEditUrl = function ( userId ) {
        return '/profile/edit/'+userId;
}

var _parseCookieValue = exports._parseCookieValue = function ( s ) {
        if( s.indexOf( '"' ) === 0 ) {
                // This is a quoted cookie as according to RFC2068, unescape...
                s = s.slice( 1, -1 ).replace( /\\"/g, '"' ).replace( /\\\\/g, '\\' );
        }
        try {
                // If we can't decode the cookie, ignore it, it's unusable.
                // Replace server-side written pluses with spaces.
                return decodeURIComponent( s.replace( /\+/g, ' ' ) );
        } catch( e ) {}
};

var getCookie = exports.getCookie = function ( name ) {
        var result = name ? undefined : {};
        var cookies = document.cookie ? document.cookie.split( '; ' ) : [];
        for( var i = 0, l = cookies.length; i < l; i++ ) {
                var parts = cookies[ i ].split( '=' );
                var nameK = decodeURIComponent( parts.shift() );
                var cookie = parts.join( '=' );
                cookie = _parseCookieValue( cookie );
                if( name && name === nameK ) {
                        result = cookie;
                        break;
                }
                if( !name && cookie !== undefined ) {
                        result[ nameK ] = cookie;
                }
        }
        return result;
};

var isMobile = exports.isMobile = function () {
        return( function ( a ) {
                return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test( a ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test( a.substr( 0, 4 ) );
        } )( navigator.userAgent || navigator.vendor || window.opera );
};

var isTablet = exports.isTablet = function () {
        return( function ( a ) {
                return /(?:ipad|tab)/i.test( a );
        } )( navigator.userAgent || navigator.vendor || window.opera );
};

var isDesktop = exports.isDesktop = function () {
        return !isMobile() && !isTablet();
};


exports.isUserLoggedInCookieExist = function(){
        var userId = getCookie('userId');
        if ( userId ){
                return true;
        }else {
                return false;
        }
}