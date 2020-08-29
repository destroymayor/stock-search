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

    console.log(`${stockNumber} / ${stockName}`);
    console.log(`Deal price:     ${dealPrice} Amount: ${dealAmount}`);
    console.log(`Highs and lows: ${dailyPricing} (${dailyPricingPercentage}%)`);
  }
};

module.exports = getStockInfo;
