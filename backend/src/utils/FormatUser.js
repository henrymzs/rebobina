function formatUser({ id, nome, email, role, createdAt, updatedAt }) {
  return {
    id,
    nome,
    email,
    role,
    createdAt,
    updatedAt
  };
}

function formatUsers(userList) {
  return userList.map(user =>
    formatUser(user.get ? user.get({ plain: true }) : user)
  );
}

module.exports = { formatUser, formatUsers };
