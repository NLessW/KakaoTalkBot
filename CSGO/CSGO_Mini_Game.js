
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
var csgoBox = Math.floor(Math.random()*(2023-0)-0);
var bsPrice = Math.floor(Math.random()*(500-0)+1);
var psPrice = Math.floor(Math.random()*(20000-0)+501);
var pkPrice = Math.floor(Math.random()*(50000-0)+6000);
var rsPrice = Math.floor(Math.random()*(100000-0)+30000);
var ksPrice = Math.floor(Math.random()*(3000000-0)+80000);

if(msg=="!회원가입"){
  try{
     var a=JSON.parse(FileStream.read("/storage/emulated/0/botdata/"+sender+".json"));
     if(a.name==sender){
       replier.reply(sender+"님은 이미 회원가입을 한 유저입니다");
     }
}catch(e){
  var userData = {"name" : sender, "money" : 100000, "blue": 0, "purple": 0, "pink":0,"red":0,"knife":0, "allP":0};
  user = JSON.stringify(userData);
  FileStream.write("/storage/emulated/0/botdata/"+sender+".json",user);
  java.lang.Thread.sleep(700);
  replier.reply("회원가입 완료!");
}
}
 
 if(msg=="!내정보"){
    try{
      var b=JSON.parse(FileStream.read("/storage/emulated/0/botdata/"+sender+".json"));
      if(b.name==sender){
        replier.reply("["+sender+"] 님의 정보\n보유 자산 : "+b.money+"원\n\n---보유 스킨 갯수---\n파란색 스킨 : "+b.blue+"개\n보라색 스킨 : "+b.purple+"개\n분홍색 스킨 : "+b.pink+"개\n빨간색 스킨 : "+b.red+"개\n칼 스킨 : "+b.knife+"개\n자산 가치 : "+b.allP+"원");
      }
    }catch(e){
      replier.reply("회원 정보를 찾을수없거나 회원가입이 안된 유저입니다.");
    }
  }
  
  if(msg=="!상자깡"){
    try{
    var c = JSON.parse(FileStream.read("/storage/emulated/0/botdata/"+sender+".json"));
    var price = 3000;
    if(Number(c.money)>=3000){
      c.money=Number(c.money)-Number(price);
    if(csgoBox<=1593){
      replier.reply(sender+"님께서 78.79% 확률로 파란색 스킨을 얻으셨습니다"+"("+csgoBox+")\n가격 : "+bsPrice+"원");
      c.blue=Number(c.blue)+1;
      c.allP=Number(c.allP)+Number(bsPrice);
    }else if(csgoBox<=1936){
      replier.reply(sender+"님께서 16.96% 확률로 보라색 스킨을 얻으셨습니다"+"("+csgoBox+")\n가격 : "+psPrice+"원");
      c.purple=Number(c.purple)+1;
      c.allP=Number(c.allP)+Number(psPrice);
    }else if(csgoBox<=1993){
      replier.reply(sender+"님께서 2.82% 확률로 분홍색 스킨을 얻으셨습니다"+"("+csgoBox+")\n가격 : "+pkPrice+"원");
      c.pink=Number(c.pink)+1;
      c.allP=Number(c.allP)+Number(pkPrice);
    }else if(csgoBox<=2013){
      replier.reply(sender+"님께서 축하합니다! 0.99% 확률로 빨간색 스킨을 얻으셨습니다!"+"("+csgoBox+")\n가격 : "+rsPrice+"원");
      c.red=Number(c.red)+1;
      c.allP=Number(c.allP)+Number(rsPrice);
    }else if(csgoBox<=2023){
      replier.reply(sender+"님께서 여기서 칼 스킨을 드셨습니다. 0.44%를 뚫으셨습니다. 축하합니다"+"("+csgoBox+")\n가격 : "+ksPrice+"원");
      c.knife=Number(c.knife)+1;
      c.allP=Number(c.allP)+Number(ksPrice);
    }
    finalData=JSON.stringify(c);
    FileStream.write("/storage/emulated/0/botdata/"+sender+".json",finalData);
    }else{
      replier.reply("잔액이 부족합니다");
    }
    }catch(e){
      replier.reply("회원만 상자깡을 할 수 있습니다");
    }
    }
    
    if(msg=="!리필"){
      try{
      var d = JSON.parse(FileStream.read("/storage/emulated/0/botdata/"+sender+".json"));
      if(d.money<=3000){
        d.money=Number(d.money)+100000;
        finalD=JSON.stringify(d);
        FileStream.write("/storage/emulated/0/botdata/"+sender+".json",finalD);
        replier.reply("10만원이 충전되었습니다.\n리필은 판매 업데이트전까지만 가능합니다.");
      }else{
        replier.reply("잔액이 3000원 이하일때만 충전가능합니다");
      }
    }catch(e){
      replier.reply("회원만 리필이 가능합니다");
    }
    }
    
    if(msg=="!업데이트예정"){
      replier.reply("1. 인벤토리 + 판매기능으로 인게임 머니 창출\n\n2. 미니경쟁으로 인게임 머니 창출\n\n3. 미니경쟁으로 인한 티어, 레벨시스템(승패는 미니게임답게 랜덤, 승급도 랜덤");
    }
    if(msg=="!확률공개"){
      replier.reply("파란색 = 78.79% (0~1593까지)\n보라색 = 16.96% (1594~1936까지)\n분홍색 = 2.82% (1937~1993까지\n빨간색 = 0.99% (1994~2013까지)\n칼 = 0.44% (2014~2023까지)");
    }
  }
