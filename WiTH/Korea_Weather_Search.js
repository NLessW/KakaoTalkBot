importPackage(org.jsoup);

const scriptName = "Weather";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

let today = new Date();   

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let day = today.getDay();  // 요일

let hours = today.getHours(); // 시
let minutes = today.getMinutes();  // 분
let seconds = today.getSeconds();  // 초
let milliseconds = today.getMilliseconds(); // 밀리초

if (msg.startsWith("!w")) {
isWeather = msg.slice(3);

if (msg.startsWith("!w")) {
isWeather = msg.slice(3);

try{
    doc = Jsoup.connect("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=" + isWeather +" 날씨").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36").get();
    section=doc.select("body");
    if(!section.isEmpty()){
      divS=section.select("div.weather_info");
      nowTemp = divS.select("div._today>div>div.temperature_text").text().split("현재 온도")[1];
      updown = divS.select("div._today>div.temperature_info").text().split("요")[0]+"요";
      weather = divS.select("div._today>div.temperature_info").text().split("요")[1].split(" ")[1];
      feelTemp = divS.select("div._today>div.temperature_info").text().split("요")[1].split(" ")[3];
      water = divS.select("div._today>div.temperature_info").text().split("습도")[1].split(" ")[1];
      windLocate = divS.select("div._today>div.temperature_info").text().split("습도")[1].split(" ")[2];
      windSpeed = divS.select("div._today>div.temperature_info").text().split("습도")[1].split(" ")[3];
      microdust = divS.select("div.report_card_wrap>ul>li").get(0).select("span").text();
      nanoMicrodust = divS.select("div.report_card_wrap>ul>li").get(1).select("span").text();
      uvLight=divS.select("div.report_card_wrap>ul>li").get(2).select("span").text();
      var a = "["+year+"."+month+"."+date+" "+ DateId(day) +"]\n"+hours+"시 "+minutes+"분 기준 " + isWeather + " 날씨 입니다.\n";
      replier.reply(a + "--------------------------------------------------\n현재 온도 : "+nowTemp +"\n"+updown+"\n날씨 : "+weather +"\n체감 : "+feelTemp+"\n습도 : "+water+"\n바람 : "+windLocate +" "+windSpeed+"\n미세먼지 : "+microdust+"\n초미세먼지 : "+nanoMicrodust+"\n자외선 : "+uvLight);
    }
    }catch(e){
       replier.reply("Error!\nError Message\n"+e+"\n\nplz call 혁");
      }
    var a = "[오늘의 " + isWeather + " 날씨 입니다.]"+"\u200b".repeat(500);
    replier.reply(a + "\n---------------------------------\n현재 온도 : " + tp + "\n" + updownText + "\n날씨 : " + weatherInfo + "\n체감 : " + feel + "\n습도 : " + water + "\n바람 : " + wind + "\n미세먼지 : " + mise + "\n초미세먼지 : " + chomise + "\n자외선 : " + light);
    Log.d(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+ isWeather +" 검색 \n 결과 : 성공");
  }
    
}
