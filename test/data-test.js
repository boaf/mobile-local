var assert = buster.assert;

buster.testCase('Data', {
    setUp: function () {
        localStorage.clear();
        document.cookie = 'testcase=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },

    "should initialize with <code>{ 'location': {}, 'history': [] }</code>": function () {
        assert.equals(Data.current_state(), { 'location': {}, 'history': [] });
    },

    'should provide initializer': function () {
        assert.equals(Data.init(), { 'location': {}, 'history': [] });
    },

    'location': {
        'should provide setter and getter': function () {
            var location;

            Data.location(10101, 'Cool place', 10.1234, 20.5678);
            location = Data.location();

            assert.equals(location.postal_code, 10101);
            assert.equals(location.nice_name, 'Cool place');
            assert.equals(location.latitude, 10.1234);
            assert.equals(location.longitude, 20.5678);
        },

        'setter should return getter if not all args are specified': function () {
            /* Sets location to this location */
            var location = Data.location(10101, 'Cool place', 10.1234, 20.5678);
            /* Sets location to previous */
            location = Data.location(10102);

            assert.equals(location.postal_code, 10101);
        }

    },

    'history': {
        'should provide getter': function () {
            var history;

            Data.location(10101, 'Cool place', 10.1234, 20.5678);
            Data.location(10102, 'Another cool place', 11.2345, 21.6789);
            history = Data.history();

            assert.equals(history[0], { 'latitude': 11.2345,
                                        'longitude': 21.6789,
                                        'nice_name': 'Another cool place',
                                        'postal_code': 10102 });
        }

    }
});
