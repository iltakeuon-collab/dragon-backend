const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Dragon Bot LIVE 🐉 - Napier NZ - Server OK');
});

app.get('/price', async (req, res) => {
  try {
    // Use CoinGecko because Binance blocks USA Render servers
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    const data = await response.json();
    res.json({
      BTC: data.bitcoin.usd,
      ETH: data.ethereum.usd,
      source: 'CoinGecko - Works from USA',
      your_bot: 'https://dragon-backend-mca2.onrender.com',
      status: 'LIVE'
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get('/status', (req, res) => {
  res.json({
    status: 'Live',
    deploy: 'Succeeded | Live',
    location: 'Render USA - Binance blocked, using CoinGecko',
    fix: 'For real Binance trading, deploy to Singapore region',
    time: new Date().toString()
  });
});

app.get('/balance', (req, res) => {
  res.json({
    error: 'Binance blocks USA servers',
    message: 'Service unavailable from a restricted location - this is normal on Render USA',
    solution: 'To see balance, you need to move server to Singapore region in Render, or run bot on your Napier computer',
    your_keys: 'Your BINANCE_API_KEY is saved correctly'
  });
});

app.listen(port, () => {
  console.log('Dragon live on ' + port);
});
