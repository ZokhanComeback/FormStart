import path from "path";
import fs from 'fs';

import { Request, Response, NextFunction, Router } from 'express';

export const indexRouter: Router = Router();

interface IFormData {
  author: string;
  date: string;
  article: string;
  tags: string;
  comment: string;
}

const bodyToJson = (body: IFormData): string => {
  return JSON.stringify(body);
};

indexRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', {submitted: false});
});

indexRouter.get('/api', (req: Request, res: Response, next: NextFunction) => {
  fs.readFile(
    path.join(__dirname, '..', 'results', 'result.json'),
    'utf-8',
    (err, data) => {
      let result = false;

      if (err) {
        console.log(err);
      } else {
        result = JSON.parse(data);
      }

      res.render('index', {submitted: true, result});
    }
  );
});

indexRouter.post('/submitted', async (req: Request, res: Response, next: NextFunction) => {
  const json = bodyToJson(req.body);

  await fs.writeFile(
    path.join(__dirname, '..', 'results', `result.json`),
    json,
    err => {
      if (err) throw err;
    }
  );

  res.render('index', {submitted: true});
});
