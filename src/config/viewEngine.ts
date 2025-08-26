// src/config/viewEngine.ts
import express, { Express } from 'express';

const configViewEngine = (app: Express): void => {
  // thư mục static (images, css, js client)
  app.use(express.static('src/public'));

  // template engine
  app.set('view engine', 'ejs');

  // đường dẫn đến thư mục views
  app.set('views', 'src/views');
};

export default configViewEngine;
