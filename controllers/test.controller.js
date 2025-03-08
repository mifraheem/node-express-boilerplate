



const testController = async(req, res) =>{
  return res.status(200).json({message: "Test controller"});
}


module.exports = {
  testController,
};