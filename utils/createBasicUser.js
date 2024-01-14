const { createKey } = require("./createKey");

const createBasicUser = ({ user_name, password }) => {
  const is_admin = admin_key === process.env.ADMIN_KEY;
  const auto_login_key = createKey();
  const settings = {
    is_collection_public: false,
    allows_challenges: false,
  };
  const collection = {
    champions: [],
    commands: [],
    accessories: [],
  };
  const decks = [];

  return {
    user_name,
    password,
    is_admin,
    auto_login_key,
    settings,
    collection,
    decks,
  };
};

module.exports = {
  createBasicUser,
};
