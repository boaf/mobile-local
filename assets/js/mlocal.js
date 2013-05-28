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
    var Data = (function () {

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

        /**
         * Utility method to store data. Returns false if neither required
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

        /**
         * Utility method to retrieve data. Returns previously stored data or,
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

        /*
         * Initialize data store if empty.
         */
        function init_() {
            if (! store.data)
                set_(DEFAULT_STATE);

            return true;
        }

        return init_() && {

            /**
             * Sets and/or gets location data. If no arguments are supplied,
             *     previously stored location is returned, otherwise location
             *     derived from arguments is returned (in addition to the
             *     location being stored and added to history).
             * Arguments for location are postal code, English name of location
             *     (i.e. 'Tacoma, WA'), latitude and longitude of location.
             */
            location: function (postal, nice, lat, lon) {
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
            },

            /**
             * Gets historical location data. Automatically removes last
             *     location in history if history array length is greater than
             *     or equal to HISTORY_SIZE.
             */
            history: function (location) {
                return get_().history;
            },

            /*
             * Initialize storage to DEFAULT_STATE.
             */
            init: function () {
                return set_(DEFAULT_STATE);
            },

            /*
             * Gets the current state as an object. For debugging purposes.
             */
            current_state: function () {
                return get_();
            }
        };
    })();

// })(jQuery, window);
