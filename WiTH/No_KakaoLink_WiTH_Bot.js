importPackage(org.jsoup);

const week={
  "1":"월요일",
  "2":"화요일",
  "3":"수요일",
  "4":"목요일",
  "5":"금요일",
  "6":"토요일",
  "7":"일요일"
};

const kboTeam = {
  "SK":"SK 와이번스",
  "SSG":"SSG 랜더스",
  "넥센":"넥센 히어로즈",
  "키움":"키움 히어로즈",
  "현대":"현대 유니콘즈",
  "태평양":"태평양 돌핀스",
  "LG":"LG 트윈스",
  "KT":"KT 위즈",
  "KIA":"KIA 타이거즈",
  "해태":"해태 타이거즈",
  "NC":"NC 다이노스",
  "삼성":"삼성 라이온즈",
  "롯데":"롯데 자이언츠",
  "두산":"두산 베어스",
  "OB":"OB 베어스",
  "쌍방울":"쌍방울 레이더스",
  "한화":"한화 이글스",
  "빙그레":"빙그레 이글스"
};

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
  if(msg=="!help"){
   var title = "♤ 영동이 사용법 ♤";
   replier.reply(title+"\n==============================\n○ 선수검색 ○\n\n!p 선수이름\n\n!p 뒤에 한칸 띄고 선수 이름을 치면 기본 성적과 함께 선수 검색이 됩니다.\n\n○ 야구순위 검색 ○\n\n!r 년도4자리\n\n!r 뒤에 한칸띄고 검색할 년도 4자리를 입력하시면 해당년도의 순위가 검색됩니다.\n\n○ 날씨 검색 ○\n\n!w 지역\n\n!w 뒤에 한칸 띄고 지역이름을 치면 해당지역의 날씨가 검색 됩니다.\n(문학은 문학동으로 검색해주세요)\n\n○ 경기 기록 검색 ○\n\n!d 0000년 00월 00일\n\n!d 뒤에 한칸 띄고 년도 월 일 을 치시면 해당 날짜의 경기 기록이 검색 됩니다. \n\n년 월 일 단위를 한 칸씩 띄워서 써주세요\n\n○코로나 검색○\n\n!코로나\n\n명령어를 친 시간을 기준으로 추가 확진자 등의 정보를 알려줍니다."); 
   Log.d(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 !help 사용 \n결과 : 성공");
   }

if (msg.startsWith("!w")) {
isWeather = msg.slice(3);

try{
    doc = Jsoup.connect("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=" + isWeather +" 날씨").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36").get();
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
    var a = "["+year+"."+month+"."+date+" "+DateId(day)+"\n"+hours+"시 "+minutes+"분 기준 " + isWeather + " 날씨 입니다.]\n"+sender+"님 검색입니다"+"\u200b".repeat(500);
    replier.reply(a + "\n---------------------------------\n현재 온도 : " + tp + "\n" + updownText + "\n날씨 : " + weatherInfo + "\n체감 : " + feel + "\n습도 : " + water + "\n바람 : " + wind + "\n미세먼지 : " + mise + "\n초미세먼지 : " + chomise + "\n자외선 : " + light);
    Log.d(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+ isWeather +"검색 \n 결과 : 성공");
  }
  
  function DateId(day){
    try{
      var result = week[day];
      return result;
    }catch(e){
      replier.reply("요일을 찾을 수 없습니다.");
    }
  }
  
    if(msg=="!코로나"){
        try{
            doc = Jsoup.connect("https://m.search.naver.com/search.naver?where=m&query=%EC%BD%94%EB%A1%9C%EB%82%98&sm=mtb_stc").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36").get();
            section=doc.select("section#_cs_common_production");
            if(!section.isEmpty()){
              apis=section.select("div>div>ul>li");
              info1=apis.get(1).text();
              today=info1.split(" ")[2];
              info2=apis.get(2).text();
              hospital=info2.split(" ")[2];
              info3=apis.get(3).text();
              newHospital=info3.split(" ")[2];
              info4=apis.get(4).text();
              todayDeath=info4.split(" ")[2];
            }
            replier.reply("☣코로나 현황☣\n\n"+year+"."+month+"."+date+" "+DateId(day)+"\n"+hours+"시 "+minutes+"분 기준입니다.\n"+sender+"님 검색입니다"+"\n\n추가 확진자 : "+today+"명\n\n위중증 환자 : "+hospital+"명\n\n입원환자: "+newHospital+"명\n\n사망 : "+todayDeath+"명\n\n🎋코로나 종식 기원🎋");
            Log.d(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 !코로나 사용 \n결과 : 성공");
        }catch(e){
            replier.reply("봇 제작자 혁에게 문의바랍니다.");
            Log.e(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 !코로나 사용 \n결과 : 실패");
        }
    }
 
 
 
 
 if (msg.startsWith("!d")) {
isDate = msg.slice(3);

try{
    doc = Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=" + isDate +" 야구경기일정").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36") .get();
    section = doc.select("section._cs_sports_schedule");
    if(!section.isEmpty()){
        sub = section.select("div.api_subject_bx");
        api = sub.select("div.api_cs_wrap");
        area = api.select("div.db_area");
        dlist = area.select("div.db_list");
        away = dlist.select("table>tbody>tr>td.l_team>span>a");
        awayP = dlist.select("table>tbody>tr>td.l_team>span>p");
        fap=awayP.get(0).text();
        tap=awayP.get(1).text();
        trawp=awayP.get(2).text();
        foap=awayP.get(3).text();
        fifap=awayP.get(4).text();
        
        fTeam=away.get(0).text();
        sTeam=away.get(1).text();
        tTeam=away.get(2).text();
        foTeam=away.get(3).text();
        fifTeam=away.get(4).text();
        score = dlist.select("table>tbody>tr>td.score");
      
        fscore=score.get(0).text();
        sscore=score.get(1).text();
        tscore=score.get(2).text();
        foscore=score.get(3).text();
        fifscore=score.get(4).text();
        
        home=dlist.select("table>tbody>tr>td.r_team>span>a");
        homeP=dlist.select("table>tbody>tr>td.r_team>span>p");
        fhp=homeP.get(0).text();
        thp=homeP.get(1).text();
        thrp=homeP.get(2).text();
        fohp=homeP.get(3).text();
        fifhp=homeP.get(4).text();
        
        fhTeam = home.get(0).text();
        thTeam = home.get(1).text();
        thrTeam = home.get(2).text();
        fohTeam = home.get(3).text();
        fifhTeam = home.get(4).text();
        
        var d ="["+isDate+" 경기입니다.]\n"+sender+"님의 검색입니다."+"\u200b".repeat(500);
        replier.reply(d + "\n---------------------------------\n"+ fTeam + "   " + fscore + "   " + fhTeam + "\n" + fap + "  " + fhp +"\n\n" + sTeam + "   " + sscore + "   " + thTeam + "\n" + tap + "  " + thp +"\n\n" + tTeam + "   " + tscore + "   " + thrTeam + "\n" + trawp + "  " + thrp +"\n\n" + foTeam + "   " + foscore + "   " + fohTeam + "\n" + foap + "  " + fohp +"\n\n" + fifTeam + "   " + fifscore + "   " + fifhTeam +"\n" + fifap + "  " + fifhp + "\n---------------------------------");  
        Log.d(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+isDate+" 경기 결과 검색 \n결과 : 성공");
        
    } 
    }catch(e){
       replier.reply("Error!\n경기 일정이 없습니다.\n에러메세지\n"+e);
       Log.e(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+isDate+" 경기 결과 검색 \n결과 : 실패");
    }
    }
    function isTeam(team){
  try{
    var result = kboTeam[team];
    return result;
  }catch(e){
    return "팀을 찾을 수 없음";
  }
}

if(msg.startsWith("!r ")) {
  isYear=msg.slice(3);
  if(isYear>=2015 && isYear<2023){
    try{
    var data = Jsoup.connect("https://sports.news.naver.com/kbaseball/record/index?category=kbo&year="+isYear).get();
    var day = new Date();
    var a="["+ isYear + "년 기준 "+ "야구 순위" +"]"+"\u200b".repeat(500)+"\n\n";
    var b="";
    for(i=0; i<10; i++){
      b+=data.select("tbody th strong").get(i).text()+"위\n"+ isTeam(data.select("td.tm").get(i).text()) + "\n" + data.select("tbody tr td span").get(11*i+2).text() + "경기 " + data.select("tbody tr td span").get(11*i+3).text() + "승 " + data.select("tbody tr td span").get(11*i+5).text() + "무 " + data.select("tbody tr td span").get(11*i+4).text()+ "패\n승률 : " + data.select("tbody td strong").get(i).text()+"\n승차 : "+data.select("tbody tr td span").get(11*i+6).text()+"\n\n";
}

replier.reply(a+b+"\n\n검색자 : "+sender+" 님");
Log.d(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+isYear+"년 순위검색 \n결과 : 성공");

  }catch(e){
    replier.reply(isYear+"년의 순위를 불러올 수 없습니다\n10팀체제 이후로 검색해주세요.\n10팀 체제는 2015년부터에요!");
    Log.e(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+isYear+"년 순위검색 \n결과 : 실패\n사유\n"+e);
    
  } 
    
  }else if(isYear<2015 && isYear>=2013){
    try{
    var data = Jsoup.connect("https://sports.news.naver.com/kbaseball/record/index?category=kbo&year="+isYear).get();
    var day = new Date();
    var a="["+ isYear + "년 기준 "+ "야구 순위" +"]"+"\u200b".repeat(500)+"\n\n";
    var b="";
    for(i=0; i<9; i++){
      b+=data.select("tbody th strong").get(i).text()+"위\n"+ isTeam(data.select("td.tm").get(i).text()) + "\n" + data.select("tbody tr td span").get(11*i+2).text() + "경기 " + data.select("tbody tr td span").get(11*i+3).text() + "승 " + data.select("tbody tr td span").get(11*i+5).text() + "무 " + data.select("tbody tr td span").get(11*i+4).text()+ "패\n승률 : " + data.select("tbody td strong").get(i).text()+"\n승차 : "+data.select("tbody tr td span").get(11*i+6).text()+"\n\n";

}

replier.reply(a+b+"\n\n검색자 : "+sender+" 님");
Log.d(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+isYear+"년 순위검색 \n결과 : 성공");

  }catch(e){
    replier.reply(isYear+"년의 순위를 불러올 수 없습니다\n10팀체제 이후로 검색해주세요.\n10팀 체제는 2015년부터에요!");
    Log.e(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+isYear+"년 순위검색 \n결과 : 실패\n사유\n"+e);
    
  } 
  }else if(isYear>=1991 && isYear<2013){
    try{
    var data = Jsoup.connect("https://sports.news.naver.com/kbaseball/record/index?category=kbo&year="+isYear).get();
    var day = new Date();
    var a="["+ isYear + "년 기준 "+ "야구 순위" +"]"+"\u200b".repeat(500)+"\n\n";
    var b="";
    for(i=0; i<8; i++){
      b+=data.select("tbody th strong").get(i).text()+"위\n"+ isTeam(data.select("td.tm").get(i).text()) + "\n" + data.select("tbody tr td span").get(11*i+2).text() + "경기 " + data.select("tbody tr td span").get(11*i+3).text() + "승 " + data.select("tbody tr td span").get(11*i+5).text() + "무 " + data.select("tbody tr td span").get(11*i+4).text()+ "패\n승률 : " + data.select("tbody td strong").get(i).text()+"\n승차 : "+data.select("tbody tr td span").get(11*i+6).text()+"\n\n";

}

replier.reply(a+b+"\n\n검색자 : "+sender+" 님");
Log.d(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+isYear+"년 순위검색 \n결과 : 성공");

  }catch(e){
    replier.reply(isYear+"년의 순위를 불러올 수 없습니다\n1991년 이후 순위로 부탁드려요!");
    Log.e(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+isYear+"년 순위검색 \n결과 : 실패\n사유\n"+e);
    
  } 
  }else if(isYear>=2023){
    replier.reply(isYear+"년은 아직 시즌이 진행되지 않았습니다!");
    Log.e(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+isYear+"년 순위검색 \n결과 : 실패\n사유\n해당 시즌 미진행");
  }else{
    replier.reply("1991년 이후 순위로 검색가능합니다.");
    Log.e(year+"/"+month+"/"+date+"\n"+hours+ " : " + minutes + " : " + seconds + " : " +milliseconds + "\n" + sender + "님이 "+isYear+"년 순위검색 \n결과 : 실패\n사유\n검색 허용 범위 초과");
  }
}
}

   
