const Kind = "Messages"
var gCloud = require("./gCloud")(Kind)





module.exports = function(){
    return{
        insert : function(id, message, type, imageUrls, userName, userImage, callback){
            const data = {
                "id": id,
                "message": message,
                "type": type,
                "imageUrls": imageUrls,
                "userName": userName,
                "userImage": userImage
            }
            gCloud.insert(data, function(error){
                callback(error)
            })
        }
    }
}