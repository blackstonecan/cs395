const path = require('path');
const bcrypt = require('bcryptjs');
const {readJsonFile, writeJsonFile} = require('./file');

const userFilePath = path.join(__dirname, '../data/user.json');

const getUsers = async () => {
    try {
        const data = await readJsonFile(userFilePath);
        return data;
    } catch (error) {
        console.error(error);
    }
}

const userRegister = async (email, password) => {
    try {
        let users = await getUsers();

        if (users.find(user => user.email === email)) {
            return false;
        }

        password = await bcrypt.hash(password, 8);

        users.push({email, password});

        await writeJsonFile(userFilePath, users);
        return true;
    } catch (error) {
        console.error(error);
    }
};

const userLogin = async (email, password) => {
    try {
        let users = await getUsers();

        const user = users.find(user => user.email === email);
        if (!user) {
            return false;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    userRegister,
    userLogin
}