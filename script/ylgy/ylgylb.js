let obj = JSON.parse($response.body);

obj.data["daily_count"]= 999999999;
obj.data["challenge"]= 999999999;

$done({body: JSON.stringify(obj)});
