import 'dotenv/config';

import { createApp } from './app';
import { loadEnvironment } from './config/env';

const environment = loadEnvironment();
const app = createApp();

app.listen(environment.PORT, () => {
  console.info(`HostelFit API listening on port ${environment.PORT}`);
});
