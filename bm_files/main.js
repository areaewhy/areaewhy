(function () {

    var waitForRequire = function() {
        if ("undefined" == typeof require) {
            console.debug("'require' still not defined. Waiting...");
            setTimeout(waitForRequire, 50);
        } else {
            initializeApp();
        }
    };

    var initializeApp = function() {

        require.config({
            baseUrl: "/scripts/app",
            paths: {
                'moment': '/scripts/common/moment'
            }
        });

        var root = this;
        define('jquery', [], function() { return root.jQuery; });
        define('ko', [], function() { return root.ko; });
        define('amplify', [], function() { return root.amplify; });
        define('toastr', [], function() { return root.toastr; });
        define('underscore', [], function() { return root._; });
        define('sammy', [], function() { return root.sammy; });
    };

    waitForRequire();

})();