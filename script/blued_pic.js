const url = $request.url;
const headers = $request.headers;

if (headers["user-agent"] && (headers["user-agent"].indexOf("Blued") !== -1 || headers["user-agent"].indexOf("Blued") !== -1)) {
    try {
        const notify = $persistentStore.read("pngUrl");
        if (!notify || notify !== url) {
            $persistentStore.write(url, "pngUrl");
            $notification.post("Eric已成功捕获baby密照", "点击此通知查看PNG", "", { 'open-url': url, 'media-url': url });
        }
    } catch (e) {
        console.error("代码执行出错:", e.message);
        $notification.post("代码执行出错", "", e.message);
    }
}

$done({});
