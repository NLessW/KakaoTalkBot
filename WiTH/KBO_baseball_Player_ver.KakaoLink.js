importPackage(org.jsoup);

const { KakaoLinkClient } = require('kakaolink');

const Kakao = new KakaoLinkClient('Your Js key', 'Your domain');

Kakao.login('Your kakao email', 'Your kakao Password');

const scriptName = "Your_Script_Name";

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

if (msg.startsWith("!p")) {
isPlayer = msg.slice(3);

try{
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
       isRecordText1 = rb.get(0).text();
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
     }
   }  catch(e){
       replier.reply(e);
   }
   
Kakao.sendLink(room, {

    template_id: 00000, //Your template Id

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
}

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
