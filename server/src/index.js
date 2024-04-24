// Load environment variables from .env file
require('dotenv').config();

const express= require("express");
//const chefRouter = require("./routes/chefRoute");
const adminRouter = require("./routes/adminRoute");
const loginRouter = require("./routes/loginRoute");
const recipeRouter = require("./routes/recipesRoute");
const registerRouter = require("./routes/registerRoute");
const roleRouter = require("./routes/roleRoute");
//const rolesRouter = require("./routes/rolesRoute");
const categoryRouter = require("./routes/categoryRoute");
const ingredientsRouter = require("./routes/ingredientsRoute")
const notificationRouter = require("./routes/notificationRoute")
const premiumRouter = require("./routes/premiumRoute")
const Router = require("./routes/ratingsRoute");
var bodyParser = require('body-parser');
const cors = require('cors');


const app=express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
   res.send('<h1>Hey wassup bro!</h1>');
   
});


app.use('/user', adminRouter)
app.use('/user', loginRouter)
app.use('/recipes', recipeRouter)
app.use('/recipes', Router)
app.use('/user', registerRouter)
app.use('/role', roleRouter)
app.use('/category', categoryRouter)
app.use('/ingredients', ingredientsRouter)
app.use('/premium', premiumRouter)
app.use('/notifications', notificationRouter)


app.listen(process.env.PORT ||3000,()=>{
    console.log("server runs in 3000 ports")
})



//app.use('/authentication', rolesRouter)
//app.use('/user', chefRouter)
//app.use('/recipes', chefRouter)