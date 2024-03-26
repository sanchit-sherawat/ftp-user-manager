// src/deleteUser.js
const { Client } = require('ssh2');

async function deleteUser(sshConfig, username) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on('ready', () => {
            conn.exec(`sudo userdel -r ${username}`, (err, stream) => {
                if (err) {
                    reject(err);
                    return;
                }
                stream.on('close', () => {
                    conn.end();
                    resolve(`FTP user ${username} deleted successfully.`);
                });
            });
        }).connect(sshConfig);
    });
}

module.exports = deleteUser;
