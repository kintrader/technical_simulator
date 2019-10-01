export class DrawLine {
    constructor() {
        this._mlX = false;
        this._mlY = false;
    };

    set canvasObj(canvasObj) {this._canvasObj = canvasObj; };

    set cSizeObj(cSizeObj) {this._cSizeObj = cSizeObj; };

    set eObj(eObj) {this._eObj = eObj};

    set end(end) {this._end = end};

    set mlX(mlX) {this._mlX = mlX};

    horizonLine() {
        if(this._canvasObj.getContext){
            let context = this._canvasObj.getContext('2d')
            this._canvasObj.addEventListener('click' , (e) => {
                if(!this._end) {
                    context.strokeStyle = '#aaa'
                    context.beginPath();
                    context.moveTo(0, e.offsetY);
                    context.lineTo(this._canvasObj.width, e.offsetY);
                    context.closePath();
                    context.stroke();
                } else {
                    return;
                }
            }, false)
        }
    };

    verticalLine() {
        if(this._canvasObj.getContext){
            let context = this._canvasObj.getContext('2d')
            this._canvasObj.addEventListener('click' , (e) => {
                if(!this._end) {
                    context.strokeStyle = '#aaa'
                    context.beginPath();
                    context.moveTo(e.offsetX, 0);
                    context.lineTo(e.offsetX, this._canvasObj.height);
                    context.closePath();
                    context.stroke();
                } else {
                    return;
                }
            }, false)
        }
    };

    multiLine() {
        if(this._canvasObj.getContext){
            let context = this._canvasObj.getContext('2d')
            this.handleEvent = (e) => {
                if(!this._end) {
                    if(!this._mlX) {
                        this._mlX = e.offsetX;
                        this._mlY = e.offsetY;
                    } else {
                        context.strokeStyle = '#aaa'
                        context.beginPath();
                        context.moveTo(this._mlX, this._mlY);
                        context.lineTo(e.offsetX, e.offsetY);
                        context.closePath();
                        context.stroke();
                        this._mlX = false;
                        this._mlY = false;
                    }
                } else {
                    this._canvasObj.removeEventListener('click', this , false)
                    return;
                }
            }
            this._canvasObj.addEventListener('click', this , false)
        }
    }

    allClear() {
        let result = confirm('描画内容がすべて失われますがよろしいですか？')
        if(result) {
            let context = this._canvasObj.getContext('2d')
            context.clearRect(0, 0, this._canvasObj.width, this._canvasObj.height);
        }
    }
}