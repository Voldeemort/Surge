const notificationTitle = "成功捕获密照";
const notificationBody = "点击查看";
const notificationURL = $request.url;

const storedURLs = $persistentStore.read("notifiedURLs") ? JSON.parse($persistentStore.read("notifiedURLs")) : [];

if (!storedURLs.includes(notificationURL)) {
    // 发送通知，设置图片 URL 并点击后打开 URL
    $notification.post(notificationTitle, notificationBody, "", {
        "media-url": notificationURL,
        "url": notificationURL, // 使用 'url' 参数
        "action": "open-url"
    });

    // 将该 URL 添加到已通知列表中
    storedURLs.push(notificationURL);
    $persistentStore.write(JSON.stringify(storedURLs), "notifiedURLs");
}

$done({});
