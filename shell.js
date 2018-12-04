var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.setPrompt(" > ");

rl.prompt();
rl.on("line", line => {
  if (line === 'exit') rl.close();
  if (line === 'ls') fs.getPath();
  console.log("You entered: " + line);
  rl.prompt();
});

rl.on("close", () => {
  process.exit(0);
});
