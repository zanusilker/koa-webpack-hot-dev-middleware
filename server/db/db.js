import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import config from '../config';

let database = {};

MongoClient.connect(config.url, function (err, client) {
  database.mongo = client.db('todos')
})

database.findOneUser = async (user) => {
  return await database.mongo.collection('users').findOne(user)
}

database.addUser = async (user) => {
  return await database.mongo.collection('users').insertOne(user)
}

database.findAllTodos = async (req) => {
  return await database.mongo.collection('todos').find(req).toArray()
}

database.findOneTodo = async (todo) => {
  return await database.mongo.collection('todos').findOne(todo)
}

database.addTodo = async (todo) => {
  return await database.mongo.collection('todos').insertOne(todo)
}

database.findAndUpdateTodo = async (_id, todo) => {
  const id = new ObjectId(_id);
  return await database.mongo.collection('todos').findOneAndUpdate({ _id: id }, todo, {
    returnOriginal: false
  })
}

database.deleteTodo = async (_id) => {
  const id = new ObjectId(_id);
  return await database.mongo.collection('todos').deleteOne({ _id: id })
}

database.share = async (_id, userId) => {
  const id = new ObjectId(_id);
  return await database.mongo.collection("todos").findOneAndUpdate({ _id: id }, {
    $addToSet: {
      share: userId,
    },
    $set: {
      request: userId,
      canEdit: ""
    }
  }, {
    returnOriginal: false
  });
};

database.findAllUsers = async () => {
  return await database.mongo.collection('users').find().toArray()
}

database.findOneUserById = async (id) => {
  const userId = new ObjectId(id);

  return await database.mongo.collection('users').find({
    _id: userId
  })
}

export default database;