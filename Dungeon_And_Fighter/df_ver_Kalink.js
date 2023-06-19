const { KakaoLinkClient } = require('kakaolink');//Call KakaoLink Module
const scriptName = "df";
const apiKey = "Your Neople API Key"; //API Key 
const allsee = "\u200b".repeat(500); //See all Contents
importPackage(org.jsoup); //Jsoup Module

//Date
let today = new Date();   

let year = today.getFullYear(); // year
let month = today.getMonth() + 1;  // month
let date = today.getDate();  // date
let day = today.getDay();  // days

let hours = today.getHours(); // hours
let minutes = today.getMinutes();  // minutes
let seconds = today.getSeconds();  // second
let milliseconds = today.getMilliseconds(); // milisecond

//DF server
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

//Bot main
function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

  //help
 if(msg=="!던봇"){  
   var a = "---던파봇 사용법---\n\n"+allsee;
   var b = "!던파 서버 닉네임\n캐릭터를 검색하는 기능입니다.\n너무 많이쓰면 카카오측 문제로 전송이 안됩니다.\n추후 텍스트로 출력해주는 기능 만들겠습니다.\n\n";
   var c = "!장비 서버 닉네임\n착용하고 있는 장비를 출력해줍니다.\n\n";
   var d = "!w 지역\n날씨 검색입니다. 국내 지역만 가능합니다.\n\n";
   var f = "!톡 or !채팅기록\n본인의 톡 기록과 횟수를 확인합니다.\n\n";
   var g = "!한강\n한강의 수온을 보여줍니다.\n강화 터지셨을때나 뽑기 실패하셨을때 유용할겁니ㄷ..아닙니다.\n\n";
   replier.reply(a+b+c+d+f+g);   
    }

 //DnF Auction Api Ffunction
  function searchItem(itemName) {
  try {
    //API url
    var url = "https://api.neople.co.kr/df/auction?itemName=" + itemName + "&wordType=full&wordShort=true&limit=400&sort=unitPrice:asc&apikey=" + apiKey;
    var itemUrl = JSON.parse(Jsoup.connect(url).ignoreContentType(true).get().text());

    //Item List
    if (itemUrl && itemUrl.rows && itemUrl.rows.length > 0) {
      var result = "";
      var tcount=0
      //var maxResults = Math.min(itemUrl.rows.length,10); //If u want list only 10items
      //Return result
      result+= "경매장 ["+itemName+"] 검색 결과\n"+allsee;
      //Input all data list
      for (var i = 0; i < itemUrl.rows.length; i++) {
        var infoI = itemUrl.rows[i];
        var countFormatted = formatNumber(infoI.count);
        var unitPriceFormatted = formatNumber(infoI.unitPrice);
        var currentPriceFormatted = formatNumber(infoI.currentPrice);
        result += "\n" + infoI.itemName + "\n총 " + countFormatted + "개 -> " + currentPriceFormatted + " 골드\n개당 " + unitPriceFormatted + " 골드\n"; tcount += 1;
        }
      return result+"\n\n조회 결과 : "+tcount+"개"; // 결과 반환
    } else {
      //Http ErrorCode
      var responseCode = Jsoup.connect(url).ignoreContentType(true).execute().statusCode();
      var eText="";
      if (responseCode==200){
        eText += "서버는 정상적인 응답을 했음.\n아이템 이름 확인바람.";
      }else if(responseCode==400){
        eText+="요청에 대한 유효성 검증 실패 또는 필수 파라미터 에러.\n코드 충돌. 개발자에게 문의\n개발자 : [Name_Less]";
      }else if(responseCode==401){
        eText+="인증 오류.\n개발자에게 API키 확인 문의\n개발자 : [Name_Less]";
      }else if(responseCode==404){
        eText+="찾을 수 없음\n이름 확인 바람";
      }else if(responseCode==500){
        eText+="네오플 서버측 오류";
      }else if(respinseCode==503){
        eText+="서버점검 중";
      }
      return "찾을 수 없습니다. (HTTP 오류 코드: " + responseCode + ")\n오류 코드 정보 : "+eText;
    }
  } //if had error
  catch (e) {
    return e;
  }
}
//1000→1,000
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
  //Input item name 
  if(msg.startsWith("!경매 ")){
  var it = msg.substr(4);
  var iii=searchItem(it);
  replier.reply(iii);
}

  //Character Information Api
  function characterId(server,characterName){
    try{
      //Server reset
      var sId= serverId(server);
      //character info url
      var characterURL = JSON.parse(Jsoup.connect("https://api.neople.co.kr/df/servers/"+ sId + "/characters?characterName="+characterName+"&limit=<limit>&wordType=<wordType>&apikey="+apiKey).ignoreContentType(true).get().text());
      //API Parse
      var cId = characterURL["rows"][0]["characterId"];
      return cId;
    }//error code
    catch(e){
    var responseCode = Jsoup.connect(characterURL).ignoreContentType(true).execute().statusCode();
      var eText="";
      if (responseCode==200){
        eText += "서버는 정상적인 응답을 했음.\n캐릭터 이름과 서버 확인바람.";
      }else if(responseCode==400){
        eText+="요청에 대한 유효성 검증 실패 또는 필수 파라미터 에러.\n코드 충돌. 개발자에게 문의\n개발자 : [Name_Less]";
      }else if(responseCode==401){
        eText+="인증 오류.\n개발자에게 API키 확인 문의\n개발자 : [Name_Less]";
      }else if(responseCode==404){
        eText+="찾을 수 없음\n이름과 서버 확인 바람";
      }else if(responseCode==500){
        eText+="네오플 서버측 오류";
      }else if(respinseCode==503){
        eText+="서버점검 중";
      }
      return "찾을 수 없습니다. (HTTP 오류 코드: " + responseCode + ")\n오류 코드 정보 : "+eText;
    }
  }
  //Character's equipment function
  function charWeapon(server,characterName){
    try{
      var seId=serverId(server);
      var cUrl=characterId(server,characterName);
      var weaponUrl=JSON.parse(Jsoup.connect("https://api.neople.co.kr/df/servers/"+seId+"/characters/"+cUrl+"/equip/equipment?apikey="+apiKey).ignoreContentType(true).get().text());
      var result = "";
      var length_1=weaponUrl["equipment"].length;
      //var length_2=weaponUrl["equipment"][2]["upgradeInfo"]["itemName"];
      result += server +" "+characterName+" 님의 장비 정보" + allsee + "\n\n";
      //Data input and return
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
        result+="\n크리쳐\n없음";
      }
      
      return result;
      
    }catch(e){
      var responseCode = Jsoup.connect(weaponUrl).ignoreContentType(true).execute().statusCode();
      var eText="";
      if (responseCode==200){
        eText += "서버는 정상적인 응답을 했음.\n캐릭터 이름과 서버 확인바람.";
      }else if(responseCode==400){
        eText+="요청에 대한 유효성 검증 실패 또는 필수 파라미터 에러.\n코드 충돌. 개발자에게 문의\n개발자 : [Name_Less]";
      }else if(responseCode==401){
        eText+="인증 오류.\n개발자에게 API키 확인 문의\n개발자 : [Name_Less]";
      }else if(responseCode==404){
        eText+="찾을 수 없음\n캐릭터 이름과 서버 확인 바람";
      }else if(responseCode==500){
        eText+="네오플 서버측 오류";
      }else if(respinseCode==503){
        eText+="서버점검 중";
      }
      return "찾을 수 없습니다. (HTTP 오류 코드: " + responseCode + ")\n오류 코드 정보 : "+eText;
    } 
  }

//Input Server and Character Name
if(msg.startsWith("!장비 ")){
  var server=msg.substr(4).split(" ")[0];
  var server_Id=serverId(server);
  var characterName=msg.substr(4).split(" ")[1];
  var we=charWeapon(server, characterName);
  replier.reply(we);
}
  //Now Can't use Kakaolink. So Get error and print Text 
  if(msg.startsWith("!던파 ")){
    let Kakao = new KakaoLinkClient('57edb3612c13ba6fb554dce9b1df1722', 'https://df.nexon.com/');
    Kakao.login('qkqkhih55@gmail.com', 'kjh3155711');
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
        
        jinfo=char_header.select("div.char-header-top>div#char_info").text();
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
      try{
        replier.reply(characterName+"님의 정보\n\n모험단 : "+aText+"\n전직 : "+jinfo+"\n서버 : "+server+"\n순위 : "+rankText+"\n길드 : "+gText+"\n명성 : "+po)
      }catch(e){
        
      }
    }
    
  }

//KBO Search player
if (msg.startsWith("!p")) {
isPlayer = msg.slice(3);
let Kakao = new KakaoLinkClient('JS Kakao Key', 'Setting Link');
Kakao.login('Your Kakao Id', 'Your kakao passwors');
try{
  //Naver Parse
     doc = Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=야구선수" + isPlayer).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36") .get();
     section = doc.select("section._au_people_content_wrap");

     if(!section.isEmpty()){
       info = section.select("div.cm_info_box");
       logo = section.select("div.cm_top_wrap");
       bit=info.select("div.detail_info>a>img").attr("src");
       number = logo.select("span.state_end");
       isNumber = number.get(0).text();
       jobInfo = doc.select("div.first_elss");
       txta = jobInfo.select("span.txt");
       isTeam = txta.get(0).text();
       isPosition = txta.get(1).text();
       dd = info.select("div.info_group dd");
       isBirth = dd.get(0).text();
       isBody = dd.get(1).text();
       isCompany = dd.get(2).text();
       recordDiv = section.select("div.record_info");
       sea = recordDiv.select("span.sub_text");
       isSeason = sea.get(0).text();
       recordUl = recordDiv.select("ul.list > li.item");
       rb = recordUl.select("span.sub_info");
       rbRate = recordUl.select("span.num_info");
       isRecordText1 = rb.get(0).text();//타율or평자
       isRecordText2 = rb.get(1).text();
       isRecordText3 = rb.get(2).text();
       isRecordText4 = rb.get(3).text();
       isRnum1 = rbRate.get(0).text();
       isRnum2 = rbRate.get(1).text();
       isRnum3 = rbRate.get(2).text();
       isRnum4 = rbRate.get(3).text();
       doc2 = Jsoup.connect("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query="+isTeam).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36") .get();
     section2 = doc2.select("section.cs_basketball");
       if(!section2.isEmpty()){
        bx = section2.select("div.api_subject_bx");
        cw = section2.select("div.api_cs_wrap");
        sdb = cw.select("div.cs_sportsdb");
        tir = sdb.select("div.team_intro");
        bit2=tir.select("div.thmb>a>img").attr("src");
        }
        Log.d(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+ isPlayer +" 검색 \n 결과 : 성공");
        
        Kakao.sendLink(room, {

    template_id: Your Template_id, //템플릿 아이디 5자리

    template_args: {

    THU : bit,
    name : isPlayer,
    THU2 : bit2,
    teamN : isTeam,
    recored1 : isRecordText1 + " : " + isRnum1,
    recored2 :  isRecordText2 + " : " + isRnum2,
    recored3 : isRecordText3 + " : " + isRnum3,
    recored4 : isRecordText4 + " : " + isRnum4
    }
    },'custom');
     }
   }  catch(e){
       Log.d("선수 정보를 찾을 수 없습니다."+e);
       Log.e(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+ isPlayer +" 검색 \n 결과 : 실패");
       Log.e(e);
   }
  
}

}

//Read a all Function Fix Code
function onNotificationPosted(sbn, sm) {
  var packageName = sbn.getPackageName();
  if (!packageName.startsWith("com.kakao.tal")) 
  return;
  var actions = sbn.getNotification().actions;
  if (actions == null)
  return;
  var userId = sbn.getUser().hashCode();
  for (var n = 0; n < actions.length; n++) {
    var action = actions[n];
    if (action.getRemoteInputs() == null)
    continue;
    var bundle = sbn.getNotification().extras;
    var msg = bundle.get("android.text").toString();
    var sender = bundle.getString("android.title");
    var room = bundle.getString("android.subText");
    if (room == null) room = bundle.getString("android.summaryText");
    var isGroupChat = room != null;
    if (room == null) room = sender; 
    var replier = new com.xfl.msgbot.script.api.legacy.SessionCacheReplier(packageName, action, room, false, "");
    var icon = bundle.getParcelableArray("android.messages")[0].get("sender_person").getIcon().getBitmap();
    var image = bundle.getBundle("android.wearable.EXTENSIONS");
    if (image != null) 
    image = image.getParcelable("background"); 
    var imageDB = new com.xfl.msgbot.script.api.legacy.ImageDB(icon, image); 
    com.xfl.msgbot.application.service.NotificationListener.Companion.setSession(packageName, room, action);
    if (this.hasOwnProperty("responseFix")) { 
      responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, userId != 0); } } }
