var assert = buster.assert;

buster.testCase('Store', {
    setUp: function () {
        localStorage.clear();
        document.cookie = 'testcase=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        this.store = new Store('test-case-!@#$%^&*()');
    },

    tearDown: function () {
        localStorage.clear();
        document.cookie = 'testcase=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },

    'should normalize location name': function () {
        assert.equals(this.store.loc, 'testcase');
    },

    'should provide a setter and getter': function () {
        assert('data' in this.store);
        this.store.data = 'test data';
        assert.equals(this.store.data, 'test data');
    },

    'should properly stringify a variety of types': function () {
        var testers = [
                1, 'b', {}, { 'a': 1, 2: 'b' }, true, false, [],
                [ 1, 'b', [], { 'cool': 'stuff' }]
            ],
            i, l = testers.length, curr;
        for (i = 0; i < l; i++) {
            curr = testers[i];
            this.store.data = curr;
            assert.equals(this.store.data, curr);
        }
        this.store.data = testers;
        assert.equals(this.store.data, testers);
    },

    'should simply return null if data is erroneous': function () {
        localStorage['testcase'] = '{';
        assert.same(this.store.data, null);
    }
});
