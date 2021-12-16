import { Router, Request, Response } from 'express';

const router = Router();

router.route('/users/:id')
  .put((req: Request, res: Response) => res.status(200).json({
    data: [{
      firstName: 'proton',
      lastName: 'nucleons',
    }],
  }))
  .get((req: Request, res: Response) => res.status(201).json({
    data: [{
      firstName: 'electron',
      lastName: 'nucleons',
    }],
  }));

export default router;
