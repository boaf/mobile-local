describe('Geolocation', function () {
    var location;

    beforeEach(function () {
        location = get_position();
    });

    it('should retrieve geographical location from device', function () {
        expect(location.constructor.name).toBe('Geoposition');
        expect(location).toContain('coords');
        expect(location).toContain('timestamp');
        expect(location.timestamp).toBeGreaterThan(0);
    });

    it('should store location', function () {

    });
});
