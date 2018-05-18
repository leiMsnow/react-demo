export const getChatId = (userId, targetId) => {
    return [userId, targetId].sort().join('_')
}

export const getLastChat = (messages) => {
    return messages[messages.length - 1]
}