class CalcController{
    //Metoto Contrutor
    constructor(){

        this._operation = [];
        //Constante para pegar a local região
        this._locale = 'pt-BR';
        //atribuindo DOM para JavaScript, variavel que manipula dados do display da a calculadora
        this._displayCalcEl = document.querySelector("#display");
        //atribuindo DOM para JavaScript, variavel que manipula a data no display da calculadora
        this._dateEl = document.querySelector("#data");
        //atribuindo DOM para JavaScript, variavel que manipula a hora no display da calculadora
        this._timeEl = document.querySelector("#hora");
        //Contante que trabalha com a Calss Date
        this._currenteDate;
        //Chamada do Metodo para iniciar ficar contanto o tempo em 1 e 1 segundo
        this.initializer();
        //Chamada do Metodo para manipular os eventos de click em buttons e parts
        this.initButtonsEvents();

    }

    //Metodo que seleciona evento e imprime o nome do botão selecionado
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach( event => {

            element.addEventListener(event, fn, false);

        });

    }

    
    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }
    
    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }

    isOperator(value){
        return (['+','-','*','%','/'].indexOf(value) > -1);
    }

    addOperation(value){
        if(isNaN(this.getLastOperation())){
            //String
                if(this.isOperator(value)){

                    setLastOperation(value);

                }else if(isNaN(value)){
                    
                    console.log(value);

                }else{

                    this._operation.push(value);

                }
        }else {
           //Number
           let newValue = this.getLastOperation().toString() + value.toString();
           this.setLastOperation(parseInt(newValue));
           

        }

        console.log(this._operation);
        
    }

    setError(){
        this.displayCalc = "Error";
    }

    execBtn(value){

        switch(value){

            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }

    }


    //Metodo que trabalhar como evento click e selecioinando o tipo de botão que foi acionando o evento click
    initButtonsEvents(){
        //variavel que recebe os buttone parts da calculadora
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        //Imprime os buttões
        console.log(buttons);

        //Funnção que verifica qual botão sofreu algum tipo de evento(click ou frag) e impreme o nome do botão
        buttons.forEach(btn=>{

            //Chamando metodo que filtra o evento acionado
            this.addEventListenerAll( btn ,"click drag", e => {
                //console.log(btn.className.baseVal.replace("btn-",""));
                let textBtn = btn.className.baseVal.replace("btn-", "");
                //console.log(textBtn);
                this.execBtn(textBtn);
            });

            //Função para mudar o tipo do modelo do cursor
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer";

            });

        })
        
    }


    //Metodo que trabalha para que a horas fique atualizando no display da calculadora em 1 em 1 segundo
    initializer(){

       this.setDisplayDateTime();
       let interval = setInterval(()=>{
         this.setDisplayDateTime();
        }, 1000);

    }

    //Metodo ussado para pegar data e horas local
    setDisplayDateTime(){
        this.displayDate = this.currenteDate.toLocaleDateString(this._locale);
        this.displayTime = this.currenteDate.toLocaleTimeString(this._locale);
    }

    //Metodo gets e sets padrão do atributos criado da classe
    get displayTime(){

        return this._timeEl.innerHTML;;

    }

    set displayTime(time){

        return this._timeEl.innerHTML = time;

    }

    get displayDate(){

       return this._dateEl.innerHTML;

    }

    set displayDate(date){

        return this._dateEl.innerHTML = date;
 
     }

    get displayCalc(){

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(valor){

        this._displayCalcEl.innerHTML = valor;

    }

    get currenteDate(){
        return new Date();
    }

    set currenteDate(date){
        this._dateAtual = data;
    }

}