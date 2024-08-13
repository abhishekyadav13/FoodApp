const mongoose=require('mongoose')

const mongoDB=async()=>{
await mongoose.connect("mongodb+srv://abhishek:yadavabhishek@cluster0.pj2w03c.mongodb.net/gofoodMERN")

try {
    console.log("connection is successful")
    const fetched_data=mongoose.connection.db.collection("foodData2")
    const data=await fetched_data.find({}).toArray()
    const foodCategory=mongoose.connection.db.collection("foodCategory")
    const catData=await foodCategory.find({}).toArray()
    global.foodData2=data;
    global.foodCategory=catData
    // console.log(global.foodData2)  //show data on terminal
    // console.log(data)
} catch (error) {
    console.log("No connection")
}
}
mongoDB()


