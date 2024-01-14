const { createBasicUser } = require("../../utils/createBasicUser");
const { createKey } = require("../../utils/createKey");
const userService = require("./users.service");

async function read(req, res, next) {
  // read one by id
  const id = req.params.userId;
  const user = await userService.read(id);
  res.status(200).json({ data: user });
}

async function put(req, res, next) {
  // updated one by id
  const id = req.params.userId;
  const updateObj = req.body;
  const user = await userService.update(id, updateObj);
  res.status(200).json({ data: user });
}

async function post(req, res, next) {
  // add new record
  const body = req.body;
  await userService.create(body);
  res.status(201);
}

async function list(req, res, next) {
  // get all records
  const users = await userService.list();
  res.status(200).json({ data: users });
}

async function login(req, res, next) {
  const user_name = req.body.user_name;
  const password = req.body.password;
  const key = req.body.auto_login_key || "";

  const userWithPassword = await userService.readByUsername(user_name);
  const isPasswordAccurate = userWithPassword?.password === password;
  const isKeywordAccurate = userWithPassword?.auto_login_key === key;

  if (!userWithPassword) {
    res.status(500).json({ error: `user ${user_name} does not exist.` });
    return;
  }

  if (isPasswordAccurate || isKeywordAccurate) {
    if (!key) {
      await userService.update(userWithPassword._id, {
        auto_login_key: createKey(),
      });
    }
    const user = await userService.read(userWithPassword._id);
    res.status(200).json({ data: user });
  } else {
    res.status(500).json({ error: "Password Incorrect" });
  }
}

async function register(req, res, next) {
  const user_name = req.body.user_name;
  const admin_key = req.body.admin_key;
  const password = req.body.password;

  // determine if username is already in use
  const user = await userService.readByUsername(user_name);
  const doesCharacterExist = !!user;

  if (doesCharacterExist) {
    res.status(500).json({ error: "Username is taken" });
    return;
  }

  // create new user
  const body = createBasicUser({ user_name, password });
  const tryCreate = await userService.create(body);
  const isCreated = tryCreate?.acknowledged;
  console.log(tryCreate);
  if (isCreated) {
    const newUser = await userService.read(tryCreate.insertedId.toString());
    res.status(200).json({ data: newUser });
  } else {
    res.status(500).json({ error: "Something went wrong :(" });
  }
}

module.exports = {
  read,
  put,
  post,
  list,
  login,
  register,
};
