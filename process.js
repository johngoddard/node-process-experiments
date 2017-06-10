const { spawn } = require('child_process');

const find = spawn('find', ['../', '-type', 'f' ]);
const grep = spawn('grep', ['js']);
const grep2 = spawn('grep', ['-v', 'node_modules']);
const grep3 = spawn('grep', ['-v', 'AA']);

find.stdout.pipe(grep.stdin);
grep.stdout.pipe(grep2.stdin);
grep2.stdout.pipe(grep3.stdin);

grep3.stdout.on('data', data => {
  console.log(`JS files:\n ${data}`);
});
