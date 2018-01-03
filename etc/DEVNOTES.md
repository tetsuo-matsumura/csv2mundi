# Diário de Desenvolvimento

Resumo e registro em texto de processos mentais. Este arquivo é um fluxograma do meu pensamento durante o recebimento, desenvolvimento e entrega do desafio.

Não sei se seria melhor usar um twitter ou um moleskine para isso, como é pra aprender a usar essa plataforma, faremos aqui.

## Tasklist

Por enquanto apenas planejar e estudar.

## Brainstorms: Perguntas

## 27/12

* Eu preciso fazer um sistema que pode processar algo muito leve ou muito pesado, porém, precisa ser capaz de processar rápido. Obviamente existem soluções e arquiteturas para isso. Não querem que eu invente uma plataforma nova pra solucionar a velocidade.


* O diferencial do validador me parece ser algo necessário. É algo que surgiria naturalmente se eu tivesse que pensar em como fazer esse desafio. Tenho familiariade com validações em C e Python porque isso é basicamente a matéria de Computação I e II da faculdade. Estou pensando em fazer o resto da aplicação em Node. Será que é muito feio fazer em multilanguage?


* Vou fazer o Validador em uma linguagem que eu já esteja acostumado. Como eu já sei fazer em C e Python, farei desse jeito para não perder tempo.


* Preciso planejar uma arquitetura antes de começar a desenvolver. Vou me basear na arquitetura que montamos durante a entrevista.



* Eu não faço a menor ideia do que seja docker e como uso isso. Pela documentação deles tenho a impressão que deva utilizar desde o início do desenvolvimento pois integrar depois de pronto não é o ideal. Vou dedicar um tempinho para estudar isso antes de fazer o resto para ver se compensa ou não fazer esse diferencial.


* Devo comittar em português ou inglês?

## 28/12


* Montei uma arquitetura que faz sentido para mim. Agora é validar isso e escolher as ferramentas/ how-to-do-it.

![Arquitetura](https://raw.githubusercontent.com/gabrieltet/app-mundipagg/master/etc/resources/diagram.png)

* Estou enviando vários requests seguindo a documentação e gerei um bando de erros. Me pergunto se vão ver isso.

* Finalmente consegui enviar um request com resposta 201. Agora posso começar a pensar no resto da implementação.

* Fiz um gerador de csv simples em node para 1- treinar javascript; 2- gerar csv gigantes para testes posteriores

* Estou lendo sobre streams e execuções synch/asynch. Aparentemente será impossível continuar sem o conhecimento disso.

* Já tenho conhecimento para devar a solução mínima, isto é, com tempo de processamento não otimizado. Este será o MVP e devo terminar hoje se tudo der certo.


## 29/12

* Repensei na arquitetura e estou em dúvida de duas maneiras de implementação. Uma envolve um midpoint com um bando de dados e outra envolve processos mais complexos. Vou entrar em contato em breve com o Ricardo ou Nathan para ver qual é mais interesssante de se utilizar. Não tenho como fazer o MVP sem decidir que tipo de implementação vou seguir. Também é melhor entender melhor como estrutura-se um app de node para tornar o deploy mais fácil posteriormente.

## 30/12

* Vou começar a listar os guias que estou lendo. Infelizmente os que foram lidos antes dessa postagem serão postados apenas se forem lidos novamente.

* Consegui enviar uma transação para o dashboard da Mundi a partir de uma query de consulta no MongoDB. :D!

* Vou estudar sobre as funcionalidade async e non-blocking do Node. Não entendo muito bem o conceito de callback.

* Promises são bem interessantes. Sinto que entendo como a internet toda funciona agora. 

* Acabei de descobrir um parser de csv incrível chamado papaparse. Ele conseguiu processar meu arquivo de 300MB em menos de 1 minuto. Ele também soluciona outros problemas como a detecção de linhas novas e tem suporte para stream. 

## 01/01

* Feliz ano novo!

## 02/01

* Estou conseguindo usar o papaparse para mandar o csv para o mongo e estou conseguindo mandar collections do mongo para o api da mundi. Agora preciso implementar essas duas funções no express para ter o mínimo do proof of concept pronto.

* Estou me divertindo com os resultados se tornando concretos
![fun](https://i.imgur.com/ylHnO4Z.png)

## 03/01

* Estou um pouco travado com o front-end da API. Vou estudar um pouco de Angular pois ele me parece ter as soluções necessárias para os meus problemas.

* Todas as vezes que eu aprendo algo novo eu tenho vontade de reescrever tudo. Vou purge todo o default do express que eu não entendo e escrever em cima do que eu já conheço. Como o objetivo é aprender, não devo ter nada no código que eu não sei como funciona.

* Me lembrei da entrevista e fiquei pensando nas coisas legais que poderiam ser feitas com as tecnologias de hoje no mundo de servidores privados de Ragnarok. Lembrei de um maluco russo que conseguiu criar um frame dentro do jogo que carregava o netflix a partir de um item. Será que dá pra integrar a api da mundi com o rag?

* Eu não vou fazer um flowchart agora mas na minha cabeça o flow da API é da seguinte forma.

  - Frontend -> Recebe o arquivo .csv e envia pra API
  - API -> Recebe o arquivo .csv, manda pro Mongo no modelo da Mundi e retorna o resultado pro Front
  - Frontend -> Envia o pedido de processamento dos pedidos enviados
  - API -> Recebe o processamento, pede pro Mongo os dados e envia pra API da Mundi. Envia o resultado devolta pro Mongo (Status: Complete).
  - Frontend -> Pede para a API todos os pedidos que estão "complete", seu arquivo de origem, data de envio e processamento. Também retorna informações sobre o arquivo buscando pelo (originalFile: arquivo.csv).

## Guias

- http://www.luiztools.com.br/post/tutorial-nodejs-com-mongodb/

- https://www.udemy.com/the-complete-nodejs-developer-course-2/

- http://stackabuse.com/reading-and-writing-json-files-with-node-js/

- https://www.npmjs.com/package/express-fileupload

- https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
