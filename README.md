## FTP User Manager
FTP User Manager is a Node.js package for managing FTP users on a remote server via SSH.

# Features
- Create new FTP users
- Update passwords for existing FTP users
- Delete FTP users
# Installation
- You can install the FTP User Manager package via npm:

```bash

npm install ftp-user-manager
Usage
javascript

const { createUser, updateUser, deleteUser } = require('ftp-user-manager');

// SSH configuration
const sshConfig = {
    host: 'your-ssh-host',
    port: 22,
    username: 'your-ssh-username',
    privateKey: require('fs').readFileSync('/path/to/private-key.pem')
};

// Create a new FTP user
createUser(sshConfig, 'newuser', 'password123')
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Update password for an existing FTP user
updateUser(sshConfig, 'existinguser', 'newpassword456')
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Delete an existing FTP user
deleteUser(sshConfig, 'existinguser')
    .then(result => console.log(result))
    .catch(error => console.error(error));
```
# License
- This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

- A just the SSH configuration and usage examples according to your package's requirements. Include any additional information or usage examples that you think would be helpful for users. Make sure to also provide information about installation, dependencies, and any other relevant details about your package.

- You can further enhance your README with sections like:

# Introduction
- Installation instructions (including prerequisites)
- Configuration
- Examples
# API documentation
- Contribution guidelines

- Testing instructions
- Troubleshooting
- Support/contact information

