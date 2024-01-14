const mongoClient = require("../../db/client");
const { ObjectId } = require("mongodb");

async function read(userId) {
  const client = mongoClient.db_client();
  const database = client.db(process.env.MONGO_USER_DATABASE);
  const users = database.collection(process.env.MONGO_USERS_COLLECTION);

  try {
    const query = { _id: new ObjectId(userId) };

    const options = {
      projection: {
        password: 0,
      },
    };

    return await users.findOne(query, options);
  } finally {
    await client.close();
  }
}

async function readByUsername(user_name) {
  const client = mongoClient.db_client();
  const database = client.db(process.env.MONGO_USER_DATABASE);
  const users = database.collection(process.env.MONGO_USERS_COLLECTION);

  try {
    const query = { user_name: user_name };

    return await users.findOne(query);
  } finally {
    await client.close();
  }
}

async function list() {
  const client = mongoClient.db_client();
  const database = client.db(process.env.MONGO_USER_DATABASE);
  const users = database.collection(process.env.MONGO_USERS_COLLECTION);

  try {
    const result = [];
    const query = { _id: { $exists: true } };
    const options = {
      projection: {
        _id: 1,
        user_name: 1,
      },
    };
    const cursor = users.find(query, options);

    for await (const user of cursor) {
      result.push(user);
    }
    return result;
  } finally {
    await client.close();
  }
}

async function create(user) {
  const client = mongoClient.db_client();
  const database = client.db(process.env.MONGO_USER_DATABASE);
  const users = database.collection(process.env.MONGO_USERS_COLLECTION);

  try {
    const newUser = await users.insertOne(user);
    console.log(`user ${user.user_name} created`);
    return newUser;
  } finally {
    await client.close();
  }
}

async function update(id, updateObj) {
  const client = mongoClient.db_client();
  const database = client.db(process.env.MONGO_USER_DATABASE);
  const users = database.collection(process.env.MONGO_USERS_COLLECTION);

  try {
    const options = {
      upsert: true,
    };

    const query = { _id: new ObjectId(id) };

    const updateDoc = {
      $set: {
        ...updateObj,
      },
    };

    return await users.findOneAndUpdate(query, updateDoc, options);
  } finally {
    await client.close();
  }
}

module.exports = {
  read,
  list,
  create,
  update,
  readByUsername,
};
