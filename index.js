const program = require('commander');
const getStockInfo = require('./src/stock');

const ParseInt = (value) => parseInt(value);

program.option('-c, --code <number>', '輸入代碼', ParseInt).parse(process.argv);

if (program.code) getStockInfo(program.code);
