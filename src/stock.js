const axios = require('axios');
const https = require('https');

const getStockInfo = async (stock) => {
  const url = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_${stock}.tw&json=1&delay=0&_=1598699156261`;
  const response = await axios.get(url, {
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });

  if (response.status === 200) {
    const stockInfo = response.data.msgArray[0];

    const stockName = stockInfo.n;
    const stockNumber = stockInfo.c;
    const dealPrice = parseFloat(stockInfo.z).toFixed(2);
    const dealAmount = stockInfo.s;
    const yesterdayClosingPrice = parseFloat(stockInfo.y).toFixed(2);
    const dailyPricing = (dealPrice - yesterdayClosingPrice).toFixed(2);
    const dailyPricingPercentage = (
      (dealPrice - yesterdayClosingPrice) /
      (yesterdayClosingPrice / 100)
    ).toFixed(2);
    const matchingTime = stockInfo.t;

    console.log(`${stockName}(${stockNumber}) --------------------`);
    console.log(`Highs and lows: ${dailyPricing} (${dailyPricingPercentage}%)`);
    console.log(`Price         : ${dealPrice}`);
    console.log(`Volume        : ${dealAmount}`);
    console.log(`Matching time : ${matchingTime}`);
    console.log(` `);
  }
};

const getStockLink = (stockCode) => {
  const getStockCodeList = stockCode.split(',');

  if (getStockCodeList.length > 3) return console.log('一次只能查詢三檔');

  Promise.all(
    getStockCodeList.map(async (stock) => {
      await getStockInfo(stock);
    }),
  );
};

module.exports = getStockLink;
