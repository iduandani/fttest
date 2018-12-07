export default {
    getQueryString(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let reg_rewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i');
        let r = window.location.search.substr(1).match(reg);
        let q = window.location.pathname.substr(1).match(reg_rewrite);
        if (r != null){
            return unescape(r[2]);
        } else if (q != null){
            return unescape(q[2]);
        } else {
            return null;
        }
    }
}
