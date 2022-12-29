importPackage(org.jsoup);

const scriptName = "Your_Script_Name";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

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

        
    } 
    }catch(e){
       replier.reply("Error!\n경기 일정이 없습니다.\n에러메세지\n"+e);
    }
    var a ="["+isDate+" 경기입니다.]"+"\u200b".repeat(500);
    replier.reply(a + "\n---------------------------------\n"+ fTeam + "   " + fscore + "   " + fhTeam + "\n" + fap + "  " + fhp +"\n\n" + sTeam + "   " + sscore + "   " + thTeam + "\n" + tap + "  " + thp +"\n\n" + tTeam + "   " + tscore + "   " + thrTeam + "\n" + trawp + "  " + thrp +"\n\n" + foTeam + "   " + foscore + "   " + fohTeam + "\n" + foap + "  " + fohp +"\n\n" + fifTeam + "   " + fifscore + "   " + fifhTeam +"\n" + fifap + "  " + fifhp + "\n---------------------------------");
    }
}
