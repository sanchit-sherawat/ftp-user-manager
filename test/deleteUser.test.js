// test/deleteUser.test.js
const deleteUser = require('../src/deleteUser');
const { Client } = require('ssh2');

jest.mock('ssh2', () => ({
    Client: jest.fn(() => ({
        on: jest.fn(),
        exec: jest.fn()
    }))
}));

describe('deleteUser', () => {
    it('should delete an FTP user', async () => {
        const sshConfig = {
            host: 'test-host',
            port: 22,
            username: 'test-user',
            privateKey: 'test-private-key'
        };
        const username = 'test-user';

        await deleteUser(sshConfig, username);

        expect(Client).toHaveBeenCalledTimes(1);
        expect(Client.mock.calls[0][0]).toEqual(sshConfig);
        expect(Client.mock.instances[0].on).toHaveBeenCalledTimes(1);
        expect(Client.mock.instances[0].on).toHaveBeenCalledWith('ready', expect.any(Function));
        expect(Client.mock.instances[0].exec).toHaveBeenCalledTimes(1);
        expect(Client.mock.instances[0].exec).toHaveBeenCalledWith(`sudo userdel -r ${username}`, expect.any(Function));
    });
});
