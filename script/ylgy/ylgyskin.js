let obj = JSON.parse($response.body);

for(let i=0; i < obj[5][0][2].sheepClothesData.length; i++){
    obj[5][0][2].sheepClothesData[i].unlock=true;
};
$done({body: JSON.stringify(obj)});
