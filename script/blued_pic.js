// Surge script to capture flash photos and send a notification

// Surge Script Format
/*
[Script]
闪照捕获 = type=http-response, pattern=https:\/\/burn-chatfiles\.bldimg\.com\/burn_chatfiles\/users\/.*\.jpg!o.png, requires-body=1, max-size=0, script-path=path_to_this_script.js

[MITM]
hostname = burn-chatfiles.bldimg.com
*/

const url = $request.url;
const headers = $request.headers;

if (headers["User-Agent"] && (headers["User-Agent"].indexOf("Blued") !== -1 || headers["User-Agent"].indexOf("blued") !== -1)) {
    try {
        const storedUrl = $persistentStore.read("pngUrl");

        if (!storedUrl || storedUrl !== url) {
            $persistentStore.write(url, "pngUrl");
            $notification.post("成功捕获密照", "点击此通知查看PNG", "", {
                "open-url": url,
                "media-url": url
            });
        }
    } catch (error) {
        console.log("Error:", error.message);
        $notification.post("代码执行出错", "", error.message);
    }
}

$done({});
