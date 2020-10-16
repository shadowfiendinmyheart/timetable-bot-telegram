const queryClass = require('./query')
const dataBase = require('./DataBase')
const query = new queryClass();

checkUser = async (nameUser) => {
    let user = await dataBase.withOneAurguments(nameUser, query.checkUserName());
    if (user.length < 1) {
        return true;
    } else {
        return false;
    }
}

checkGroup = async (nameUser) => {
    let user = await dataBase.withOneAurguments(nameUser, query.checkUserName());
    if (user[0].group_name == null) {
        return false;
    } else {
        return true;
    }
}
      
setName = async (nameUser) => {
    if (await checkUser(nameUser) == true) {
        await dataBase.withOneAurguments(nameUser, query.setUserName());
    }
}

setTimeUser = async (time, nameUser) => {
        await dataBase.withTwoAurguments(time, nameUser, query.setUserTime());
}

setGroup = async(nameUser, group) => {
    await dataBase.withTwoAurguments(group, nameUser, query.setUserGroup());
}

module.exports = {setName, setGroup, checkGroup, setTimeUser};