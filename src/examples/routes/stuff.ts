import { Router, Request, Response } from 'express';

const router = Router();

router.route('/stuff')
  .get((req: Request, res: Response) => res.send('Fetching stuff'));

export default router;
