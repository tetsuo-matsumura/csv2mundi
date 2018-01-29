# Desafio Técnico Mundipagg

Ferramenta de processamento de arquivos .csv através da API Legacy da Mundipagg para catalogação de arquivos e geração de relatórios.

## Tecnologias
 - Plataforma
   - Node
     - PapaParse [(Github)](https://github.com/mholt/PapaParse)
     - mongoose
     - spawngo [(Github)](https://github.com/otterthecat/spawngo)
 - DB
   - MongoDB
 - Framework
   - Express
 - Frontend
   - Angular 4
   - ng-file-upload [(Github)](https://github.com/danialfarid/ng-file-upload/)
   - Bootstrap + Font Awesome
   

## Pré-requisitos

 - npm
 - mongodb 3.0.1 +
 - Windows (Compatibilidade com Linux ainda não foi testada).

## Instalação

 Clone ou baixe a versão master em uma pasta, acesse através do console e digite:
 
`npm install`

Edite o arquivo `setup.js` com a URL do seu MongoDB e sua Merchant-Key.  
O MongoDB deve estar ouvindo a porta `27017` (default).

## Utilização

`npm start` ou `node app.js`

## Extra

Para utilizar o gerador de csv localizado com `etc/tools/generate-csv` utilize:  
`node generate-csv.js <quantidade_de_linhas> <"debug" ou 1 para debug> <nome_do_arquivo_de_saida>`
