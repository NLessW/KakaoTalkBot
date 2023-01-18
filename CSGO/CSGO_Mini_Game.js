importPackage(org.jsoup);

const RankList = {
  "0":"Unranked",//0~100
  "1":"Silver I",//100~200
  "2":"Silver II",//200~300
  "3":"Silver III",//300~400
  "4":"Silver IV",//400~500
  "5":"Silver Elite",//500~600
  "6":"Silver Eilte Master",//600~700
  "7":"Gold Nova I",//700~900
  "8":"Gold Nova II",//900~1100
  "9":"Gold Nova III",//1100~1300
  "10":"Gold Nova Master",//1300~1500
  "11":"Master Guardian I",//1500~1800
  "12":"Master Guardian II",//1800~2100
  "13":"Master Guardian Elite",//2100~2400
  "14":"Distinguished Master Guardian",//2400~2700
  "15":"Legendary Eagle",//2700~3100
  "16":"Legendary Eagle Master",//3100~3600
  "17":"Supreme Master First Class",//3600~6000
  "18":"The Global Elite",//6000~15000
  "19":"HERO",//15000~40000
  "20":"Master Piece"//40000
};

const status={
  "Public":"공개",
  "Private":"비공개",
  "None":"없음",
  "Banned":"있음"
};

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
var csgoBox = Math.floor(Math.random()*(2023-0)-0);
var bsPrice = Math.floor(Math.random()*(500-0)+1);
var psPrice = Math.floor(Math.random()*(20000-0)+501);
var pkPrice = Math.floor(Math.random()*(50000-0)+6000);
var rsPrice = Math.floor(Math.random()*(100000-0)+30000);
var ksPrice = Math.floor(Math.random()*(3000000-0)+80000);
var rP = Math.floor(Math.random()*(100-0)+30);
var dP = Math.floor(Math.random()*(50-0)+15);
var lP = Math.floor(Math.random()*(50-0)+5);
var rwP = Math.floor(Math.random()*(100-0)+1);
//var userRp=Math.floor(Math.floor.random()*(3500-0)+100);

function rankId(uRank){
  try{
    var result = RankList[uRank];
    return result;
  }catch(e){
    replier.reply("랭크 정보를 찾을 수 없음");
  }
}

function uStats(us){
  try{
    var result = status[us];
    return result;
  }catch(e){
    replier.reply("정보를 찾을 수 없음");
  }
}

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

  
  if(msg=="!상자깡"){
    try{
    var c = JSON.parse(FileStream.read("/storage/emulated/0/botdata/"+sender+".json"));
    var price = 3000;
    if(Number(c.money)>=3000){
      c.money=Number(c.money)-Number(price);
      replier.reply("상자를 까겠습니다..");
      java.lang.Thread.sleep(1000);
      replier.reply("상자가 돌아가는 중...");
    java.lang.Thread.sleep(3000);
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
      
      
      if(msg=="!업데이트"){
        try{
          var a=JSON.parse(FileStream.read("/storage/emulated/0/botdata/matchData/"+sender+".json"));
          if(a.name==sender){
            replier.reply(sender+"님은 이미 업데이트를 한 유저입니다");
          }
          } catch(e){
            var userData = {"name":sender, "total":0,"win" : 0, "lose" : 0, "draw" : 0, "winRate":0.0,"rankPoint":50,"tier":0 };
            user = JSON.stringify(userData);
            FileStream.write("/storage/emulated/0/botdata/matchData/"+sender+".json",user);
            java.lang.Thread.sleep(700);
            replier.reply("업데이트 완료!");
        }
      }
      
      if(msg=="!경쟁"){
        try{
          var tCount=0;
        var mCount=0;
        var i=0;
        replier.reply("게임을 시작합니다...");
        java.lang.Thread.sleep(3000);
        replier.reply("게임 결과를 불러오고 있습니다...");
        java.lang.Thread.sleep(3000);
        while(i<31){
          var tScore = Math.floor(Math.random()*(100-0)+1);
          var mScore = Math.floor(Math.random()*(100-0)+1);
          var c=JSON.parse(FileStream.read("/storage/emulated/0/botdata/matchData/"+sender+".json"));
          var d=JSON.parse(FileStream.read("/storage/emulated/0/botdata/"+sender+".json"));
          if(tScore>mScore){
            tCount++;
            tScore=0;
            i++;
          }else if(tScore<mScore){
            mCount++;
            mScore=0;
            i++;
          }
          if(tCount>=16){
            c.lose=Number(c.lose)+1;
            c.rankPoint=Number(c.rankPoint)-Number(lP);
            d.money=d.money+rwP;
            replier.reply(sender+"님의 게임 결과\n\n=================\n\n상대팀 스코어 : "+tCount+"\n팀 스코어 : "+mCount+"\n패배하셨습니다.\n까인 점수 : "+lP+"\n현재 점수 : "+c.rankPoint+"\n\n받은 금액 : "+rwP+"원");
            break;
          }
          if(mCount>=16){
            c.win=Number(c.win)+1;
            c.rankPoint=Number(c.rankPoint)+Number(rP);
            d.money=d.money+rwP;
            replier.reply(sender+"님의 게임 결과\n\n=================\n상대팀 스코어 : "+tCount+"\n팀 스코어 : "+mCount+"\n승리하셨습니다.\n받은 점수 : "+rP+"\n현재 점수 : "+c.rankPoint+"\n\n받은 금액 : "+rwP+"원");
            break;
          }
          if(tCount==15 && mCount==15){
            c.draw=Number(c.draw)+1;
            c.rankPoint=Number(c.rankPoint)+Number(dP);
            d.money=d.money+rwP;
            replier.reply(sender+"님의 게임 결과\n\n=================\n상대팀 스코어 : "+tCount+"\n팀 스코어 : "+mCount+"\n무승부하셨습니다.\n받은 점수 : "+dP+"\n현재 점수 : "+c.rankPoint+"\n\n받은 금액 : "+rwP+"원");
            break;
          }
        }
        c.total=Number(c.total)+1;
        c.winRate=Math.round(Number(c.win)/Number(c.total)*100);
        if(c.tier==0 && c.rankPoint>=100){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==1 && c.rankPoint>=200){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==2&&c.rankPoint<=200){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==2&&c.rankPoint>=300){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==3&&c.rankPoint<=300){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==3&&c.rankPoint>=400){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==4&&c.rankPoint<=400){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==4&&c.rankPoint>=500){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==5&&c.rankPoint<=500){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==5&&c.rankPoint>=600){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==6&&c.rankPoint<=600){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==6&&c.rankPoint>=700){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==7&&c.rankPoint<=700){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==7&&c.rankPoint>=900){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==8&&c.rankPoint<=900){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==8&&c.rankPoint>=1100){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==9&&c.rankPoint<=1100){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==9&&c.rankPoint>=1300){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==10&&c.rankPoint<=1300){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==10&&c.rankPoint>=1500){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==11&&c.rankPoint<=1500){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==11&&c.rankPoint>=1800){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==12&&c.rankPoint<=1800){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==12&&c.rankPoint>=2100){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==13&&c.rankPoint<=2100){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==13&&c.rankPoint>=2400){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==14&&c.rankPoint<=2400){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==14&&c.rankPoint>=2700){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==15&&c.rankPoint<=2700){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==15&&c.rankPoint>=3100){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==16&&c.rankPoint<=3100){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==16&&c.rankPoint>=3600){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==17&&c.rankPoint<=3600){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==17&&c.rankPoint>=6000){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==18&&c.rankPoint<=6000){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==18&&c.rankPoint>=20000){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==19&&c.rankPoint<=20000){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==19&&c.rankPoint>=50000){
          c.tier=c.tier+1;
          replier.reply("승급하셨습니다.\n현재티어 : " + rankId(c.tier));
        }else if(c.tier==20&&c.rankPoint<=50000){
          c.tier=c.tier-1;
          replier.reply("강등당하셨습니다.\n현재티어 : " + rankId(c.tier));
        }
        
        finalData=JSON.stringify(c);
        finalData2=JSON.stringify(d);
        FileStream.write("/storage/emulated/0/botdata/matchData/"+sender+".json",finalData);
        FileStream.write("/storage/emulated/0/botdata/"+sender+".json",finalData2);
        }catch(e){
          replier.reply("회원만 게임이 가능합니다");
        }
      }
  
    if(msg=="!내정보"){
    try{
      var b=JSON.parse(FileStream.read("/storage/emulated/0/botdata/"+sender+".json"));
      var c=JSON.parse(FileStream.read("/storage/emulated/0/botdata/matchData/"+sender+".json"));
      if(b.name==sender){
        replier.reply("["+sender+"] 님의 정보\n\n티어 : "+rankId(c.tier)+" ("+c.rankPoint+")\n\n보유 자산 : "+b.money+"원\n\n---게임승률---\n"+c.total+"전 "+c.win+"승 "+c.lose+"패 "+c.draw+"무\n승률 : "+c.winRate+"%\n\n---보유 스킨 갯수---\n파란색 스킨 : "+b.blue+"개\n보라색 스킨 : "+b.purple+"개\n분홍색 스킨 : "+b.pink+"개\n빨간색 스킨 : "+b.red+"개\n칼 스킨 : "+b.knife+"개\n자산 가치 : "+b.allP+"원");
      }
    }catch(e){
      replier.reply("회원 정보를 찾을수없거나 회원가입이 안된 유저입니다.");
      Log.e(e);
    }
  }
  
  if(msg.startsWith("!c")){
    isUser = msg.slice(3);
    try{
        doc=Jsoup.connect("https://steamrep.com/search?q="+isUser).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36").get();
        section = doc.select("body");
        if(!section.isEmpty()){
            isDiv = section.select("div#wrapper");
            isCon = isDiv.select("div#container");
            isMain = isCon.select("div#main");
            isProfile = isMain.select("div#profileinfo");
            isSection = isProfile.select("div#profileinfosection");
            isData = isSection.select("div#profiledatabox");
            isNameLine = isData.select("div#profilenameline");
            divSelector = isNameLine.select("div");
            nick=divSelector.select("span");
            name=nick.get(0).text();
            divS = divSelector.get(6);
            isSpan = divS.select("span");
            isLink = isSpan.select("a").attr("href");
            isNumber = isLink.split("/");
            isNum = isNumber[4];
          
            isTable=isData.select("table");
            firstTable=isTable.get(0);
            join=firstTable.select("tbody>tr.a01>td");
            joinTd=join.get(1);
            joinDay=joinTd.select("span").text();
            
            secTable=isTable.get(1);
            profileInfo = secTable.select("tbody>tr.a01>td");
            open=profileInfo.get(1);
            openProfile=open.select("span>span").text();
            var pu = openProfile;
            trade=profileInfo.get(3);
            tBan=trade.select("span>span").text();
            
            vac=profileInfo.get(5);
            vacBan = vac.select("span>span").text();
            
            div=isData.select("div#steamids").text();
            id3=div.split("|");
            is3Ids=id3[2];
            is3IdSplit=is3Ids.split(" ");
            is3Id=is3IdSplit[2];
            
            id32=id3[3];
            is32IdSplit=id32.split(" ");
            isId32=is32IdSplit[2];
            
            replier.reply(name+"님의 스팀 정보\n\n==============================\n\n계정ID : "+isNum+"\nSteam3ID : "+is3Id+"\nSteamID32 : "+isId32+"\n계정 생성일 : "+joinDay+"\n프로필 공개 여부 : "+uStats(openProfile)+"\n트레이드 밴 기록 : "+uStats(tBan)+"\nVAC 기록 : "+uStats(vacBan)+"\n\n프로필 주소\nhttps://steamcommunity.com/profiles/"+isNum);
          
        }
    }catch(e){
        replier.reply("커스텀링크나 기존 숫자ID로 검색해주세요! ");
    }
  }
  
}
      
