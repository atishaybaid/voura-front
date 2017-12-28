
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