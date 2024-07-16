// Surge script to capture flash photos and send a notification

// Surge Script Format
/*
[Script]
闪照捕获 = type=http-response, pattern=https:\/\/burn-chatfiles\.bldimg\.com\/burn_chatfiles\/users\/.*\.jpg!o.png, requires-body=1, max-size=0, script-path=path_to_this_script.js

[MITM]
hostname = burn-chatfiles.bldimg.com
*/

const notificationTitle = "成功捕获密照";
const notificationBody = "点击查看";
const notificationURL = $request.url;
const userAgent = $request.headers["User-Agent"] || $request.headers["user-agent"];

if (userAgent && (userAgent.indexOf("Blued") !== -1 || userAgent.indexOf("blued") !== -1)) {
    try {
        const storedURLs = $persistentStore.read("notifiedURLs") ? JSON.parse($persistentStore.read("notifiedURLs")) : [];

        if (!storedURLs.includes(notificationURL)) {
            $notification.post(notificationTitle, notificationBody, notificationURL, { "open-url": notificationURL });

            storedURLs.push(notificationURL);
            $persistentStore.write(JSON.stringify(storedURLs), "notifiedURLs");
        }
    } catch (error) {
        console.log("Error:", error.message);
        $notification.post("代码执行出错", "", error.message);
    }
}

$done({});
