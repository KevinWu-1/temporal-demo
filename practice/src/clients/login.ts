import { Client } from '@temporalio/client';
import { randomUUID } from 'node:crypto';
import { login } from '../workflows';

async function run() {
  const client = new Client();
  const result = await client.workflow.execute(login, {
    args: ['1234'],
    taskQueue: 'login-tasks',
    workflowId: 'workflow-' + randomUUID(),
  });
  console.log(`The login Workflow returned: ${result}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
