class CalcController{

    constructor(){

        this._displayCalc = "0";
        this._currenteDate;
        this.initializer();

    }


    initializer(){

        let displayCalcEL = document.querySelector("#display");
        let dataEL = document.querySelector("#data");
        let timeEL = document.querySelector("#hora");

        displayCalcEL.innerHTML = "4567";
        dataEL.innerHTML = "04/03/2020";
        timeEL.innerHTML = "11:53"

    }

    get displayCalc(){

        return this._displayCal;

    }

    set displayCalc(valor){

        this._displayCalc = valor;

    }

    get currenteDate(){
        return this._dataAtual;
    }

    set currenteDate(data){
        this._dataAtual = data;
    }

}