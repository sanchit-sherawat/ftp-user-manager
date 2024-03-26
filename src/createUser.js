// src/createUser.js
const { Client } = require('ssh2');

async function createUser(sshConfig, username, password) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on('ready', () => {
            conn.exec(`sudo useradd -m -s /bin/bash ${username}`, (err, stream) => {
                if (err) {
                    reject(err);
                    return;
                }
                stream.on('close', () => {
                    conn.exec(`echo "${username}:${password}" | sudo chpasswd`, (err, stream) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        stream.on('close', () => {
                            conn.end();
                            resolve(`FTP user ${username} created successfully.`);
                        });
                    });
                });
            });
        }).connect(sshConfig);
    });
}

module.exports = createUser;
