import path from 'path';
import fs from 'fs';
import handlebars from 'express-handlebars';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import sass from 'node-sass';

//Routes
import {indexRouter} from './routes';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }))

sass.render({
  file: path.join(__dirname, 'styles', 'styles.scss'),
  outFile: path.join(__dirname, 'public', 'styles', 'styles.css')
}, (err, res) => {
  fs.writeFile(
    path.join(__dirname, 'public', 'styles', 'styles.css'),
    res.css,
    err => {
      if (err) throw err;
    }
  );
});

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('server running on port 3000');
});
