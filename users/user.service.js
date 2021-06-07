const usuarios = require('../models/users');

module.exports = {
    authenticate,
    // getAll
};

async function authenticate({ username, password }) {
    const users = await usuarios.find({username:[username],password :[password]});
    if (users.length == 1) {
        return users[0];
    } else {
        return null;
    }
}

// async function getAll() {
//     return users.map(u => {
//         const { password, ...userWithoutPassword } = u;
//         return userWithoutPassword;
//     });
// }
