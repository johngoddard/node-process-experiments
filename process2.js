const { spawn } = require('child_process');

const find = spawn('find . -type f | grep js | grep -v 2', {
  stdio:'inherit',
  shell: true,
  cwd: `/Users/johngoddard/Desktop`
});

find.stdout.on('data', data => {
  console.log(`JS files:\n${data}`);
});
