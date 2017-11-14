import re from "./regex";


var commentContent= "";
var lines;
var result;
var result2;
var commentCheck;
var ofSplitStack = [];
var anSplitStack = [];
var tokens = [];
var count = 0;

// Lines contains the array of lines from the text file
var textAnalyzer = (content) => {
    
    lines = content.split(/\r?\n/); //Instead of reading from the text file, the "content" variable that will be split should be the string inside the text field of the UI
    tokens = [];
    for(let i = 0; i < lines.length; i++){ 
        if(commentCheck = re.SINGLECOMMENT.exec(lines[i])){
            tokens.push({id: count, lexeme: commentCheck[2], attribute: "Single line comment declaration"});
            count += 1;
            tokens.push({id: count, lexeme: commentCheck[3], attribute: "Comment content"});
            count += 1;
            lines[i] = commentCheck[1];
        };
        // HAI  
            if (result = re.START.exec(lines[i])){
                tokens.push({id: count, lexeme: result[0], attribute: "Program Starting Delimiter"});
                count += 1;
            }
        // KTHXBYE
            else if(result = re.END.exec(lines[i])){
                tokens.push({id: count, lexeme: result[0], attribute: "Program Ending Delimiter"});
                count += 1;
            }
        //BTW
            else if(result = re.SINGLECOMMENT.exec(lines[i])){
                tokens.push({id: count, lexeme: result[2], attribute: "Single line comment declaration"});
                count += 1;
                tokens.push({id: count, lexeme: result[3], attribute: "Comment content"});
                count += 1;
            }
        //OBTW/TLDR
            else if(result = re.MULTIMCOMMENTSINGLE.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "Multicomment starting delimiter"});
                count += 1;
                tokens.push({id: count, lexeme: result[2], attribute: "Comment content"});
                count += 1;
                tokens.push({id: count, lexeme: result[3], attribute: "Multicomment ending delimiter"});
                count += 1;
            }

            else if(result = re.MULTICOMMENTSTART.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "Multicomment starting delimiter"});
                count += 1;
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
                    tokens.push({id: count, lexeme: commentContent, attribute: "Comment content"});
                    count += 1;
                    tokens.push({id: count, lexeme: result[2], attribute: "Multicomment ending delimiter"});
                    count += 1;
                }
                commentContent = "";
            }
        
        // I HAS A
        else if(result = re.VARIABLEIDENTIFIER.exec(lines[i])){
            tokens.push({id: count, lexeme: result[1], attribute: "Variable Declaration"});
            count += 1;
            //I HAS A <var> ITZ
            if(result2 = re.VARIABLECOPY.exec(result[5])){
                tokens.push({id: count, lexeme: result2[1], attribute: "Variable name"});
                count += 1;
                tokens.push({id: count, lexeme: result2[2], attribute: "Copy variable keyword"});
                count += 1;
                tokens.push({id: count, lexeme: result2[3], attribute: "Variable to copy"});
                count += 1;
            }
            //I HAS A <var> ITZ A
            else if(result2 = re.VARIABLEASSIGNTYPE.exec(result[5])){
                tokens.push({id: count, lexeme: result2[1], attribute: "Variable name"});
                count += 1;
                tokens.push({id: count, lexeme: result2[2], attribute: "Assign type keyword"});
                count += 1;
                tokens.push({id: count, lexeme: result2[3], attribute: "Variable Type"});
                count += 1;
            }
            //I HAS A <var> ITZ LIEK A <var>
            else if(result2 = re.VARIABLEASSIGNVALUE.exec(result[5])){
                tokens.push({id: count, lexeme: result2[1], attribute: "Variable name"});
                count += 1;
                tokens.push({id: count, lexeme: result2[2], attribute: "Assignment keyword"});
                count += 1;
                tokens.push({id: count, lexeme: result2[3], attribute: "Variable Value"});
                count += 1;
            }else{
                tokens.push({id: count, lexeme: result[5], attribute: "Variable name"});
                count += 1;
            }
            // I has a var sum of/diff of/ mod of
        }

        // R
            else if(result = re.ASSIGNMENTOPERATOR.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "Variable"});
                count += 1;
                tokens.push({id: count, lexeme: result[2], attribute: "Assignment Operator"});
                count += 1;
                if(result2 = re.ADDITION.exec(result[3])){
                    tokens.push({id: count, lexeme: result2[1], attribute: "Addition opcode"});
                    count += 1;
                    anSplitStack = result2[2].split(/\s(AN)\s/);
                    for(var j = 0; j < anSplitStack.length; j++){
                        ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                        if(ofSplitStack.length > 1){
                            for(var k = 0; k < ofSplitStack.length; k++){
                                if(ofSplitStack[k] === "SUM"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SUM OF", attribute: "Addition opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "DIFF"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "PRODUKT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "QUOSHUNT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "MOD"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "MOD OF", attribute: "Modular opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BIGGR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BIGGR OF", attribute: "Max opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "SMALLR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SMALLR OF", attribute: "Min opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BOTH"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BOTH OF", attribute: "And Comparison"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "EITHER"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "EITHER OF", attribute: "Or comparison"});
                                    count += 1;
                                }else{
                                    tokens.push({id: count, lexeme: ofSplitStack[k], attribute: "Value"});
                                    count += 1;
                                }
                            }
                        }else if(ofSplitStack[0] === "AN"){
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                            count += 1;
                        }else{
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Value"});
                            count += 1;
                        }
                    }
                }

                else if(result2 = re.SUBTRACTION.exec(result[3])){
                    tokens.push({id: count, lexeme: result2[1], attribute: "Subtraction opcode"});
                    count += 1;
                    anSplitStack = result2[2].split(/\s(AN)\s/);
                    for(j = 0; j < anSplitStack.length; j++){
                        ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                        if(ofSplitStack.length > 1){
                            for(k = 0; k < ofSplitStack.length; k++){
                                if(ofSplitStack[k] === "SUM"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SUM OF", attribute: "Addition opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "DIFF"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "PRODUKT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "QUOSHUNT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "MOD"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "MOD OF", attribute: "Modular opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BIGGR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BIGGR OF", attribute: "Max opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "SMALLR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SMALLR OF", attribute: "Min opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BOTH"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BOTH OF", attribute: "And Comparison"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "EITHER"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "EITHER OF", attribute: "Or comparison"});
                                    count += 1;
                                }else{
                                    tokens.push({id: count, lexeme: ofSplitStack[k], attribute: "Value"});
                                    count += 1;
                                }
                            }
                        }else if(ofSplitStack[0] === "AN"){
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                            count += 1;
                        }else{
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Value"});
                            count += 1;
                        }
                    }
                }

                else if(result2 = re.MULTIPLICATION.exec(result[3])){
                    tokens.push({id: count, lexeme: result2[1], attribute: "Multiplication opcode"});
                    count += 1;
                    anSplitStack = result2[2].split(/\s(AN)\s/);
                    for(j = 0; j < anSplitStack.length; j++){
                        ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                        if(ofSplitStack.length > 1){
                            for(k = 0; k < ofSplitStack.length; k++){
                                if(ofSplitStack[k] === "SUM"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SUM OF", attribute: "Addition opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "DIFF"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "PRODUKT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "QUOSHUNT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "MOD"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "MOD OF", attribute: "Modular opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BIGGR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BIGGR OF", attribute: "Max opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "SMALLR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SMALLR OF", attribute: "Min opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BOTH"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BOTH OF", attribute: "And Comparison"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "EITHER"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "EITHER OF", attribute: "Or comparison"});
                                    count += 1;
                                }else{
                                    tokens.push({id: count, lexeme: ofSplitStack[k], attribute: "Value"});
                                    count += 1;
                                }
                            }
                        }else if(ofSplitStack[0] === "AN"){
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                            count += 1;
                        }else{
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Value"});
                            count += 1;
                        }
                    }
                }

                else if(result2 = re.MULTIPLICATION.exec(result[3])){
                    tokens.push({id: count, lexeme: result2[1], attribute: "Multiplication opcode"});
                    count += 1;
                    anSplitStack = result2[2].split(/\s(AN)\s/);
                    for(j = 0; j < anSplitStack.length; j++){
                        ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                        if(ofSplitStack.length > 1){
                            for(k = 0; k < ofSplitStack.length; k++){
                                if(ofSplitStack[k] === "SUM"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SUM OF", attribute: "Addition opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "DIFF"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "PRODUKT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "QUOSHUNT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "MOD"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "MOD OF", attribute: "Modular opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BIGGR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BIGGR OF", attribute: "Max opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "SMALLR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SMALLR OF", attribute: "Min opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BOTH"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BOTH OF", attribute: "And Comparison"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "EITHER"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "EITHER OF", attribute: "Or comparison"});
                                    count += 1;
                                }else{
                                    tokens.push({id: count, lexeme: ofSplitStack[k], attribute: "Value"});
                                    count += 1;
                                }
                            }
                        }else if(ofSplitStack[0] === "AN"){
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                            count += 1;
                        }else{
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Value"});
                            count += 1;
                        }
                    }
                }

                else if(result2 = re.DIVISION.exec(result[3])){
                    tokens.push({id: count, lexeme: result2[1], attribute: "Division opcode"});
                    count += 1;
                    anSplitStack = result2[2].split(/\s(AN)\s/);
                    for(j = 0; j < anSplitStack.length; j++){
                        ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                        if(ofSplitStack.length > 1){
                            for(k = 0; k < ofSplitStack.length; k++){
                                if(ofSplitStack[k] === "SUM"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SUM OF", attribute: "Addition opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "DIFF"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "PRODUKT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "QUOSHUNT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "MOD"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "MOD OF", attribute: "Modular opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BIGGR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BIGGR OF", attribute: "Max opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "SMALLR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SMALLR OF", attribute: "Min opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BOTH"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BOTH OF", attribute: "And Comparison"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "EITHER"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "EITHER OF", attribute: "Or comparison"});
                                    count += 1;
                                }else{
                                    tokens.push({id: count, lexeme: ofSplitStack[k], attribute: "Value"});
                                    count += 1;
                                }
                            }
                        }else if(ofSplitStack[0] === "AN"){
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                            count += 1;
                        }else{
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Value"});
                            count += 1;
                        }
                    }
                }

                else if(result2 = re.REMAINDER.exec(result[3])){
                    tokens.push({id: count, lexeme: result2[1], attribute: "Modular opcode"});
                    count += 1;
                    anSplitStack = result2[2].split(/\s(AN)\s/);
                    for(j = 0; j < anSplitStack.length; j++){
                        ofSplitStack = anSplitStack[j].split(/\s(OF)\s/);
                        if(ofSplitStack.length > 1){
                            for(k = 0; k < ofSplitStack.length; k++){
                                if(ofSplitStack[k] === "SUM"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SUM OF", attribute: "Addition opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "DIFF"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "PRODUKT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "QUOSHUNT"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "MOD"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "MOD OF", attribute: "Modular opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BIGGR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BIGGR OF", attribute: "Max opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "SMALLR"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "SMALLR OF", attribute: "Min opcode"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "BOTH"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "BOTH OF", attribute: "And Comparison"});
                                    count += 1;
                                }else if(ofSplitStack[k] === "EITHER"){
                                    k += 1;
                                    tokens.push({id: count, lexeme: "EITHER OF", attribute: "Or comparison"});
                                    count += 1;
                                }else{
                                    tokens.push({id: count, lexeme: ofSplitStack[k], attribute: "Value"});
                                    count += 1;
                                }
                            }
                        }else if(ofSplitStack[0] === "AN"){
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Combination opcode"});
                            count += 1;
                        }else{
                            tokens.push({id: count, lexeme: ofSplitStack[0], attribute: "Value"});
                            count += 1;
                        }
                    }
                }else{
                    tokens.push({id: count, lexeme: result[3], attribute: "Value"});
                    count += 1;
                }
            }
        }

    for(let i = 0; i < tokens.length; i++){
        console.log(tokens[i]);
    }
    return tokens;
}

export default textAnalyzer;