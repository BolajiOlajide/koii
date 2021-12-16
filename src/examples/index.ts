import express, { Request, Response } from 'express';

import v1Router from './routes/v1';
import v2Router from './routes/v2';
import stuffRouter from './routes/stuff';
import koii from '..';

const app = express();
const PORT = 3103;

const responseHandler = ({ message }: { message: string }) => (req: Request, res: Response) => {
  let formattedMessage: string = '';

  if (req.params && req.params.name) {
    formattedMessage = `${message}${req.params.name}`;
  }

  return res.send({
    status: 'success',
    message: formattedMessage,
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

app.use(koii);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on port ${PORT}`);
});
