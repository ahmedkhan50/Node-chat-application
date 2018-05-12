const expect = require('expect');
const {Users} = require('./users');

describe('Users class', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users.push({
            id: '123',
            name: 'ahmed',
            room: 'A1'
        },

            {
                id: '321',
                name: 'ahmed1',
                room: 'A2'
            },

            {
                id: '153',
                name: 'ahmed2',
                room: 'A1'
            });
    });

    it('should add a new user', () => {
        var users = new Users();
        var resUser = users.addUser('12345', 'ahmed', 'fun');
        expect(users.users).toEqual([resUser]);
    });

    it('should return users in room A1', () => {
        var usersList = users.getUserList('A1'); 
        expect(usersList).toEqual(['ahmed','ahmed2']);
    });

    it('should find user',()=>{
        var userId = '123';
        var user = users.getUser(userId);
        expect(user.id).toEqual(userId);
    });

    it('should not find user',()=>{
        var userId = '13';
        var user = users.getUser(userId);
        expect(user).toBeUndefined();
    });

    it('should delete the user',()=>{
        var userId = '153';
        var user = users.removeUser(userId);
        expect(user.id).toEqual(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not delete the user which does not exist',()=>{
        var userId = '193';
        var user = users.removeUser(userId);
        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });
});