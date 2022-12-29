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

try{
    doc = Jsoup.connect("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=" + isWeather +" 날씨").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36") .get();
    section = doc.select("section.cs_weather_new");
    if(!section.isEmpty()){
        region = doc.select("div.title_area > h2.title").text();
        temp = doc.select("div._today > div.weather_graphic > div.temperature_text > strong").text();
        tp = temp.replace("현재 온도", "");
        tempInfo = doc.select("div._today div.temperature_info");
        updown = tempInfo.select("p.summary > span.temperature").text();
        updownText = "어제보다 " + updown;
        weatherInfo = tempInfo.select("p.summary > span.weather").text();
        dd = tempInfo.select("dl.summary_list > dd");
        feel = dd.get(0).text();
        water = dd.get(1).text();
        wind = dd.get(2).text();
        charts = doc.select("ul.today_chart_list > li.item_today");
        mise = charts.get(0).select("a > span.txt").text();
        chomise = charts.get(1).select("a > span.txt").text();
        light = charts.get(2).select("a > span.txt").text();
    } 
    }catch(e){
       replier.reply("Error!\nError Message\n"+e+"\n\nplz call 혁");
      }
    var a = "[오늘의 " + isWeather + " 날씨 입니다.]"+"\u200b".repeat(500);
    replier.reply(a + "\n---------------------------------\n현재 온도 : " + tp + "\n" + updownText + "\n날씨 : " + weatherInfo + "\n체감 : " + feel + "\n습도 : " + water + "\n바람 : " + wind + "\n미세먼지 : " + mise + "\n초미세먼지 : " + chomise + "\n자외선 : " + light);
    Log.d(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+ isWeather +" 검색 \n 결과 : 성공");
  }
    
}
