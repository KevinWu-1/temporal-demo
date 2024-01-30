import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Client, Connection } from '@temporalio/client';
import { randomUUID } from 'node:crypto';
import { login } from './workflows';
// import cors from 'cors';

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', async (req: Request, res: Response) => {
  console.log('IN LOGIN');
  console.log(req);
  if (!req.body.otp) {
    res.status(400);
    res.send('Missing required otp Parameter');
    return 500;
  }

  const otp: string = req.body.otp.toString();
  console.log('opt: ', otp);

  // create connection details
  const connection = await Connection.connect({ address: 'localhost:7233' });
  // const connection = await Connection.connect({ address: 'temporal:7233' });
  console.log('connection: , connection');
  // create the connection
  const client = new Client({
    connection,
  });
  console.log('client: ', client);
  console.log('CLIENT MADE');
  try {
    const result = await client.workflow.execute(login, {
      args: [otp],
      taskQueue: 'login-tasks',
      workflowId: 'workflow-' + randomUUID(),
    });
    console.log('Workflow executed successfully:', result);
  } catch (error) {
    console.error('Error executing workflow:', error);
  }

  res.status(200);
  res.send(`OTP Recieved: ${otp}!`);
});

app.use(notFound);
app.use(errorHandler);

function notFound(req: Request, res: Response) {
  res.status(404);
  res.send({ error: 'Not found!', status: 404, url: req.originalUrl });
}

function errorHandler(err: Error, req: Request, res: Response) {
  console.error('ERROR', err);
  res.status(500);
  res.send({ error: err.message, url: req.originalUrl });
}

app
  .listen(port)
  .on('error', (e) => console.error(e))
  .on('listening', () => console.log(`Listening on http://localhost:${port}`));
