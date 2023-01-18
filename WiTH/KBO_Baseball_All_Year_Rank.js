const scriptName = "Your_Script_Name";

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

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName){
  let today = new Date();   
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let day = today.getDay();  // 요일

  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds();  // 초
  let milliseconds = today.getMilliseconds(); // 밀리초

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
