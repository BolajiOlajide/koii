const express = require('express');
// const koii = require('../src');
const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2');
const stuffRouter = require('./routes/stuff');

const app = express();
const PORT = 3103;

const responseHandler = ({ message }) => (req, res) => {
  if (req.params && req.params.name) {
    message = `${message}${req.params.name}`;
  }

  return res.send({
    status: 'success',
    message
  });
};

app.get('/', responseHandler({ message: 'Sample express application' }));
app.get('/names/:name', responseHandler({ message: 'Welcome ' }));
app.post('/names/:name', responseHandler({ message: 'Welcome ' }));
app.route('/events')
  .get(responseHandler({ message: 'Get Events' }))
  .post(responseHandler({ message: 'Post Events' }))
  .put(responseHandler({ message: 'Put Events' }));

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
app.use('/test', stuffRouter);

const koii = express();
koii.on('mount', (p) => {
  console.log(p._router);
})
app.use(koii);
// console.log(app.settings)

app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err.message);
  }

  console.log('Application running on port ' + PORT); // eslint-disable-line
});
