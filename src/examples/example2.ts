import express, { Router, Request, Response } from 'express';

import koii from '..';

const app = express();

const router = Router();
const PORT = 3000;

// Setting single route
router.all('/user', (req: Request, res: Response) => {
  // eslint-disable-next-line no-console
  console.log('User Page Called');
  res.end();
});

app.use(router);
app.use(koii);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on PORT ', PORT);
});
