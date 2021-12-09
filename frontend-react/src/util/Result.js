class Result {
    constructor(json) {
        if (json.error)
            this.error = json.error;
        if (json.result)
            this.result = json.result;
        if (json.errorCode)
            this.errorCode = json.errorCode;
        
    }
}