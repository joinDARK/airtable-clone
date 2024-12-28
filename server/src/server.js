require('./config/env.js')

const { PORT } = require('./config/app.config.js');

const app = require('./app.js');


app.listen(PORT, () => {
    console.log("Hello!");
    console.log(`Server is running on port: ${PORT}`);
});
