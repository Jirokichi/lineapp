console.log("google_cloud.js")
// Your Google Cloud Platform project ID
const ProjectId = 'petaboard-152202';
// The kind for the new entity
const Kind = 'Messages';

const isComputeEngine = false


var datastore
if(isComputeEngine){
    var gcloud = require('google-cloud');
    datastore = gcloud.datastore();
}else{
    var gcloud = require('google-cloud');
    datastore = gcloud.datastore({
        projectId: ProjectId,
        keyFilename: '/path/to/keyfile.json'
    });
}

// const key = datastore.key([Kind]);


// Saves the entity
function saveTodo(key, data, callback){
    const task = {
        key: key,
        data: data
    };
    datastore.save(task)
    .then(() => {
        console.log(`Saved ${JSON.stringify(task.key)}: ${JSON.stringify(task.data)}`);
        callback(null, task.key.id)
        return
    })
    .catch((error) => {
        console.log("Error")
        console.log(error)
        callback(error, null)
        return
    });
}



module.exports = function(kind){
    return {
        delete: function(id, callback) {
            var key = datastore.key([kind, id]);
            datastore.delete(key, function(err) {
            callback(err || null);
            });
        },
        insert: function(data, callback){
            var key = datastore.key(kind);
            saveTodo(key, data, callback)
        },
        getAll: function(callback) {
            console.log("query作ったよ - " + kind)
            var query = datastore.createQuery(kind)

            datastore.runQuery(query, function (err, entities, info) {
                 if (err) {
                    callback(err);
                    return;
                }
                console.log(info)
                callback(null, entities);
            });
        }
    }
}