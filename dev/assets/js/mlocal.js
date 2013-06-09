// (function ($, window, undefined) {

    /*
     * Data storage interface. Use localStorage with fallback to cookies.
     */
    function Store (location) {

        /*
         * Determine support of localStorage.
         */
        var LS_SUPPORT = 'localStorage' in window &&
                         window['localStorage'] !== null;

        this.loc = location.replace(/[^a-z]/gi, '');

        /*
         * Store data to localStorage or cookie.
         */
        this.__defineSetter__('data', function (value) {
            value = JSON.stringify(value);
            if (LS_SUPPORT) {
                localStorage[this.loc] = value;
            } else {
                document.cookie = [
                    this.loc, '=', value, '; expires=',
                    new Date((+new Date())+31536000000).toGMTString(),
                    '; path=/'
                ].join('');
            }
        });

        /**
         * Retrieve data from localStorage or cookie.
         */
        this.__defineGetter__('data', function () {
            try {
                if (LS_SUPPORT) {
                    return JSON.parse(localStorage[this.loc]);
                } else {
                    var p = document.cookie.split(this.loc + '='),
                        c = p[1].split(';');
                    return JSON.parse(c[0]);
                }
            } catch (e) {
                /* It's possible the stored data will be erroneous */
                return null;
            }
        });
    }

    /*
     * Location storage and history interface.
     */
    function Data () {

        var
            /*
             * Number of previous locations to store in history.
             */
            HISTORY_SIZE = 5,

            /*
             * Name of application. Used for data storage
             */
            APP_NAME = 'MobileLocal',

            /*
             * Default storage state used for initializing store.
             */
            DEFAULT_STATE = { 'location': {}, 'history': [] },

            /*
             * Data storage instance.
             */
            store = new Store(APP_NAME);

        /*
         * Utility method to store data. Return false if neither required
         *     arguments are provided, true otherwise, while setting data.
         */
        function set_(data) {
            if (typeof data === 'undefined' ||
                    ((typeof data.location === 'undefined' ||
                        data.location === null) &&
                    (typeof data.history === 'undefined' ||
                        data.history === null)))
                return false;
            var current = get_();
            store.data = $.extend({}, current, data);
            return store.data;
        }

        /*
         * Utility method to retrieve data. Return previously stored data or,
         *     if stored data is erroneous or null, DEFAULT_STATE, which is
         *     stored and returned.
         */
        function get_() {
            var data = store.data;

            if (data)
                return data;

            store.data = DEFAULT_STATE;
            return DEFAULT_STATE;
        }

        /**
         * Set and/or get location data. If no arguments are supplied,
         *     return previously stored location, otherwise return location
         *     derived from arguments, store location and add to history.
         * Arguments for location are postal code, English name of location
         *     (i.e. 'Tacoma, WA'), latitude and longitude of location.
         */
        this.location = function (postal, nice, lat, lon) {
            if (arguments.length < 4) /* Require all four args */
                return get_().location;

            var location = {
                    'postal_code': postal,
                    'nice_name': nice,
                    'latitude': lat,
                    'longitude': lon
                },
                current_object = get_(),
                history = [].slice.call(current_object.history, 0,
                                        HISTORY_SIZE - 1);

            history.unshift({
                'postal_code': location.postal_code,
                'nice_name': location.nice_name,
                'latitude': location.latitude,
                'longitude': location.longitude
            });

            set_({ 'location': location, 'history': history });

            return location;
        };

        /**
         * Get historical location data. Automatically remove last
         *     location in history if history array length is greater than
         *     or equal to HISTORY_SIZE.
         */
        this.history = function (location) {
            return get_().history;
        };

        /*
         * Initialize storage to DEFAULT_STATE.
         */
        this.init = function () {
            return set_(DEFAULT_STATE);
        };

        /*
         * Get the current state as an object. For debugging purposes.
         */
        this.current_state = function () {
            return get_();
        };

        /* Initialize storage */
        if (! store.data)
            set_(DEFAULT_STATE);
    }

    // TODO: Figure out how to test this. Or should I bother?
    function get_position () {
        return navigator.geolocation.getCurrentPosition();
    }

// })(jQuery, window);
