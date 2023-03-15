const express = require("express");
const path = require("path");
const app = express();
const swaggerUi = require('swagger-ui-express')
const swaggerjsDoc = require('swagger-jsdoc')

app.use(express.static(path.join(__dirname, "public")));

//swagger documentation
const options = {
    definition:{
        openApi: '3.0.0',
        info: {
            title: "Students Api",
            version: '1.0.0'
        },
        servers: [
            {
                url: `http://localhost:8080/`
            }
        ]
    },
    apis: ['index.js']
}

const swaggerSpec = swaggerjsDoc(options)
app.use('/api-docs', function(req, res, next){
    let user = auth(req)
    if (user === undefined || user['name'] !== 'admin' || user['pass'] !== 'adminpass') {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="Node"')
        res.end('Unauthorized')
    } else {
        next();
    }
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(express.json())
app.use(express.urlencoded({
    extended : false
}))
app.use('/api/students', require('./routes/apis/students'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
