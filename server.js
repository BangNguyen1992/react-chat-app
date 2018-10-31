const express = require('express');
const bodyParser = require('body-parser');
const Chatkit = require('@pusher/chatkit-server');
var path = require("path");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:c6162ea6-4146-453d-b328-36e340a9508d',
  key: '1c2ab269-cabe-4f1c-9a9c-e1e050905997:4r8S14gqIh6OjmyhPBsL2/C3eC2TFnxg2NUYBZAukV4=',
})

// Api call
app.get('/api/users', (req, res) => {
  chatkit.getUsers()
    .then((users) => {
      res.send(users);
    }).catch((err) => {
      console.log(err);
    });
});

app.post('/api/register', function (req, res) {
  const userId = req.body.userId;
  chatkit.createUser({
    id: userId,
    name: userId,
  })
    .then((newUser) => {
      console.log('User created successfully');
      res.send(newUser);
    }).catch((err) => {
      console.log(err);
    });
});


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));