describe('Data', function () {
    var data;

    localStorage.clear();
    document.cookie = 'testcase=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    beforeEach(function () {
        data = new Data();
    });


    it('should initialize with <code>{ "location": {}, "history": [] }</code>', function () {
        expect(data.current_state()).toEqual({ 'location': {}, 'history': [] });
    });

    it('should provide initializer', function () {
        expect(data.init()).toEqual({ 'location': {}, 'history': [] });
    });

    describe('location', function () {
        it('should provide setter and getter', function () {
            var location;

            data.location(10101, 'Cool place', 10.1234, 20.5678);
            location = data.location();

            expect(location.postal_code).toEqual(10101);
            expect(location.nice_name).toEqual('Cool place');
            expect(location.latitude).toEqual(10.1234);
            expect(location.longitude).toEqual(20.5678);
        });

        it('setter should return getter if not all args are specified', function () {
            /* Sets location to this location */
            var location = data.location(10101, 'Cool place', 10.1234, 20.5678);
            /* Sets location to previous */
            location = data.location(10102);

            expect(location.postal_code).toEqual(10101);
        });
    });

    describe('history', function () {
        it('should provide getter', function () {
            var history;

            data.location(10101, 'Cool place', 10.1234, 20.5678);
            data.location(10102, 'Another cool place', 11.2345, 21.6789);
            history = data.history();

            expect(history[0]).toEqual({ 'latitude': 11.2345,
                                        'longitude': 21.6789,
                                        'nice_name': 'Another cool place',
                                        'postal_code': 10102 });
        });
    });
});
