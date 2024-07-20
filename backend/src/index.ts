import { Hono } from 'hono'
import { UserRouter } from '../routes/user'
import { TransactionUser } from '../routes/transcation';
import { cors } from 'hono/cors';

const app = new Hono()

app.use('/*',cors())
app.route('/api/v1/user',UserRouter);
app.route('/api/v1/transcation',TransactionUser);

export default app
