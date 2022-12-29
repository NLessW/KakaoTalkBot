importPackage(org.jsoup);
const scriptName = "Your Script Name";
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

if (msg.startsWith("!p")) {
isPlayer = msg.slice(3);

try{
     doc = Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=야구선수" + isPlayer).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36") .get();
     section = doc.select("section._au_people_content_wrap");

     if(!section.isEmpty()){
       info = section.select("div.cm_info_box div.detail_info");
       logo = section.select("div.cm_top_wrap");
       bit=info.select("div.detail_info>a>img").attr("src");
       bit2=logo.select("div.team_thumb>a>img").attr("src");
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
     }
   }  catch(e){
       replier.reply("Error!\nError Message\n"+e+"\n\nplz call 혁");
   }
   replier.reply(isPlayer +"의 검색결과\n" + isNumber + " " + isPlayer + "\n출생 : " + isBirth + "\n신체 : " + isBody + "\n소속사 : " + isCompany + "\n소속팀 : " + isTeam + "\n포지션 : " + isPosition + "\n\n시즌기록 (" + isSeason + ")\n" + isRecordText1 + " : " + isRnum1 + "\n" 
   + isRecordText2 + " : " + isRnum2 + "\n" + isRecordText3 + " : " + isRnum3 + "\n" + isRecordText4 + " : " + isRnum4);
   }
   }
