import { Router, Request, Response } from 'express';

const router = Router();

router.route('/media')
  .get((req: Request, res: Response) => res.send('Fetching media'));

router.route('/assets')
  .get((req: Request, res: Response) => res.send('Fetching assets'))
  .patch((req: Request, res: Response) => res.send('Modifying assets'));

export default router;
