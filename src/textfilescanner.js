var re = require("./regex")
fs = require("fs"),
path = require("path"),
util = require("util");

var commentContent= "";
var lines;
var value;
var result;
var result2;
var commentCheck;
var ofSplitStack = [];
var anSplitStack = [];
var tokens = [];
var content = fs.readFileSync("bmi.lol").toString();

// Reads from text file and assigns the content of the text file to variable content
fs.readFile(path.join(__dirname,"bmi.lol"), 'utf8', function (err,data) {
    if (err) process.exit(1);
});


// Lines contains the array of lines from the text file
lines = content.split(/\r?\n/); //Instead of reading from the text file, the "content" variable that will be split should be the string inside the text field of the UI

for(var i = 0; i < lines.length; i++){ 
    if(commentCheck = re.SINGLECOMMENT.exec(lines[i])){
        tokens.push({lexeme: commentCheck[2], attribute: "Single line comment declaration"});
        tokens.push({lexeme: commentCheck[3], attribute: "Comment content"});
        lines[i] = commentCheck[1];
    };
    // HAI  
    if (result = re.START.exec(lines[i])){
        tokens.push({lexeme: result[0], attribute: "Program Starting Delimiter"});
    }
    // KTHXBYE
    else if(result = re.END.exec(lines[i])){
        tokens.push({lexeme: result[0], attribute: "Program Ending Delimiter"});
    }
    //BTW
    else if(result = re.SINGLECOMMENT.exec(lines[i])){
        tokens.push({lexeme: result[2], attribute: "Single line comment declaration"});
        tokens.push({lexeme: result[3], attribute: "Comment content"});
    }
    //OBTW/TLDR
    else if(result = re.MULTIMCOMMENTSINGLE.exec(lines[i])){
        tokens.push({lexeme: result[1], attribute: "Multicomment starting delimiter"});
        tokens.push({lexeme: result[2], attribute: "Comment content"});
        tokens.push({lexeme: result[3], attribute: "Multicomment ending delimiter"});
    }

    else if(result = re.MULTICOMMENTSTART.exec(lines[i])){
        tokens.push({lexeme: result[1], attribute: "Multicomment starting delimiter"});
        if(result[2] !== undefined){            
            commentContent += result[2];
        }     
        i += 1;
        while((result = re.MULTICOMMENTEND.exec(lines[i])) == null){
            commentContent += lines[i++];
        }
        if(result = re.MULTICOMMENTEND.exec(lines[i])){
            if(result[1] !== undefined){
                commentContent += result[1];
            }
            tokens.push({lexeme: commentContent, attribute: "Comment content"});
            tokens.push({lexeme: result[2], attribute: "Multicomment ending delimiter"});
        }
        commentContent = "";
    }
    
    // I HAS A
    else if(result = re.VARIABLEIDENTIFIER.exec(lines[i])){
        tokens.push({lexeme: result[1], attribute: "Variable Declaration"});
        //I HAS A <var> ITZ
        if(result2 = re.VARIABLECOPY.exec(result[5])){
            tokens.push({lexeme: result2[1], attribute: "Variable name"});
            tokens.push({lexeme: result2[2], attribute: "Copy variable keyword"});
            tokens.push({lexeme: result2[3], attribute: "Variable to copy"});
        }
        //I HAS A <var> ITZ A
        else if(result2 = re.VARIABLEASSIGNTYPE.exec(result[5])){
            tokens.push({lexeme: result2[1], attribute: "Variable name"});
            tokens.push({lexeme: result2[2], attribute: "Assign type keyword"});
            tokens.push({lexeme: result2[3], attribute: "Variable Type"});
        }
        //I HAS A <var> ITZ LIEK A <var>
        else if(result2 = re.VARIABLEASSIGNVALUE.exec(result[5])){
            tokens.push({lexeme: result2[1], attribute: "Variable name"});
            tokens.push({lexeme: result2[2], attribute: "Assignment keyword"});
            tokens.push({lexeme: result2[3], attribute: "Variable Value"});
        }else{
            tokens.push({lexeme: result[5], attribute: "Variable name"});
        }
    }

    // R
    else if(result = re.ASSIGNMENTOPERATOR.exec(lines[i])){
        tokens.push({lexeme: result[1], attribute: "Variable"});
        tokens.push({lexeme: result[2], attribute: "Assignment Operator"});
        if(result2 = re.ADDITION.exec(result[3])){
            tokens.push({lexeme: result2[1], attribute: "Addition opcode"});
            anSplitStack = result2[2].split(/\s(AN)\s/);
            for(var j = 0; j < anSplitStack.length; j++){
                ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                if(ofSplitStack.length > 1){
                    for(var k = 0; k < ofSplitStack.length; k++){
                        if(ofSplitStack[k] == "SUM"){
                            k += 1;
                            tokens.push({lexeme: "SUM OF", attribute: "Addition opcode"});
                        }else if(ofSplitStack[k] == "DIFF"){
                            k += 1;
                            tokens.push({lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                        }else if(ofSplitStack[k] == "PRODUKT"){
                            k += 1;
                            tokens.push({lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                        }else if(ofSplitStack[k] == "QUOSHUNT"){
                            k += 1;
                            tokens.push({lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                        }else if(ofSplitStack[k] == "MOD"){
                            k += 1;
                            tokens.push({lexeme: "MOD OF", attribute: "Modular opcode"});
                        }else if(ofSplitStack[k] == "BIGGR"){
                            k += 1;
                            tokens.push({lexeme: "BIGGR OF", attribute: "Max opcode"});
                        }else if(ofSplitStack[k] == "SMALLR"){
                            k += 1;
                            tokens.push({lexeme: "SMALLR OF", attribute: "Min opcode"});
                        }else if(ofSplitStack[k] == "BOTH"){
                            k += 1;
                            tokens.push({lexeme: "BOTH OF", attribute: "And Comparison"});
                        }else if(ofSplitStack[k] == "EITHER"){
                            k += 1;
                            tokens.push({lexeme: "EITHER OF", attribute: "Or comparison"});
                        }else{
                            tokens.push({lexeme: ofSplitStack[k], attribute: "Value"});
                        }
                    }
                }else if(ofSplitStack[0] == "AN"){
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                }else{
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Value"});
                }
            }
        }

        else if(result2 = re.SUBTRACTION.exec(result[3])){
            tokens.push({lexeme: result2[1], attribute: "Subtraction opcode"});
            anSplitStack = result2[2].split(/\s(AN)\s/);
            for(var j = 0; j < anSplitStack.length; j++){
                ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                if(ofSplitStack.length > 1){
                    for(var k = 0; k < ofSplitStack.length; k++){
                        if(ofSplitStack[k] == "SUM"){
                            k += 1;
                            tokens.push({lexeme: "SUM OF", attribute: "Addition opcode"});
                        }else if(ofSplitStack[k] == "DIFF"){
                            k += 1;
                            tokens.push({lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                        }else if(ofSplitStack[k] == "PRODUKT"){
                            k += 1;
                            tokens.push({lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                        }else if(ofSplitStack[k] == "QUOSHUNT"){
                            k += 1;
                            tokens.push({lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                        }else if(ofSplitStack[k] == "MOD"){
                            k += 1;
                            tokens.push({lexeme: "MOD OF", attribute: "Modular opcode"});
                        }else if(ofSplitStack[k] == "BIGGR"){
                            k += 1;
                            tokens.push({lexeme: "BIGGR OF", attribute: "Max opcode"});
                        }else if(ofSplitStack[k] == "SMALLR"){
                            k += 1;
                            tokens.push({lexeme: "SMALLR OF", attribute: "Min opcode"});
                        }else if(ofSplitStack[k] == "BOTH"){
                            k += 1;
                            tokens.push({lexeme: "BOTH OF", attribute: "And Comparison"});
                        }else if(ofSplitStack[k] == "EITHER"){
                            k += 1;
                            tokens.push({lexeme: "EITHER OF", attribute: "Or comparison"});
                        }else{
                            tokens.push({lexeme: ofSplitStack[k], attribute: "Value"});
                        }
                    }
                }else if(ofSplitStack[0] == "AN"){
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                }else{
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Value"});
                }
            }
        }

        else if(result2 = re.MULTIPLICATION.exec(result[3])){
            tokens.push({lexeme: result2[1], attribute: "Multiplication opcode"});
            anSplitStack = result2[2].split(/\s(AN)\s/);
            for(var j = 0; j < anSplitStack.length; j++){
                ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                if(ofSplitStack.length > 1){
                    for(var k = 0; k < ofSplitStack.length; k++){
                        if(ofSplitStack[k] == "SUM"){
                            k += 1;
                            tokens.push({lexeme: "SUM OF", attribute: "Addition opcode"});
                        }else if(ofSplitStack[k] == "DIFF"){
                            k += 1;
                            tokens.push({lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                        }else if(ofSplitStack[k] == "PRODUKT"){
                            k += 1;
                            tokens.push({lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                        }else if(ofSplitStack[k] == "QUOSHUNT"){
                            k += 1;
                            tokens.push({lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                        }else if(ofSplitStack[k] == "MOD"){
                            k += 1;
                            tokens.push({lexeme: "MOD OF", attribute: "Modular opcode"});
                        }else if(ofSplitStack[k] == "BIGGR"){
                            k += 1;
                            tokens.push({lexeme: "BIGGR OF", attribute: "Max opcode"});
                        }else if(ofSplitStack[k] == "SMALLR"){
                            k += 1;
                            tokens.push({lexeme: "SMALLR OF", attribute: "Min opcode"});
                        }else if(ofSplitStack[k] == "BOTH"){
                            k += 1;
                            tokens.push({lexeme: "BOTH OF", attribute: "And Comparison"});
                        }else if(ofSplitStack[k] == "EITHER"){
                            k += 1;
                            tokens.push({lexeme: "EITHER OF", attribute: "Or comparison"});
                        }else{
                            tokens.push({lexeme: ofSplitStack[k], attribute: "Value"});
                        }
                    }
                }else if(ofSplitStack[0] == "AN"){
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                }else{
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Value"});
                }
            }
        }

        else if(result2 = re.MULTIPLICATION.exec(result[3])){
            tokens.push({lexeme: result2[1], attribute: "Multiplication opcode"});
            anSplitStack = result2[2].split(/\s(AN)\s/);
            for(var j = 0; j < anSplitStack.length; j++){
                ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                if(ofSplitStack.length > 1){
                    for(var k = 0; k < ofSplitStack.length; k++){
                        if(ofSplitStack[k] == "SUM"){
                            k += 1;
                            tokens.push({lexeme: "SUM OF", attribute: "Addition opcode"});
                        }else if(ofSplitStack[k] == "DIFF"){
                            k += 1;
                            tokens.push({lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                        }else if(ofSplitStack[k] == "PRODUKT"){
                            k += 1;
                            tokens.push({lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                        }else if(ofSplitStack[k] == "QUOSHUNT"){
                            k += 1;
                            tokens.push({lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                        }else if(ofSplitStack[k] == "MOD"){
                            k += 1;
                            tokens.push({lexeme: "MOD OF", attribute: "Modular opcode"});
                        }else if(ofSplitStack[k] == "BIGGR"){
                            k += 1;
                            tokens.push({lexeme: "BIGGR OF", attribute: "Max opcode"});
                        }else if(ofSplitStack[k] == "SMALLR"){
                            k += 1;
                            tokens.push({lexeme: "SMALLR OF", attribute: "Min opcode"});
                        }else if(ofSplitStack[k] == "BOTH"){
                            k += 1;
                            tokens.push({lexeme: "BOTH OF", attribute: "And Comparison"});
                        }else if(ofSplitStack[k] == "EITHER"){
                            k += 1;
                            tokens.push({lexeme: "EITHER OF", attribute: "Or comparison"});
                        }else{
                            tokens.push({lexeme: ofSplitStack[k], attribute: "Value"});
                        }
                    }
                }else if(ofSplitStack[0] == "AN"){
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                }else{
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Value"});
                }
            }
        }

        else if(result2 = re.DIVISION.exec(result[3])){
            tokens.push({lexeme: result2[1], attribute: "Division opcode"});
            anSplitStack = result2[2].split(/\s(AN)\s/);
            for(var j = 0; j < anSplitStack.length; j++){
                ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                if(ofSplitStack.length > 1){
                    for(var k = 0; k < ofSplitStack.length; k++){
                        if(ofSplitStack[k] == "SUM"){
                            k += 1;
                            tokens.push({lexeme: "SUM OF", attribute: "Addition opcode"});
                        }else if(ofSplitStack[k] == "DIFF"){
                            k += 1;
                            tokens.push({lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                        }else if(ofSplitStack[k] == "PRODUKT"){
                            k += 1;
                            tokens.push({lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                        }else if(ofSplitStack[k] == "QUOSHUNT"){
                            k += 1;
                            tokens.push({lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                        }else if(ofSplitStack[k] == "MOD"){
                            k += 1;
                            tokens.push({lexeme: "MOD OF", attribute: "Modular opcode"});
                        }else if(ofSplitStack[k] == "BIGGR"){
                            k += 1;
                            tokens.push({lexeme: "BIGGR OF", attribute: "Max opcode"});
                        }else if(ofSplitStack[k] == "SMALLR"){
                            k += 1;
                            tokens.push({lexeme: "SMALLR OF", attribute: "Min opcode"});
                        }else if(ofSplitStack[k] == "BOTH"){
                            k += 1;
                            tokens.push({lexeme: "BOTH OF", attribute: "And Comparison"});
                        }else if(ofSplitStack[k] == "EITHER"){
                            k += 1;
                            tokens.push({lexeme: "EITHER OF", attribute: "Or comparison"});
                        }else{
                            tokens.push({lexeme: ofSplitStack[k], attribute: "Value"});
                        }
                    }
                }else if(ofSplitStack[0] == "AN"){
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                }else{
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Value"});
                }
            }
        }

        else if(result2 = re.REMAINDER.exec(result[3])){
            tokens.push({lexeme: result2[1], attribute: "Modular opcode"});
            anSplitStack = result2[2].split(/\s(AN)\s/);
            for(var j = 0; j < anSplitStack.length; j++){
                ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                if(ofSplitStack.length > 1){
                    for(var k = 0; k < ofSplitStack.length; k++){
                        if(ofSplitStack[k] == "SUM"){
                            k += 1;
                            tokens.push({lexeme: "SUM OF", attribute: "Addition opcode"});
                        }else if(ofSplitStack[k] == "DIFF"){
                            k += 1;
                            tokens.push({lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                        }else if(ofSplitStack[k] == "PRODUKT"){
                            k += 1;
                            tokens.push({lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                        }else if(ofSplitStack[k] == "QUOSHUNT"){
                            k += 1;
                            tokens.push({lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                        }else if(ofSplitStack[k] == "MOD"){
                            k += 1;
                            tokens.push({lexeme: "MOD OF", attribute: "Modular opcode"});
                        }else if(ofSplitStack[k] == "BIGGR"){
                            k += 1;
                            tokens.push({lexeme: "BIGGR OF", attribute: "Max opcode"});
                        }else if(ofSplitStack[k] == "SMALLR"){
                            k += 1;
                            tokens.push({lexeme: "SMALLR OF", attribute: "Min opcode"});
                        }else if(ofSplitStack[k] == "BOTH"){
                            k += 1;
                            tokens.push({lexeme: "BOTH OF", attribute: "And Comparison"});
                        }else if(ofSplitStack[k] == "EITHER"){
                            k += 1;
                            tokens.push({lexeme: "EITHER OF", attribute: "Or comparison"});
                        }else{
                            tokens.push({lexeme: ofSplitStack[k], attribute: "Value"});
                        }
                    }
                }else if(ofSplitStack[0] == "AN"){
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                }else{
                    tokens.push({lexeme: ofSplitStack[0], attribute: "Value"});
                }
            }
        }else{
            tokens.push({lexeme: result[3], attribute: "Value"});
        }
    }
}

for(i = 0; i < tokens.length; i++){
    console.log(tokens[i]);
}