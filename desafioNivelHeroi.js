let nomeHeroi = "Rodrigo";
let classificacao;
let xp = 15500;

if (xp <= 1000)  {
classificacao = "ferro"
}
else if(xp > 1000 && xp <=2000){
classificacao = "bronze"
}
else if(xp >2000 && xp <= 5000){
classificacao = "prata"
}
else if(xp >5000 && xp <= 7000){
classificacao = "ouro"
}
else if(xp >7000 && xp <= 8000){
classificacao = "platina"
}
else if(xp > 8000 && xp <= 9000){
classificacao = "ascendente"
}
else if(xp > 9000 && xp <= 10000){
classificacao = "imortal"
}
else{
  classificacao = "radiante"
}
console.log("o herói " + nomeHeroi  + " está no nivel " +  classificacao);
