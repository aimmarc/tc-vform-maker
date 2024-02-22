const { MessageCmdEnum } = require('../enums');
const { writeFile } = require('./scenes/writeFile');

function msgDistribute(msgObj = {}) {
    console.log('msgObj', msgObj);
    switch (msgObj.cmd) {
        case MessageCmdEnum.WRITE_FILE:
            writeFile(msgObj.data);
            break;
        default:
            break;
    }
}

module.exports = {
    msgDistribute,
};
