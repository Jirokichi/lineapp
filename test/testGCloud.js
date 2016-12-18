var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
var expect = chai.expect;

describe('gCloudのテスト', function() {

    const gCloud = require("../google-cloud/gCloud")
    it("gCould.jsファイルが存在していること", function(){
        expect(gCloud).to.exist
    })

    const testCloud = gCloud("Tests")
    it("kindが「Tests」のデータが追加できてIDが取得できること", function(done){
        var data = {
            "test1":"test1",
            "test2":"test2",
        }

        testCloud.insert(data, function(error, id){
            expect(error).to.be.null
            expect(id).to.not.be.null
            console.log("id:" + id)
            done()
        })
    })

    it("kindが「Tests」のデータを取得する", function(done){
        testCloud.getAll(function(err, records){
            expect(err).to.be.null
            expect(records).to.not.be.null
            console.log(records.length + "件のデータが保存されています")
            console.log(records)
            done()
        })
    })
})