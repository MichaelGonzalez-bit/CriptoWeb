var btc= document.getElementById("bitcoin");
var eth= document.getElementById("ethereum");
var usdt=document.getElementById("tether");
var sol=document.getElementById("solana");
var ada=document.getElementById("cardano");
var doge=document.getElementById("dogecoin")


var liveprice = {

    "async" : true,
    "scroosDomain": true,
    "url":"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Csolana%2Ccardano%2Cdogecoin&vs_currencies=usd",
    "method":"GET",
    "headers":{}

}


$.ajax(liveprice).done(function(response){
    btc.innerHTML= response.bitcoin.usd;
    eth.innerHTML= response.ethereum.usd;
    usdt.innerHTML= response.tether.usd;
    sol.innerHTML= response.solana.usd;
    ada.innerHTML= response.cardano.usd;
    doge.innerHTML= response.dogecoin.usd;


    var table_body = document.getElementById("table_body");
    var cryptocurrencies = ["bitcoin", "ethereum", "tether", "solana", "cardano", "dogecoin"];
    for (let crypto of cryptocurrencies) {
        var row = document.createElement("tr");
        var name = document.createElement("td");
        name.innerText = crypto;
        var price = document.createElement("td");
        price.innerText = response[crypto].usd;
        row.append(name, price);
        table_body.appendChild(row); }

});





/* Seccion Noticias */


var noticias = {
    "apiKey" : "0bee8d27c1374b6180db46517becc22c",
    fetchNoticias:function(categoria){
        fetch("https://newsapi.org/v2/everything?q="+categoria+"&language=es&apiKey="+this.apiKey)
        .then((response)=>response.json())
        .then((data)=>this.displayNoticias(data));
    },
    displayNoticias:function(data){
        for(i=0;i<=2;i++){
            const{title}=data.articles[i];
            let h2= document.createElement("h2");
            h2.textContent = title;

            const{urlToImage}=data.articles[i];
            let img = document.createElement("img");
            img.setAttribute("src",urlToImage);

            let info=document.createElement("div");
            info.className = "info";
            const {publishedAt} = data.articles[i];
            let fecha =document.createElement("span");
            let date=publishedAt;

            date=date.split("T")[0].split("-").reverse().join("-");
            fecha.className = "fecha";
            fecha.textContent = date;

            const{name}=data.articles[i].source;
            let fuente = document.createElement("span");
            fuente.className = "fuente";
            fuente.textContent = name;

            info.appendChild(fecha);
            info.appendChild(fuente);

            const{url}=data.articles[i];

            let item=document.createElement("div");
            item.className = "item";
            item.appendChild(h2);
            item.appendChild(img);
            item.appendChild(info);
            item.setAttribute("onclick", "window.open('" + url + "', '_blank')");
            document.querySelector(".noticias").appendChild(item);


        }
    }
}

noticias.fetchNoticias("criptomonedas");



