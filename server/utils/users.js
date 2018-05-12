class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {
            id: id,
            name: name,
            room: room
        }
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // return user that was removed
        var itemToRemoveIndex = this.users.findIndex(user => user.id === id);
        if (itemToRemoveIndex != -1) {
            var userFound = this.users[itemToRemoveIndex];
            this.users.splice(itemToRemoveIndex, 1);
        }
        return userFound;
    }

    getUser(id) {
        // return user object
        var user = this.users.find(user => user.id === id);
        return user;
    }

    getUserList(room) {
        // return all users in the room.
        var users = this.users.filter(user => user.room == room);
        var namesArray = users.map(user => user.name);
        return namesArray;
    }
}

module.exports = {
    Users: Users
}