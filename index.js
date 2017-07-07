var Fontmin = require('fontmin');

var fontmin = new Fontmin()
  .src('fonts/source.ttf')
  .use(Fontmin.glyph({
    text: '今個夏日，一齊重溫美味回憶兼贏巨獎！凡購買阿波羅任何產品滿港幣$10即可登記參加大抽隨時走Samsung 8機會以金額*計算每HK消費享次多中（例：了6有如此類推。）廣期27年月4至95(GB共份,總值Nitedowch遊戲主部現禮券辦法在專頁物單據或將相片連同人資料姓名、身證號碼頭位數字電郵及話WAp實質付款不限與朋友分查詢熱線請按這裡閱詳細條則生意的競賽牌照X',
    hinting: false
  }))
  .use(Fontmin.ttf2eot())
  .use(Fontmin.ttf2woff({
    deflate: true
  }))
  .dest('bulid');

fontmin.run(function(err, files){
  if(err){
    throw err;
  }
});