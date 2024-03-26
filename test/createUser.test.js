// test/createUser.test.js
const createUser = require('../src/createUser');
const { Client } = require('ssh2');

jest.mock('ssh2', () => ({
    Client: jest.fn(() => ({
        on: jest.fn(),
        exec: jest.fn()
    }))
}));

describe('createUser', () => {
    it('should create a new FTP user', async () => {
        const sshConfig = {
            host: 'test-host',
            port: 22,
            username: 'test-user',
            privateKey: 'test-private-key'
        };
        const username = 'test-user';
        const password = 'test-password';

        await createUser(sshConfig, username, password);

        expect(Client).toHaveBeenCalledTimes(1);
        expect(Client.mock.calls[0][0]).toEqual(sshConfig);
        expect(Client.mock.instances[0].on).toHaveBeenCalledTimes(1);
        expect(Client.mock.instances[0].on).toHaveBeenCalledWith('ready', expect.any(Function));
        expect(Client.mock.instances[0].exec).toHaveBeenCalledTimes(2);
        expect(Client.mock.instances[0].exec).toHaveBeenNthCalledWith(1, `sudo useradd -m -s /bin/bash ${username}`, expect.any(Function));
        expect(Client.mock.instances[0].exec).toHaveBeenNthCalledWith(2, `echo "${username}:${password}" | sudo chpasswd`, expect.any(Function));
    });
});
