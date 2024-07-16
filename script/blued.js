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

$notification.post(notificationTitle, notificationBody, notificationURL);
$done({});
