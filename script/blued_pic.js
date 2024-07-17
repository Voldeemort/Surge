const notificationTitle = "成功捕获密照";
const notificationBody = "点击查看";
const notificationURL = $request.url;

const storedURLs = getStoredURLs();

if (!storedURLs.includes(notificationURL)) {
    // 发送通知，设置图片 URL 并点击后打开 URL
    sendNotification(notificationTitle, notificationBody, notificationURL);

    // 将该 URL 添加到已通知列表中
    storedURLs.push(notificationURL);
    saveStoredURLs(storedURLs);
}

$done({});

function getStoredURLs() {
    let storedURLs = [];
    if (typeof $persistentStore !== "undefined") {
        storedURLs = $persistentStore.read("notifiedURLs") ? JSON.parse($persistentStore.read("notifiedURLs")) : [];
    } else if (typeof $prefs !== "undefined") {
        storedURLs = $prefs.valueForKey("notifiedURLs") ? JSON.parse($prefs.valueForKey("notifiedURLs")) : [];
    }
    return storedURLs;
}

function saveStoredURLs(urls) {
    if (typeof $persistentStore !== "undefined") {
        $persistentStore.write(JSON.stringify(urls), "notifiedURLs");
    } else if (typeof $prefs !== "undefined") {
        $prefs.setValueForKey(JSON.stringify(urls), "notifiedURLs");
    }
}

function sendNotification(title, body, url) {
    const options = {
        "media-url": url,
        "open-url": url,
        "url": url, // 兼容不同平台
        "action": "open-url"
    };

    if (typeof $notification !== "undefined") {
        $notification.post(title, body, "", options);
    } else if (typeof $notify !== "undefined") {
        $notify(title, body, "", options);
    }
}
