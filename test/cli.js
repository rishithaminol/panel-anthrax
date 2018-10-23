/* Process arguments before everything */
process.argv.every(function(arg, index){
  if (arg == '-i') {
    console.log(process.argv[index + 1]);
  }
  return true;
});
