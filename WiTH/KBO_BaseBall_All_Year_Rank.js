const scriptName = "Your_Script_Name";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName){
   if(msg.indexOf("!r ")==0){
   var link = msg.substr(3);
   if(link>=2023){
     replier.reply("시즌을 찾을수 없습니다.");
   }else{
   var data = org.jsoup.Jsoup.connect("https://sports.news.naver.com/kbaseball/record/index?category=kbo&year="+link).get();
   var day=new Date();
   var a="["+msg.substr(3)+"년도 "+"기준"+" 야구 순위 "+"]"+"\u200b".repeat(500)+"\n\n";
   var b="";
   for(i=0;i<10;i++){
   b+=i+1+"위 "+data.select("td.tm").get(i).text()+"\n\n";   
 }
 replier.reply(a+b);
 }
 }
}
