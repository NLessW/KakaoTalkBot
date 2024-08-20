const path = "YOUR_PATH";
const fs = FileStream;
const form = true; // true or false 저장 메시지 출력
const allsee = "\u200b".repeat(500);

let json = fs.read(path);
if (!json) {
  fs.write(path, "{}");
  json = "{}";
}
json = JSON.parse(json);

let remove = {};
const masterUid = "YOUR_UID";

const bottalk = "";
const timer = {
    "0": "00", "1": "01", "2": "02", "3": "03", "4": "04", "5": "05", "6": "06", "7": "07", "8": "08", "9": "09",
    "10": "10", "11": "11", "12": "12", "13": "13", "14": "14", "15": "15", "16": "16", "17": "17", "18": "18", "19": "19", "20": "20",
    "21": "21", "22": "22", "23": "23", "24": "24", "25": "25", "26": "26", "27": "27", "28": "28", "29": "29", "30": "30", "31": "31", 
    "32": "32", "33": "33", "34": "34", "35": "35", "36": "36", "37": "37", "38": "38", "39": "39", "40": "40", "41": "41", "42": "42", 
    "43": "43", "44": "44", "45": "45", "46": "46", "47": "47", "48": "48", "49": "49", "50": "50", "51": "51", "52": "52", "53": "53", 
    "54": "54", "55": "55", "56": "56", "57": "57", "58": "58", "59": "59"
};

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, userId, uid) {
    if (msg === "!명령어") {
        var a = "\n\n!톡\n\n자기가 보낸 톡의 갯수를 알려줍니다\n\n!카톡순위\n\n현재 방의 채팅 순위를 보여줍니다";
        var title = "명령어 사용법";
        var b = "\n\n!채팅기록\n\n자신의 채팅기록을 확인합니다"
        replier.reply(title+a+b);
    }

    if(msg=="!유저아이디"){
        replier.reply(uid);
    }
    
    function TimeId(t) {
        try {
            return timer[t];
        } catch (e) {
            replier.reply("시간을 찾을 수 없어요");
        }
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (!json[room]) json[room] = {};
    if (!json[room][uid]) json[room][uid] = {};
    if (!json[room][uid][sender]) json[room][uid][sender] = [];

    if (msg === "ㅎㅇ" || msg.includes("하이")) {
        if (uid === masterUid || uid === dfMasterUid || uid === mainMasterUid || uid === mainMasterUid2) {
           // replier.reply("어서오세요.");
        } else {
            replier.reply("");
        }
    }

    if (msg.startsWith("!로또 ")) {
        var lottoCount = Number(msg.substr(4));
        
        var allResults = [];
        for (var set = 0; set < lottoCount; set++) {
            var 로또 = []; var i = 0; while (i < 6) {
                var n = Math.floor(Math.random() * 45) + 1;
                if (!로또.includes(n)) {
                    로또.push(n);
                    i++;
                }
            }
            로또.sort((a, b) => a - b);
            allResults.push("세트 " + (set + 1) + ": " + 로또.join(' '));
        }
        var result = "🍀로또 번호 "+ lottoCount+"개🍀\n" + allResults.join('\n') + '\n1등 기원';
        replier.reply(result);
    }
            
    if (msg === "두두") {
        if (uid === masterUid) {
            replier.reply("등장");
            replier.reply("어서오세요. "+sender+"님");
        } else {
            const comment=["두두 뭐","어림없지ㅋ","우리 동네는 밤마다 울려 총성~ 탕!탕! 그르르~ 두두두두 탕!탕!" ,"등잔.","셋 넷 다섯 여섯 일곱 여덟","두두!\n비행포켓몬!","Hit you with that~ ddu-du! ddu-du! du!","사실은 오래전부터 당신같은 사람을 기다려왔다우~","바이바이두 바이야~"];
            replier.reply(comment[Math.floor(Math.random()*comment.length)]);
        }
    }

    if(msg=="!주사위"){
        const diceList = ["1 ⚀ ","2 ⚁ ","3 ⚂ " ,"4 ⚃ " ,"5 ⚄ ","6 ⚅"];
        replier.reply(sender+"님의 주사위는?\n🎲 주사위 결과 : "+diceList[Math.floor(Math.random()*diceList.length)] + "입니다!");
    } 
    if(msg.startsWith("!소라고동")){
      const text = ["안돼","다시 한 번 물어봐","그럼","언젠가는","그것도 안돼","안.돼.","가만히 있어"];
      replier.reply(text[Math.floor(Math.random()*text.length)]);
    }
    if(msg==="!소스코드"){
        var defalutLink = "\n전체 코드\nhttps://github.com/NLessW/KakaoTalkBot/tree/main";
        var katalkRank = "\n\n카톡 순위 코드\nhttps://github.com/NLessW/KakaoTalkBot/blob/main/All_room/rank.js";
        replier.reply("이 봇의 모든 기능은 오픈 소스입니다.\n"+defalutLink+katalkRank);
    }

    if (msg === "!채팅기록") {
        replier.reply('[' + sender + '] 님의 채팅기록입니다.' + allsee + '\n\n' + json[room][uid][sender].join('\n') + '\n');
        return;
    }

    if (msg === "!삭제") {
        if (uid === masterUid || uid === mainMasterUid || uid === mainMasterUid2) {
            json[room][uid][sender] = [];
            replier.reply("채팅기록을 삭제하였습니다.");
            return;
        } else {
            replier.reply("관리자만 가능합니다");
        }
    }

    if (msg === "!톡") {
        let rankings = [];
        Object.keys(json[room]).forEach(userUid => {
            Object.keys(json[room][userUid]).forEach(userSender => {
                let userCount = json[room][userUid][userSender].length;
                rankings.push({ sender: userSender, count: userCount });
            });
        });

        rankings.sort((a, b) => b.count - a.count);
        let userRank = rankings.find(r => r.sender === sender);
        
        if (userRank) {
            let count = userRank.count;
            let rank = rankings.findIndex(r => r.sender === sender) + 1;
            let gap = rank > 1 ? rankings[rank - 2].count - count : (rank === 1 && rankings.length > 1 ? count - rankings[1].count : 0);

            let replyMessage = sender + "님은 총 " + formatNumber(count) + "번의 톡을 하셨습니다!\n(현재 " + rank + "위)";
            if (rank === 1 && rankings.length > 1) {
                replyMessage += "\n2위 (" + rankings[1].sender + ")와 " + formatNumber(gap) + "회 차이로 1위 유지중입니다!";
            } else if (rank > 1) {
                replyMessage += "\n" + (rank - 1) + "위 (" + rankings[rank - 2].sender + ")와 " + formatNumber(gap) + "번 차이입니다!";
            }

            replier.reply(replyMessage);
        } else {
            replier.reply(sender + "님의 톡 기록이 없습니다.");
        }
        return;
    }
    
    if (msg == "!카톡순위") {
    let rankings = [];
    let totalCount = 0;
    
    Object.keys(json[room]).forEach(userUid => {
        Object.keys(json[room][userUid]).forEach(userSender => {
            let count = json[room][userUid][userSender].length;
            totalCount += count;
            let lastMsg = json[room][userUid][userSender][json[room][userUid][userSender].length - 1] || "메시지 없음";
            rankings.push({ sender: userSender, count: count, lastMsg: lastMsg });
        });
    });

    rankings.sort((a, b) => b.count - a.count);

    let replyMsg = "[" + room + "] 방의 채팅 순위" + allsee + "\n\n전체 : " + formatNumber(totalCount) + " 회\n\n";
    rankings.forEach((rank, index) => {
        const percentage = ((rank.count / totalCount) * 100).toFixed(2);
        let rankEmoji = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";
        replyMsg += rankEmoji + " " + (index + 1) + "위 " + rankEmoji + " " + rank.sender + "\n";
    replier.reply(replyMsg);
}
    if (msg === "!잠수정리") {
        if (uid === masterUid) {
            let deletedCount = 0;
            let inactiveUsers = 0;
            
            if (json[room]) {
                let usersToDelete = [];
                for (let userUid in json[room]) {
                    let lastMessageDate = null;
                    
                    for (let sender in json[room][userUid]) {
                        let messages = json[room][userUid][sender];
                        if (messages.length > 0) {
                            let lastMsg = messages[messages.length - 1];
                            let msgDate = lastMsg.match(/\[(\d{4})년 (\d{1,2})월 (\d{1,2})일/);
                            if (msgDate) {
                                let messageDate = new Date(msgDate[1], msgDate[2] - 1, msgDate[3]);
                                if (!lastMessageDate || messageDate > lastMessageDate) {
                                    lastMessageDate = messageDate;
                                }
                            }
                        }
                    }
                    
                    if (lastMessageDate) {
                        let today = new Date();
                        let diffDays = (today - lastMessageDate) / (1000 * 60 * 60 * 24);
                        if (diffDays > 3) {  // 3일 이상 inactive로 변경
                            usersToDelete.push(userUid);
                            for (let sender in json[room][userUid]) {
                                deletedCount += json[room][userUid][sender].length;
                            }
                            inactiveUsers++;
                        }
                    }
                }
                
                usersToDelete.forEach(userUid => {
                    delete json[room][userUid];
                });
                
                fs.write(path, JSON.stringify(json, null, 4));
                replier.reply("잠수자 정리가 완료되었습니다.\n" +
                              "총 " + inactiveUsers + "명의 잠수 유저가 발견되었으며,\n" +
                              deletedCount + "개의 메시지가 삭제되었습니다.");
            } else {
                replier.reply("이 방의 채팅 기록이 없습니다.");
            }
        } else {
            replier.reply("관리자만 사용 가능합니다.");
        }
    }

    if (msg === "!방초기화") {
    if (uid === masterUid) {
        let count = 0;
        if (json[room]) {
            for (let userId in json[room]) {
                for (let sender in json[room][userId]) {
                    count += json[room][userId][sender].length;
                }
            }
            json[room] = {};  // 방 초기화
            fs.write(path, JSON.stringify(json, null, 4));
            replier.reply(room + "의 대화 내용이 초기화 되었습니다\n총 삭제 : " + formatNumber(count) +" 개의 대화 내용이 삭제되었습니다.");
        } else {
            replier.reply(room + "의 대화 내용이 없거나 이미 초기화되어 있습니다.");
        }
    } else {
        replier.reply("관리자만 사용가능합니다.");
    }
    return;  // 함수 종료
}

    if (msg === "!저장해제") {
        if (uid === masterUid) {
            if (!json.ignoredRooms) {
                json.ignoredRooms = [];
            }
            if (!json.ignoredRooms.includes(room)) {
                json.ignoredRooms.push(room);
                fs.write(path, JSON.stringify(json, null, 4));
                replier.reply("이 방의 메시지 저장이 중지되었습니다.");
            } else {
                replier.reply("이 방은 이미 메시지 저장이 중지된 상태입니다.");
            }
        } else {
            replier.reply("관리자만 사용 가능합니다.");
        }
        return;
    }
    
    if (!json.ignoredRooms || !json.ignoredRooms.includes(room)) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
        
        const timestamp = '[' + year + '년 ' + month + '월 ' + date + '일 ' + hours + ' : ' + TimeId(minutes) + ' : ' + seconds + '] ' + msg;
        
        json[room][uid][sender].push(timestamp);
        fs.write(path, JSON.stringify(json, null, 4));
    }
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
