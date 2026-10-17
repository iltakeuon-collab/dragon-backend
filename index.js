const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());
const API_KEY = process.env.BINANCE_API_KEY;
const SECRET = process.env.BINANCE_SECRET;
function sign(q){return crypto.createHmac('sha256',SECRET).update(q).digest('hex');}
app.get('/',(req,res)=>res.send('Dragon Bot Live'));
app.get('/price',async(req,res)=>{
 const r=await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
 res.json(await r.json());
});
app.get('/balance',async(req,res)=>{
 try{
  const t=Date.now();
  const q=`timestamp=${t}`;
  const s=sign(q);
  const url=`https://api.binance.com/api/v3/account?${q}&signature=${s}`;
  const r=await fetch(url,{headers:{'X-MBX-APIKEY':API_KEY}});
  res.json(await r.json());
 }catch(e){res.json({error:e.message})}
});
app.post('/buy',async(req,res)=>{
 try{
  const t=Date.now();
  const q=`symbol=BTCUSDT&side=BUY&type=MARKET&quoteOrderQty=10&timestamp=${t}`;
  const s=sign(q);
  const url=`https://api.binance.com/api/v3/order?${q}&signature=${s}`;
  const r=await fetch(url,{method:'POST',headers:{'X-MBX-APIKEY':API_KEY}});
  res.json(await r.json());
 }catch(e){res.json({error:e.message})}
});
const PORT=process.env.PORT||10000;
app.listen(PORT,()=>console.log('Live '+PORT));
