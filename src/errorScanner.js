import re from "./regex"

var errorCount = 0;
var errors =  [];
var error= "HAHAHAHAHA";
var lines;
var result;
var haiFlag = 0;
var KTHXBYEflag = 0;

var errorScanner = (content) => {
    lines = content.split(/\r?\n/); //Instead of reading from the text file, the "content" variable that will be split should be the string inside the text field of the UI
    errors = [];


    for(let i = 0; i < lines.length; i++){   
        if(result = re.START.exec(lines[0])){
            haiFlag = 1;
        }
    
        if(result = re.END.exec(lines[lines.length-1])){
            KTHXBYEflag = 1;
        }
        if(result = re.MULTIMCOMMENTSINGLE.exec(lines[i])){
            error = "Comment Error on line " + (i + 1);
            errors.push({id: errorCount, errorText: error});
            errorCount += 1;
        }
        
    }
    
    if(haiFlag === 0){
        error = "No starting program delimiter on line 0";
        errors.push({id: errorCount, errorText: error});
        errorCount += 1;
    }

    if(KTHXBYEflag === 0){
        error = "Expected KTHXBYE";
        errors.push({id: errorCount, errorText: error});
        errorCount += 1;
    }

    return errors;
}

export default errorScanner;