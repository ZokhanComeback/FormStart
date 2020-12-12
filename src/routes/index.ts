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

indexRouter.post('/submitted', async (req: Request, res: Response, next: NextFunction) => {
  const json = bodyToJson(req.body);

  await fs.writeFile(
    path.join(__dirname, '..', 'results', `${req.body.date + req.body.author}.json`),
    json,
    err => {
      if (err) throw err;
    }
  );

  res.render('index', {submitted: true});
});
