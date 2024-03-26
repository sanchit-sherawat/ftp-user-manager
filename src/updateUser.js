// src/updateUser.js
const { Client } = require('ssh2');

async function updateUser(sshConfig, username, newPassword) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on('ready', () => {
            conn.exec(`echo "${username}:${newPassword}" | sudo chpasswd`, (err, stream) => {
                if (err) {
                    reject(err);
                    return;
                }
                stream.on('close', () => {
                    conn.end();
                    resolve(`Password updated successfully for FTP user ${username}.`);
                });
            });
        }).connect(sshConfig);
    });
}

module.exports = updateUser;
