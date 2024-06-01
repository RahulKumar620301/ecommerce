const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')



const app = express()
const port = 3000


app.use(cors({origin: '*'}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, 'public')))



const contactApi = require('./routes/contactApi')
app.use('/contact',contactApi) //contacApi is called by contact name

const userApi = require('./routes/userApi')
app.use('/user',userApi)

const productApi = require('./routes/productApi')
app.use('/product',productApi)

const adminApi = require('./routes/adminApi')
app.use('/admin',adminApi)

const categoryApi = require('./routes/categoryApi')
app.use('/category',categoryApi)

const subcategoryApi = require('./routes/subcategoryApi')
app.use('/subcategory',subcategoryApi)

const brandApi = require('./routes/brandApi')
app.use('/brand',brandApi)

const orderApi = require('./routes/orderApi')
app.use('/order',orderApi)

const cartApi = require('./routes/cartApi')
app.use('/cart',cartApi)

const addressApi = require('./routes/addressApi')
app.use('/address',addressApi)


app.get('/', (req, res) => {
  res.send('welcome to my shop')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})