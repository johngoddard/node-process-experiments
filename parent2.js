const { fork } = require('child_process');

let children = [];
let results = [];

const numProcesses = 2;

for(let i = 0; i < numProcesses; i++) {
  let args = [`worker ${i}`, i * 100];
  let forked = fork('child2.js', args);

  forked.on('message', msg => {
    if (msg.result) {
      results.push(msg.result);
    }

    console.log(`Message from child ${i}: ${msg}`);
  });

  forked.on('exit', (code, signal) => {
    console.log('child process exited with ' + 
      `code ${code} and signal ${signal}`);
  });

  forked.on('error', err => {
    console.log(`Error from child ${i}: ${err}`);
  });

  children.push(forked);
}

children.forEach(process => {
  process.send(`Start!`);
});

process.on('beforeExit', () => {
  let result = results.reduce((acc, next) => {
    return acc + next;
  });

  console.log(`the result is ${result}`);
}); 
