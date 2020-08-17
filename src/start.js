const app = require("./server");
const connectDB = require('./config/db');

connectDB();

app.listen( app.get('port'), () => {
    console.log( 'Connected to Server ' + app.get('port') );
});
