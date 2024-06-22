const path = "/storage/emulated/0/botdata/msgRecord/log.json";
const fs = FileStream;
const form = true; // true or false 저장 메시지 출력
const allsee = "\u200b".repeat(500);
if (!fs.read(path)) {
    fs.write(path, "{}");
}

let json = JSON.parse(fs.read(path));
const masterUid = "Your_UID";
const timer = {
    "0": "00", "1": "01", "2": "02", "3": "03", "4": "04", "5": "05", "6": "06", "7": "07", "8": "08", "9": "09",
    "10": "10", "11": "11", "12": "12", "13": "13", "14": "14", "15": "15", "16": "16", "17": "17", "18": "18", "19": "19", "20": "20",
    "21": "21", "22": "22", "23": "23", "24": "24", "25": "25", "26": "26", "27": "27", "28": "28", "29": "29", "30": "30", "31": "31", 
    "32": "32", "33": "33", "34": "34", "35": "35", "36": "36", "37": "37", "38": "38", "39": "39", "40": "40", "41": "41", "42": "42", 
    "43": "43", "44": "44", "45": "45", "46": "46", "47": "47", "48": "48", "49": "49", "50": "50", "51": "51", "52": "52", "53": "53", 
    "54": "54", "55": "55", "56": "56", "57": "57", "58": "58", "59": "59"
};

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, userId, uid) {
  if(msg=="!명령어"){
    var a = "!톡\n\n자기가 보낸 톡의 갯수를 알려줍니다\n\n!카톡순위\n\n현재 방의 채팅 순위를 보여줍니다";
    var title = "명령어 사용법\n\n";
    replier.reply(a+title);
  }
    function TimeId(t) {
        try {
            return timer[t];
        } catch (e) {
            replier.reply("시간을 찾을 수 없어요");
        }
    }

    if (!json[room]) json[room] = {};
    if (!json[room][uid]) json[room][uid] = {};
    if (!json[room][uid][sender]) json[room][uid][sender] = [];

    Object.keys(json[room]).forEach(existingUid => {
        if (json[room][existingUid][sender]) {
            Object.keys(json[room][existingUid]).forEach(existingSender => {
                if (existingSender !== sender) {
                    json[room][existingUid][sender] = json[room][existingUid][existingSender];
                    delete json[room][existingUid][existingSender];
                }
            });
        }
    });
    
    if (msg == "!채팅기록") {
        replier.reply('[' + sender + '] 님의 채팅기록입니다.' + allsee + '\n\n' + json[room][uid][sender].map(entry => entry.msg).join('\n') + '\n');
        return;
    }

    if (msg == "!삭제") {
        json[room][uid][sender] = [];
        replier.reply("채팅기록을 삭제하였습니다.");
        return;
    }

    if (msg == "!톡") {
        let count = json[room][uid][sender].length;
        replier.reply(sender + "님은 총 " + count + "번의 톡을 하셨습니다!");
        return;
    }

    if (msg == "!전체삭제") {
      if(uid==masterUid){
        json = {};
        return;
        replier.reply("삭제완료");
        }else{
          replier.reply("관리자만 사용가능합니다");
        }
    }

    if (msg == "!카톡순위") {
        let rankings = [];
        Object.keys(json[room]).forEach(userUid => {
            Object.keys(json[room][userUid]).forEach(userSender => {
                let count = json[room][userUid][userSender].length;
                let lastMsg = json[room][userUid][userSender][json[room][userUid][userSender].length - 1];
                rankings.push({ sender: userSender, count: count, lastMsg: lastMsg ? lastMsg.msg : "메시지 없음" });
            });
        });

        rankings.sort((a, b) => b.count - a.count);
      let replyMsg = "[" + room + "] 방의 채팅 순위" + allsee + "\n\n";
        rankings.forEach((rank, index) => {
            if (index == 0) {
                replyMsg += "🥇 " + (index + 1) + "위 🥇 " + rank.sender + " / 총 " + rank.count + " 회\n마지막 카톡 : " + rank.lastMsg + "\n\n";
            } else if (index == 1) {
                replyMsg += "🥈 " + (index + 1) + "위 🥈 " + rank.sender + " / 총 " + rank.count + " 회\n마지막 카톡 : " + rank.lastMsg + "\n\n";
            } else if (index == 2){
                replyMsg += "🥉 " + (index + 1) + "위 🥉 " + rank.sender + " / 총 " + rank.count + " 회\n마지막 카톡 : " + rank.lastMsg + "\n\n";
            } else {
                replyMsg += (index + 1) + "위 " + rank.sender + " / 총 " + rank.count + " 회\n마지막 카톡: " + rank.lastMsg + "\n\n";
            }
        });

        replier.reply(replyMsg);
    }
  }
  
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    
    const timestamp = '[' + year + '년 ' + month + '월 ' + date + '일 ' + hours + ' : ' + TimeId(minutes) + ' : ' + seconds + '] ' + msg;
    
    json[room][uid][sender].push({
        msg: timestamp
    });

    fs.write(path, JSON.stringify(json, null, 4));

}
function onNotificationPosted(sbn, sm) {
    var packageName = sbn.getPackageName();
    if (!packageName.startsWith("com.kakao.tal"))
        return;
    var actions = sbn.getNotification().actions;
    if (actions == null) return;
    var userId = sbn.getUser().hashCode();
    for (var n = 0; n < actions.length; n++) {
        var action = actions[n];
        if (action.getRemoteInputs() == null)
            continue;
        var bundle = sbn.getNotification().extras;
        var msg = bundle.get("android.text").toString();
        var sender = bundle.getString("android.title");
        var room = bundle.getString("android.subText");
        var uid = bundle.getParcelableArray("android.messages")[0].get("sender_person").getKey();
        if (room == null)
            room = bundle.getString("android.summaryText");
        var isGroupChat = room != null;
        if (room == null) room = sender;
        var replier = new com.xfl.msgbot.script.api.legacy.SessionCacheReplier(packageName, action, room, false, "");
        var icon = bundle.getParcelableArray("android.messages")[0].get("sender_person").getIcon().getBitmap();
        var image = bundle.getBundle("android.wearable.EXTENSIONS");
        if (image != null) image = image.getParcelable("background");
        var imageDB = new com.xfl.msgbot.script.api.legacy.ImageDB(icon, image);
        com.xfl.msgbot.application.service.NotificationListener.Companion.setSession(packageName, room, action);
        if (this.hasOwnProperty("responseFix")) {
            responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, userId != 0, uid);
        }
    }
}
                
