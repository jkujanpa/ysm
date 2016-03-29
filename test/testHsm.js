

const assert = require('assert');
const testFsm = require('./testSm1.js').testFsm;

//const sm = testFsm();

/**
 *  This test suite is meant to be run through gulp (use the `npm run watch`)
 *  script.
 */

describe('Test HSM', function() {

    describe('#constructor', function() {

        //const sm = testFsm();

        /*
        it('should have correct id', function() {
        assert.strictEqual(item.id, (0x0102 << 16) + 0x0B0C);
        });
        it('should have correct dates', function() {
        assert.equal(item.date.valueOf(), refDate.valueOf());
        });
        */
    }); // #constructor


    describe('#methods', function() {

        /*
        var buf = new Buffer([1,2,3,4,5,6,7,8,9,10,11,12,
                  0x12,0x10,0x14,0x15,0x16,0x17,0x11,0x11]);
        var item = new LogItem(buf);
        var refDate = new Date(2012,9,14,15,16,17,111);

        describe('#isEqual', function() {
            it('should handle another item as not equal if id fields are not same', function() {
                var buf2 = new Buffer([0,1,2,3,0,0,0,0,8,9,10,11,12,13,14,15,16,18,19,20]);
                var itemNotEqual = new LogItem(buf2);
                assert.notEqual(item.isEqual(itemNotEqual), 1);
            });
            it('should handle another item as equal if id fields are same', function() {
                var buf2 = new Buffer([1,2,3,4,0,0,0,0,9,10,11,12,13,14,15,16,17,18,19,20]);
                var itemEqual = new LogItem(buf2);
                assert.equal(item.isEqual(itemEqual), 1);
            });
        });

        describe('#toJSON', function() {
            it('should have correct values in JSON dump', function() {
                var jsonData = item.toJSON()
                assert.strictEqual(jsonData.id, (0x0102 << 16) + 0x0B0C);
                assert.equal(jsonData.date.valueOf(), refDate.valueOf());
                //assert.equal(jsonData.expirationDate.valueOf(), refDate2.valueOf());
                assert(jsonData.data);
            });
        });
        */
  }); // #methods


/*

    //var createItem = new LogItemCreator(15000);
    var buf = new Buffer([1,2,3,4,5,6,7,8,9,10,11,12,
      0x12,0x10,0x14,   // year 2012, month 10 (Oct), 14th day
      0x15,0x16,0x17,   // hour 15, minutes 16, seconds 17
      0x11,0x11]);      // milliseconds 111
    //var item = createItem(buf);
    var item = new LogItem(buf);
    var refDate1 = new Date(2012,9,14,15,16,17,111);
    //var refDate2 = new Date(refDate1.valueOf() + 15000);

    describe('#construct', function() {

      it('should handle another item as not equal if id fields are not same', function() {
        var buf2 = new Buffer([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20]);
        var itemNotEqual = new LogItem(buf2);
        assert.notEqual(item.isEqual(itemNotEqual), 1);
      });
      it('should handle another item as equal if id fields are same', function() {
        var buf2 = new Buffer([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
        var itemEqual = new LogItem(buf2);
        assert.equal(item.isEqual(itemEqual), 1);
      });
      it('should handle another item as not identical if id and date fields are not same', function() {
        var buf2 = new Buffer([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
        var itemNotIdentical = new LogItem(buf2);
        assert.notEqual(item.isIdentical(itemNotIdentical), 1);
      });
      it('should handle another item as identical if id and date fields are same', function() {
        var buf2 = new Buffer([1,2,3,4,5,6,7,8,9,10,11,12,
                      0x12,0x10,0x14,0x15,0x16,0x17,0x11,0x11]);
        var itemIdentical = new LogItem(buf2);
        assert.equal(item.isIdentical(itemIdentical), 1);
      });
    });

*/
});
