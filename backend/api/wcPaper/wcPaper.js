
exports.getArea = async (req, res) => {
    console.log("request recieved")
    try {
        return res.status(200).json({})
    } catch (error) {
        console.log(error)
        return res.status(404).send('Error occured while .')
    }
}