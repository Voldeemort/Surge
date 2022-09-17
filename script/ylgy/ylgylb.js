let obj = JSON.parse($response.body);

obj.data["daily_count"]= 1e+300;
obj.data["challenge"]= 1e+300;
obj.data["nick_name"]= “下边的都是垃圾”;

$done({body: JSON.stringify(obj)});
