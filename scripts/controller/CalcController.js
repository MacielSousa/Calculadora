class CalcController{

    constructor(){

        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currenteDate;
        this.initializer();

    }



    initializer(){

         this.setDisplayDateTime();

       let interval = setInterval(()=>{
         this.setDisplayDateTime();
        }, 1000);

    }

    setDisplayDateTime(){
        this.displayDate = this.currenteDate.toLocaleDateString(this._locale);
        this.displayTime = this.currenteDate.toLocaleTimeString(this._locale);
    }

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