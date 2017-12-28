//Gerador de CSV com dados de cartões de crédito
//Inputs: [2]Quantidade de Linhas, [3]debug, [4]Nome do arquivo(default=output.csv)
//Outputs: nomedoarquivo.csv
console.time('execution time');
var fs = require('fs')
if (process.argv[4] !== undefined ){
	var filename = process.argv[4]+".csv";
} else {
	var filename = "output.csv";
}
var csvStream = fs.createWriteStream(filename, {
  flags: 'a'
});
function rng(max){
	return Math.floor(Math.random() * (max + 1));
};

generateAmount = parseInt(process.argv[2]);

function generateLine(){
	var result = "";
	//Coluna 1: Prioridade (0,1,2)
	var c1 = rng(2);
	//Coluna 2: Valor do Pagamento (0-10000000)
	var c2 = rng(10000000);
	//Coluna 3: Bandeira do cartão
	var bandeiras = ["Visa","Mastercard","Hipercard","Amex","Diners","Elo","Hiper"]
	var c3 = bandeiras[rng(6)];
	//Coluna 4: Numero do cartão
	var c4 = "4111111111111111";
	//Coluna 5: Mês de expiração
	var c5 = rng(11)+1;
	//Coluna 6: Ano de eexpiração do cartão
	var c6d1 = rng(1)+1;
	var c6d2 = rng(9);
	//Coluna 7: Nome do portador do cartão
	var portadores = ["DONALD TRUMP","BILL GATES","ROGER WATERS","JACK WELSH","ANDRE STREET"]
	var c7 = portadores[rng(4)];
	//Coluna 8: CVV do cartão
	var c8d1 = rng(9);
	var c8d2 = rng(9);
	var c8d3 = rng(9);
	result = c1+","+c2+","+c3+","+c4+","+c5+","+c6d1+c6d2+","+c7+","+c8d1+c8d2+c8d3
	return result;
};

for (let j = 0; j < generateAmount; j++){
	csvStream.write(generateLine()+"\r\n");

};

if (process.argv[3] == "debug" || process.argv[3] == "1") {
	debug = generateLine();
	console.log(debug);
}
console.log(generateAmount+" lines were written in "+filename)
console.timeEnd('execution time')