const path = "/storage/emulated/0/botdata/msgRecord/log.json";
const fs = FileStream;
const form = true; // true or false 저장 메시지 출력
const allsee = "\u200b".repeat(500);

if (!fs.read(path)) {
    fs.write(path, "{}");
}

let json = JSON.parse(fs.read(path) || "{}");
const masterUid = "f1635e3e71aa9a32024e131fedff6b9b6a6cda2aa9049cf3a91cecaca1385b88";
const timer = {
    "0": "00", "1": "01", "2": "02", "3": "03", "4": "04", "5": "05", "6": "06", "7": "07", "8": "08", "9": "09",
    "10": "10", "11": "11", "12": "12", "13": "13", "14": "14", "15": "15", "16": "16", "17": "17", "18": "18", "19": "19", "20": "20",
    "21": "21", "22": "22", "23": "23", "24": "24", "25": "25", "26": "26", "27": "27", "28": "28", "29": "29", "30": "30", "31": "31", 
    "32": "32", "33": "33", "34": "34", "35": "35", "36": "36", "37": "37", "38": "38", "39": "39", "40": "40", "41": "41", "42": "42", 
    "43": "43", "44": "44", "45": "45", "46": "46", "47": "47", "48": "48", "49": "49", "50": "50", "51": "51", "52": "52", "53": "53", 
    "54": "54", "55": "55", "56": "56", "57": "57", "58": "58", "59": "59"
};

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, userId, uid) {
    if (msg == "!명령어") {
        var a = "!톡\n\n자기가 보낸 톡의 갯수를 알려줍니다\n\n!카톡순위\n\n현재 방의 채팅 순위를 보여줍니다";
        var title = "명령어 사용법\n\n";
        replier.reply(a + title);
        return;
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
    }

    if (msg == "!삭제") {
        json[room][uid][sender] = [];
        replier.reply("채팅기록을 삭제하였습니다.");
    }

    if (msg === "!톡") {
        let count = json[room][uid][sender].length;

        // 채팅 순위 계산
        let rankings = [];
        Object.keys(json[room]).forEach(userUid => {
            Object.keys(json[room][userUid]).forEach(userSender => {
                let userCount = json[room][userUid][userSender].length;
                rankings.push({ sender: userSender, count: userCount });
            });
        });

        rankings.sort((a, b) => b.count - a.count);
        let rank = rankings.findIndex(r => r.sender === sender) + 1;
        let gap = rank > 1 ? rankings[rank - 2].count - count : (rank === 1 && rankings.length > 1 ? count - rankings[1].count : 0);

        let replyMessage = sender + "님은 총 " + count + "번의 톡을 하셨습니다!\n(현재 " + rank + "위)";
        if (rank === 1 && rankings.length > 1) {
            replyMessage += "\n2위 (" + rankings[1].sender + ")와 " + gap + "회 차이로 1위 유지중입니다!";
        } else if (rank > 1) {
            replyMessage += "\n" + (rank - 1) + "위 (" + rankings[rank - 2].sender + ")와 " + gap + "번 차이입니다!";
        }

        replier.reply(replyMessage);
        return;
    }

    if (msg == "!전체삭제") {
        if (uid == masterUid) {
            json = {};
            replier.reply("삭제완료");
        } else {
            replier.reply("관리자만 사용가능합니다");
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
                let lastMsg = json[room][userUid][userSender][json[room][userUid][userSender].length - 1];
                rankings.push({ sender: userSender, count: count, lastMsg: lastMsg ? lastMsg.msg : "메시지 없음" });
            });
        });
        rankings.sort((a, b) => b.count - a.count);
        let replyMsg = "[" + room + "] 방의 채팅 순위" + allsee + "\n\n전체 : " + formatNumber(totalCount) + " 회\n\n";
        rankings.forEach((rank, index) => {
            const percentage = ((rank.count / totalCount) * 100).toFixed(2);
            if (index == 0) {
                replyMsg += "🥇 " + (index + 1) + "위 🥇 " + rank.sender + "\n마지막 카톡 : " + rank.lastMsg + "\n  - 카톡 수 : " + formatNumber(rank.count) + " 회\n  - 비율 : " + percentage + " %\n\n";
            } else if (index == 1) {
                replyMsg += "🥈 " + (index + 1) + "위 🥈 " + rank.sender + "\n마지막 카톡 : " + rank.lastMsg + "\n  - 카톡 수 : " + formatNumber(rank.count) + " 회\n  - 비율 : " + percentage + " %\n\n";
            } else if (index == 2) {
                replyMsg += "🥉 " + (index + 1) + "위 🥉 " + rank.sender + "\n마지막 카톡 : " + rank.lastMsg + "\n  - 카톡 수 : " + formatNumber(rank.count) + " 회\n  - 비율 : " + percentage + " %\n\n";
            } else {
                replyMsg += (index + 1) + "위 " + rank.sender + "\n마지막 카톡: " + rank.lastMsg + "\n  - 카톡 수 : " + formatNumber(rank.count) + " 회\n  - 비율 : " + percentage + " %\n\n";
            }
        });
        replier.reply(replyMsg);
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
                            let lastMsg = messages[messages.length - 1].msg;
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
            }
            json[room] = {};
            fs.write(path, JSON.stringify(json, null, 4));
            replier.reply(room + "의 대화 내용이 초기화 되었습니다\n총 삭제 : " + formatNumber(count) +" 개의 대화 내용이 삭제되었습니다.");
        } else {
            replier.reply("관리자만 사용가능합니다.");
        }
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
