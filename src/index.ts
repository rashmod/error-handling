import express from 'express';

import { env } from '@/config/env';
import { errorHandler } from '@/middleware/error-handler';
import { routes } from '@/routes';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.listen(env.PORT, () => {
	console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
