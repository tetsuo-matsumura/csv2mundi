# Diário de Desenvolvimento

Resumo e registro em texto de processos mentais. Este arquivo é um fluxograma do meu pensamento durante o recebimento, desenvolvimento e entrega do desafio.

Não sei se seria melhor usar um twitter ou um moleskine para isso, como é pra aprender a usar essa plataforma, faremos aqui.

## Tasklist

* Finalizar templates (Done!)
* Implementar upload (Done!)
* Criar endpoints
* Tratamento de erro

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

* Já tenho conhecimento para devar a solução mínima, isto é, com tempo de processamento não otimizado. Este será o MVP e devo terminar hoje se tudo der certo. (26/01: NOPE)


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

## 05/01
 
* Ainda estou estudando Angular, estou preparando os templates e montando a UX para jogar o código quando estiver pronto.

![ux1](https://i.imgur.com/fKUpHnJ.png)
(Template)

![ux2](https://i.imgur.com/nr0nxRR.png)
(Funcional :D!)

## 08/01

* Os commits estão ficando bem grandes. Como agora é mais mão na massa + correções, não estou atualizando muito o Dev notes. Abaixo uma screen do upload funcionando :D!

![up1](https://i.imgur.com/DFrEG5o.png)

## 10/01

* Essa parte mão na massa é bem chatinha. É basicamente codar codar codar. Dá vontade de pegar código pronto mas como não é a proposta estou tentando fazer tudo na mão. Por algum motivo o mongoose está jogando pra collection files e eu não faço idéia de onde isso foi definido. De qualquer maneira consegui botar as queries para funcionar. Amanhã vou investigar a fundo o mongoose.

![working1](https://i.imgur.com/cSADdGE.gif)

* Tirei o resto do dia para ensinar um amigo Node e Angular a partir deste app. Se eu conseguir fazer com que ele entenda e aprenda usando o meu código significa que eu estou dominando o assunto.

# 11/01

* [[heavy breathing]]
![heavy](https://i.imgur.com/PrtABxe.gif)

# 12/01

* Estou trabalhando no parser de csv. Talvez seja a parte mais importante de todas pois tenho que fazer varias funções sem afetar o desempenho. Atualmente o parser sem função alguma está levando vários minutos para ler 1 bilhão de linhas. Não sei se isso é esperado ou ruim. Se na vida real a Mundipagg receber 1 bilhão de transações de um cliente só seria magnífico para todos hehe.

* O sistema de processamento já está conseguindo coletar dados do MongoDB. Vou estudar mais a API da Mundi para tratar os erros antes de enviar. Por exemplo não aceitarem a bandeira Hiper ou cartões AMEX precisarem de 4 códigos de CVV.

![process](https://i.imgur.com/fQZUksn.png)
Imagem: 100 processos enviados de uma vez direto do MongoDB

* O flow do app está ficando bem complexo. Estruturei um diagrama de fluxo para ilustrar o modo de operação atual.

![diagram](https://i.imgur.com/vb8xKI5.png)

# 14/01

* Detectei um bug que pode dar problemas no código mais tarde. Ao dar timeout na promesa de Upload gera-se um novo POST, duplicando a entrada de dados na coleção `fileReport`. Imagino que seja o fato de ter feito o código sem pensar em como as callbacks seriam trabalhadas. Irei dar procedimento da correção pelo issue track do Git: https://github.com/gabrieltet/csv2mundi/issues/1
 
# 15/01

* Estou tendo um pouco de dificuldades para parsear arquivos gigantes. Como eu escrevo código debugando com prints no console, acabei de aprender que o console é async e buffered o que causou memory leak quando eu lotei o buffer. Estou estudando mais sobre o assunto para conseguir trabalhar com files de mais de 1GB.

# 16/01

* Consegui solucionar o parser. Darei uma explicação simples do problema e sua solução. O MongoDB armazena seus documentos no fomarto JSON. Usei a ferramenta papaparse para converter o csv em JSON. O Papaparse fornece um callback para cada linha. A solução inicial era em cada linha gerar um INSERT no MongoDB porém, em arquivos com mais de 1 milhão e linhas essa solução causava memory leak. A solução atual é criar uma stream de leitura para o arquivo .csv e uma stream de escrita para um arquivos .JSON temporário. Dessa maneira a escrita do arquivo JSON a partir de arquivos com mais de 1 milhão de linhas é resolvida em menos de 1 minuto. Após completar, o callback invoca um child process com o mongoimport, ferramenta nativa do Mongo que permite importar arquivo JSON direto para o banco de dados. Importar arquivos com mais de 2GB usando essa ferramenta custam 2 minutos de processamento, tempo aceitável para a solução.

![import](https://i.imgur.com/riinDzL.png)
Imagem: Importando 2.1GB com o mongoimport em pouco mais de 2 minutos.

# 17/01

* ballmer peak

![foidificilpracaceta](https://i.imgur.com/2QNm1yt.gif)

* Estamos na reta final do entregável. :)

# 19/01

* Consertei todos os bugs e dei uma arrumada no código. Falta apenas o envio do dado para a API da Mundi e refazer o sistema de paginação do log de transações. Sinto que devo finalizar até semana que vem.

# 22/01
* Passei os últimos dias testando as respostas da API da Mundipagg. Estou encontrando diversas dificuldades em enviar requests múltiplos. A API não suporta muitos requests múltiplos então tornou-se um gargalo, sendo necessário corrigir o problema no meu end. Uma solução que pensei foi enviar os requests em batches. Uma vez que o problema é a quantidade de requests e não o tamanho deles, isso resolveria o problema. Porém, a API processa os batches mas não envia a resposta para cada transação no CreditCardTransactionResultCollection (apesar de ser uma Array). Também tentei definir um delay entre cada um dos requests, porém, mesmo que os requests estejam 10ms mais adiantados que a API, num arquivo de 1 milhão de linhas acaba-se congestionando a API também. A solução que estou desenvolvendo agora é manter a API ocupada com um número fixo de requests e ir alimentando a API com novos requests conforme ela for respondendo. O fluxo do programa está descrito abaixo. Cada caixa será uma promise e o programa no final darei chain nelas. 

![requester](https://i.imgur.com/Kr14ddo.png)

* Isso tudo está me lembrando bastante do trabalho em linha de produção nas fábricas do Japão. Esse problema é uma abstração de algo real e me senti feliz em ter percebido essa comparação.

# 25/01
* O algoritmo utilizado apresentou um problema: Quando a coleção de documentos do MongoDB estava pesada (100MB+), as queries começaram a demorar mais de 1200ms, fazendo com que a API da Mundipagg respondesse mais rápido que o meu envio. Analisei nos últimos 3 dias soluções diferentes e todas terminavam sendo mais lentas. Utilizei o dia de hoje para reescrever a query e estudar otimizações de queries e consegui otimizar a query de 1200ms para ~20ms, tornando o algoritmo atual utilizável e funcional. Abaixo a velocidade de leitura e escrita do MongoDB numa coleção com mais de 1 milhão de documentos. 

![readspeed](https://i.imgur.com/blCJHDw.gif)

![working](https://i.imgur.com/jUZcPfe.gif)

* Agora é só integrar tudo ao front, criar a função de gerar relatórios e fazer a testagem final.

# 26/01
* Amanhã faz um mês desde que recebi o desafio. A versão mínima já está pronta e disponível no GIT. Posso entregar desse jeito porém quero realizar mais testes e melhorar um pouco o código antes de enviar o e-mail avisando que está tudo pronto.

* Foram 30 dias longos de muito trabalho mas eu aprendi MUITA coisa. Até o início desse DEVNOTE meus conhecimentos eram quase nulos. Não fazia ideia do que era ou como funcionavam async, callbacks, promises, node, express, angular, html5, etc. Estou um pouco chateado que os esforços empregados nesse projeto sejam em uma ferramenta sem usuário, porém, o valor de aprendizado foi imenso. 

## Guias

- http://www.luiztools.com.br/post/tutorial-nodejs-com-mongodb/

- https://www.udemy.com/the-complete-nodejs-developer-course-2/

- http://stackabuse.com/reading-and-writing-json-files-with-node-js/

- https://www.npmjs.com/package/express-fileupload

- https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
