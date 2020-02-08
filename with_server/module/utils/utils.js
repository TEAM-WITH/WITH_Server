// authUtil.js
const Utils = {
    successTrue: (statusCode, message, data) => {
        return {
            success: true,
            statusCode : statusCode,
            message: message,
            data: data
        }
    },
    successFalse: (statusCode, message) => {
        return {
            success: false,
            statusCode : statusCode,
            message: message
        }
    },
}
module.exports = Utils