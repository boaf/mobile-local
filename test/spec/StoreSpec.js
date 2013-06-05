describe('Store', function () {
    var store;

    localStorage.clear();
    document.cookie = 'testcase=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    beforeEach(function () {
        store = new Store('test-case-!@#$%^&*()');
    });


    it('should normalize location name', function () {
        expect(store.loc).toEqual('testcase');
    });

    it('should provide a setter and getter', function () {
        expect('data' in store);
        store.data = 'test data';
        expect(store.data).toEqual('test data');
    });

    it('should properly stringify a variety of types', function () {
        var testers = [
                1, 'b', {}, { 'a': 1, 2: 'b' }, true, false, [],
                [ 1, 'b', [], { 'cool': 'stuff' }]
            ],
            i, l = testers.length, curr;
        for (i = 0; i < l; i++) {
            curr = testers[i];
            store.data = curr;
            expect(store.data).toEqual(curr);
        }
        store.data = testers;
        expect(store.data).toEqual(testers);
    });

    it('should simply return null if data is erroneous', function () {
        localStorage['testcase'] = '{';
        expect(store.data).toBe(null);
    });

});
