const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = process.env.DB_URL;

dbName = 'playingCards';
colName = 'cards';

const settings = { useUnifiedTopology: true };

const getCards = () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected successfully to server to GET cards.")
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const addCard = (card) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected successfully to server to POST card.")
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.insertOne(card, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.ops[0]);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const updateCard = (id, card) => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected successfully to server to PUT card.")
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.replaceOne({ _id : ObjectID(id) },
                card,
                { upsert : true },
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const deleteCard = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected successfully to server to DELETE card.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.deleteOne({ _id : ObjectID(id)}, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ deletedID : id });
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

module.exports = {
    getCards,
    addCard,
    updateCard,
    deleteCard
};