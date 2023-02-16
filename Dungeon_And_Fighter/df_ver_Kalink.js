const { KakaoLinkClient } = require('kakaolink');
const apiKey = "Neople API";
const allsee = "\u200b".repeat(500);
importPackage(org.jsoup);
let today = new Date();   

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let day = today.getDay();  // 요일

let hours = today.getHours(); // 시
let minutes = today.getMinutes();  // 분
let seconds = today.getSeconds();  // 초
let milliseconds = today.getMilliseconds(); // 밀리초

const serverList = {
  "카인":"cain",
  "디레지에":"diregie",
  "시로코":"siroco",
  "프레이":"prey",
  "카시야스":"casillas",
  "힐더":"hilder",
  "안톤":"anton",
  "바칼":"bakal",
  "전체":"all"
};

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {


  function serverId(server){
    try{
      var result = serverList[server];
      return result;
    }catch(e){
      replier.reply("서버 정보를 찾을 수 없습니다.");
    }
  }

  function characterId(server,characterName){
    try{
      var sId= serverId(server);
      var characterURL = JSON.parse(Jsoup.connect("https://api.neople.co.kr/df/servers/"+ sId + "/characters?characterName="+characterName+"&limit=<limit>&wordType=<wordType>&apikey="+apiKey).ignoreContentType(true).get().text());
      var cId = characterURL["rows"][0]["characterId"];
      return cId;
    }catch(e){
      replier.reply("캐릭터 정보를 가져오지 못했습니다.");
    }
  }
  function charWeapon(server,characterName){
    try{
      var seId=serverId(server);
      var cUrl=characterId(server,characterName);
      var weaponUrl=JSON.parse(Jsoup.connect("https://api.neople.co.kr/df/servers/"+seId+"/characters/"+cUrl+"/equip/equipment?apikey="+apiKey).ignoreContentType(true).get().text());
      var result = "";
      var length_1=weaponUrl["equipment"].length;
      //var length_2=weaponUrl["equipment"][2]["upgradeInfo"]["itemName"];
      result += server +" "+characterName+" 님의 장비 정보" + allsee + "\n\n";
      for(var i=0; i<length_1;i++){
        try{
          result+="\n"+weaponUrl["equipment"][i]["slotName"]+"\n+"+weaponUrl["equipment"][i]["reinforce"]+" "+weaponUrl["equipment"][i]["itemName"]+"\nㄴ"+weaponUrl["equipment"][i]["upgradeInfo"]["itemName"]+"\n";
        }catch(e){
        if(weaponUrl["equipment"][i]["slotName"]=="칭호"){
          result+="\n"+weaponUrl["equipment"][i]["slotName"]+"\n"+weaponUrl["equipment"][i]["itemName"]+"\n";
        }else{
        result+="\n"+weaponUrl["equipment"][i]["slotName"]+"\n+"+weaponUrl["equipment"][i]["reinforce"]+" "+weaponUrl["equipment"][i]["itemName"]+"\n";
      }
      }
      
      }
      var petUrl = JSON.parse(Jsoup.connect("https://api.neople.co.kr/df/servers/"+seId+"/characters/"+cUrl+"/equip/creature?apikey="+apiKey).ignoreContentType(true).get().text());
      try{
      result += "\n크리쳐\n"+petUrl["creature"]["itemName"]+"\n";
      }catch(e){
        result+="\n크리쳐\n없음"
      }
      
      return result;
      
    }catch(e){
      replier.reply(e);
    } 
  }


if(msg.startsWith("!장비 ")){
  var server=msg.substr(4).split(" ")[0];
  var server_Id=serverId(server);
  var characterName=msg.substr(4).split(" ")[1];
  var we=charWeapon(server, characterName);
  replier.reply(we);
}

  if(msg.startsWith("!던파 ")){
    let Kakao = new KakaoLinkClient('JS Key', 'domain');
    Kakao.login('Your Kakao ID', 'Your Password');
    var server = msg.substr(4).split(" ")[0];
    var server_Id = serverId(server);
    var characterName = msg.substr(4).split(" ")[1];
    var character_Id = characterId(server,characterName);
    try{
      doc = Jsoup.connect("https://dunfaoff.com/SearchResult.df?server="+server_Id+"&characterid="+character_Id).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36").get();
      section = doc.select("div.p-0");
      if(!section.isEmpty()){
        char_header=section.select("div.char-header");
        bit = "https://img-api.neople.co.kr/df/servers/"+server_Id+"/characters/"+character_Id+"?zoom=3";
        headerP = char_header.select("div.char-header-profile");
        jobRank = headerP.select("div#char_rank");
        rankText = jobRank.select("span.rank-text").text();
        guild = headerP.select("div#char_guild");
        gText = guild.select("span").text();
        adven = headerP.select("div#char_adventure");
        aText = adven.select("span").text();
        mb_1 = headerP.select("div.mb-1");
        lazy = mb_1.get(4);
        po = lazy.select("span.char-header-fame").text();
        Kakao.sendLink(room,{
          template_id:88045,
          template_args:{
            THU : bit,
            NAME : characterName,
            RANK : rankText,
            GUILD : gText,
            POWER : po,
            ADV : aText
          }
        },'custom');
      }
      
    }catch(e){
      replier.reply("정보를 받아올 수 없습니다.");
    }
    
  }
