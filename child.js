
process.on('message', msg => {
  console.log(`Msg from parent: ${msg}`);
});

let counter = 0;

setInterval(() => {
  process.send(`counter: ${counter++}`);
}, 1000);
