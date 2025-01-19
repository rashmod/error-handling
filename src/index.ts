import express from 'express';

import { env } from '@/config/env';
import { routes } from '@/routes';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.listen(env.PORT, () => {
	console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
