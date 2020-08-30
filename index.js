const program = require('commander');
const getStockInfo = require('./src/stock');

program.option('-c, --code <value>', '輸入代碼').parse(process.argv);

if (program.code) getStockInfo(program.code);
