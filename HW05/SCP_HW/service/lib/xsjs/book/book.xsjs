const Booklib = $.import('xsjs.book', 'book').book;
const bookLib = new Booklib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.GET: {
                    bookLib.doGet();
                    break;
                }
                case $.net.http.PUT : {
                    bookLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.POST : {
                    bookLib.doPost(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.DEL : {
                    console.log($.request);
                    bookLib.doDelete(JSON.parse($.request.body.asString()));
                    break;
                }
                default: {
                    bookLib.doGet();
                    break;
                }
            }
        } catch (e) {
                $.response.status = $.net.http.BAD_REQUEST;
                $.response.setBody(e.message);
        }
    }());
}());
