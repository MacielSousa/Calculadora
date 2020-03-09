class CalcController{
    //Metoto Contrutor
    constructor(){

        this._audio = new Audio('click.mp3');
        this._lastOperator = '';
        this._lastNumber = '';
        this._audioOnOff = false;

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

        this.initKeyboard();

    }


        //Metodo que trabalha para que a horas fique atualizando no display da calculadora em 1 em 1 segundo
        initializer(){
            this.setLastNumberToDisplay();
            this.setDisplayDateTime();
            let interval = setInterval(()=>{
              this.setDisplayDateTime();
             }, 1000);
     
             this.setLastNumberToDisplay();
             this.pasteFromClipboard();

             document.querySelectorAll('.btn-ac').forEach(btn=>{
                
                btn.addEventListener('dblclick', e=> {

                    this.toggleAudio();

                });

             });
         }
         toggleAudio(){

            this._audioOnOff = ! this._audioOnOff;

         }

         playAudio(){

            if(this._audioOnOff){
                
                this._audio.currentTime = 0;
                this._audio.play();

            }

         }

         copyToClipboard(){
             let input = document.createElement('input');

             input.value = this.displayCalc;

             document.body.appendChild(input);

             input.select();

             document.execCommand("Copy");

             input.remove();
         }

         pasteFromClipboard(){

            document.addEventListener('paste', e=> {

                let text = e.clipboardData.getData('Text');

                this.displayCalc = parseFloat(text);

                console.log(text);

            });

         }
     
         initKeyboard(){
     
             document.addEventListener('keyup', e => {
                this.playAudio();
                console.log(e.key);
                switch(e.key){

                    case 'Escape':
                        this.clearAll();
                        break;
                    case 'Backspace':
                        this.clearEntry();
                        break;
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case '%':
                        this.addOperation(e.key);
                        break;
                    case 'Enter':
                    case '=':
                        this.calc();
                        break;
                    case '.':
                    case ',':
                        this.addDot();
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
                        this.addOperation(parseInt(e.key));
                        break;
                    case 'c':
                        if(e.ctrlKey) this.copyToClipboard();
                        break
                }


             });
     
         }
     

    //Metodo que seleciona evento e imprime o nome do botão selecionado
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach( event => {

            element.addEventListener(event, fn, false);

        });

    }

    
    clearAll(){
        this._operation = [];
        this._lastOperator = '';
        this._lastNumber = '';
        this.setLastNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
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

    pushOperation(value){
        
        this._operation.push(value);

        if(this._operation.length > 3){
        
            this.calc();

        }
    }

    getResult(){
        

        try{

            return eval(this._operation.join(""));

        }catch(e){
            setTimeout(() => {
                this.setError();
            }, 0);
        }
       

    }

    calc(){

        let last = '';
        
        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){

            let firtsItem = this._operation[0];
            this._operation = [firtsItem, this._lastOperator, this._lastNumber];

        }

        if(this._operation.length > 3){

             last = this._operation.pop();
             this._lastNumber = this.getResult();

        } else{
            
            if(this._operation.length == 3){

                this._lastNumber = this.getLastItem(false);

            }

        }

        let result = this.getResult();

        if(last == '%'){
            
           result /= 100;
           this._operation = [result];

        }else{
        
            this._operation = [result];
            if(last) this._operation.push();

        }

        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true){

        let lastItem;
        for (let i = this._operation.length-1; i>=0; i--){
                if(this.isOperator(this._operation[i]) == isOperator){
                    lastItem = this._operation[i];
                    break;
                }
        }

        if(!lastItem){
            
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }
        return lastItem;

    }

    setLastNumberToDisplay(){
        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;

    }

    addOperation(value){
        
            if(isNaN(this.getLastOperation())){
                
                    if(this.isOperator(value)){

                       if(this._operation.length == 0){

                        this._operation.push(value);
                        

                       }else{

                        this.setLastOperation(value);
                        
                       }                       
    
                    }else{
    
                        this.pushOperation(value);
                        this.setLastNumberToDisplay();
                        
                    }
            }else {
                
                if(this.isOperator(value)){
    
                    this.pushOperation(value);
                         
                } else {
    
                    let newValue = this.getLastOperation().toString() + value.toString();
                    this.setLastOperation(newValue);
                    
                    this.setLastNumberToDisplay();
    
                }
            }
        
    }

    setError(){
        this.displayCalc = "Error";
    }

    addDot(){

        let lastOperation = this.getLastOperation();
        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;
        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        }else{
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();

    }

    execBtn(value){

        this.playAudio();

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
                this.calc();
                break;
            case 'ponto':
                this.addDot();
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

        //Funnção que verifica qual botão sofreu algum tipo de evento(click ou frag) e impreme o nome do botão
        buttons.forEach(btn=>{

            //Chamando metodo que filtra o evento acionado
            this.addEventListenerAll( btn ,"click drag", e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
            });

            //Função para mudar o tipo do modelo do cursor
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer";

            });

        })
        
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

    set displayCalc(value){

        if(value.toString().length > 10){
            this.setError();
            return false;
        }

        this._displayCalcEl.innerHTML = value;

    }

    get currenteDate(){
        return new Date();
    }

    set currenteDate(date){
        this._dateAtual = data;
    }

}