const getContent = (array = []) => {
    return array.reduce((prev, current) => prev += `${current}\n`, "")
}

module.exports = getContent
