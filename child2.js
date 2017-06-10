process.on('message', msg => {
  console.log(`Message from parent: ${msg}`);
});

let start = parseInt(process.argv[3]);
let counter = start;

console.log(`My name is ${process.argv[2]}`);

function count() {
  setTimeout(() => {
    if (counter < start + 10) {
      process.send(`Counter: ${counter++}`);
      count();
    } else {
      process.send(`Counter: ${counter}`);
      process.send({ result: counter });
      process.exit(0, 'child done');
    }
  }, 500);
}

count();
