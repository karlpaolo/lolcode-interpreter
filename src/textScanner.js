import re from "./regex";

var commentContent= "";
var lines;
var result;
var result2;
var commentCheck;
var ofSplitStack = [];
var anSplitStack = [];
var spaceSplitStack = [];
var tokens = [];
var count = 0;
var commentflag = 0;
var multiplestatements = [];
var multiplestatementsflag = 0;
var multiplestatementsiterator = 0;
var k;
var j;
var spaceStackCounter;

const analyzeOperations = (result) => {
    if(result2 = re.ADDITION.exec(result[3])){
        tokens.push({id: count, lexeme: result2[1], attribute: "IN"});
        count += 1;
        ofSplitStack = result2[2].split(" ");
        ofSplitStack.push(result2[3]);
        ofSplitStack.push(result2[4]);
        analyzeOfSplitStack(ofSplitStack);
    }

    else if(result2 = re.SUBTRACTION.exec(result[3])){
        tokens.push({id: count, lexeme: result2[1], attribute: "Subtraction opcode"});
        count += 1;
        ofSplitStack = result2[2].split(" ");
        ofSplitStack.push(result2[3]);
        ofSplitStack.push(result2[4]);
        analyzeOfSplitStack(ofSplitStack);
    }

    else if(result2 = re.MULTIPLICATION.exec(result[3])){
        tokens.push({id: count, lexeme: result2[1], attribute: "Addition opcode"});
        count += 1;
        ofSplitStack = result2[2].split(" ");
        ofSplitStack.push(result2[3]);
        ofSplitStack.push(result2[4]);
        analyzeOfSplitStack(ofSplitStack);
    }

    else if(result2 = re.DIVISION.exec(result[3])){
        tokens.push({id: count, lexeme: result2[1], attribute: "Addition opcode"});
        count += 1;
        ofSplitStack = result2[2].split(" ");
        ofSplitStack.push(result2[3]);
        ofSplitStack.push(result2[4]);
        analyzeOfSplitStack(ofSplitStack);
    }
    
    else if(result2 = re.MODULO.exec(result[3])){
        tokens.push({id: count, lexeme: result2[1], attribute: "Addition opcode"});
        count += 1;
        ofSplitStack = result2[2].split(" ");
        ofSplitStack.push(result2[3]);
        ofSplitStack.push(result2[4]);
        analyzeOfSplitStack(ofSplitStack);
    }

    else if(result2 = re.MAX.exec(result[3])){
        tokens.push({id: count, lexeme: result2[1], attribute: "Addition opcode"});
        count += 1;
        ofSplitStack = result2[2].split(" ");
        ofSplitStack.push(result2[3]);
        ofSplitStack.push(result2[4]);
        analyzeOfSplitStack(ofSplitStack);
    }

    else if(result2 = re.MIN.exec(result[3])){
        tokens.push({id: count, lexeme: result2[1], attribute: "Addition opcode"});
        count += 1;
        ofSplitStack = result2[2].split(" ");
        ofSplitStack.push(result2[3]);
        ofSplitStack.push(result2[4]);
        analyzeOfSplitStack(ofSplitStack);
    }
    
    else{
        tokens.push({id: count, lexeme: result[3], attribute: "Value"});
        count += 1;
    }
}

const analyzeOfSplitStack = (ofSplitStack) => {
    if(ofSplitStack.length > 1){
        for(k = 0; k < ofSplitStack.length; k++){
            if(ofSplitStack[k] === "SUM"){
                k++;
                tokens.push({id: count, lexeme: "SUM OF", attribute: "Addition opcode"});
                count += 1;
            }else if(ofSplitStack[k] === "DIFF"){
                k++;
                tokens.push({id: count, lexeme: "DIFF OF", attribute: "Subtraction opcode"});
                count += 1;
            }else if(ofSplitStack[k] === "PRODUKT"){
                k++;
                tokens.push({id: count, lexeme: "PRODUKT OF", attribute: "Multiplication opcode"});
                count += 1;
            }else if(ofSplitStack[k] === "QUOSHUNT"){
                k++;
                tokens.push({id: count, lexeme: "QUOSHUNT OF", attribute: "Division opcode"});
                count += 1;
            }else if(ofSplitStack[k] === "MOD"){
                k++;
                tokens.push({id: count, lexeme: "MOD OF", attribute: "Modular opcode"});
                count += 1;
            }else if(ofSplitStack[k] === "BIGGR"){
                k++;
                tokens.push({id: count, lexeme: "BIGGR OF", attribute: "Max opcode"});
                count += 1;
            }else if(ofSplitStack[k] === "SMALLR"){
                k++;
                tokens.push({id: count, lexeme: "SMALLR OF", attribute: "Min opcode"});
                count += 1;
            }else if(ofSplitStack[k] === "AN"){
                tokens.push({id: count, lexeme: ofSplitStack[k], attribute: "Combination opcode"});
                count += 1;
            }
            else{
                if(ofSplitStack[k]){
                    tokens.push({id: count, lexeme: ofSplitStack[k], attribute: "Value"});
                    count += 1;
                }
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

const textAnalyzer = (content) => {  
    tokens = [];
    lines = content.split(/\r?\n/); 

    for(let i = 0; i < lines.length; i++){

        //Check if line has multiplestatements
            if((result = re.MULTIPLESTATEMENTS.exec(lines[i])) && multiplestatementsflag === 0){
                multiplestatements = result[0].split(/,/);
                multiplestatementsflag = multiplestatements.length;
            }
            
            if(multiplestatementsflag !== 0){
                if(multiplestatementsiterator < multiplestatementsflag){
                    i -= 1;
                    lines[i] = multiplestatements[multiplestatementsiterator]; 
                    multiplestatementsiterator += 1;
                }else{
                    i += 1;
                    multiplestatementsflag = 0;
                    multiplestatementsiterator = 0;
                }
            }

            if(commentCheck = re.SINGLECOMMENT.exec(lines[i])){
                commentflag = 1;
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
                analyzeOperations(result);
            }

        // VISIBLE
            else if(result = re.PRINT.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "Print Indicator"});
                count += 1;
                tokens.push({id: count, lexeme: result[2], attribute: "Variable for printing"});
                count += 1;
            }
            
        // GIMMEH
            else if(result = re.GETINPUT.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "Print Indicator"});
                count += 1;
                tokens.push({id: count, lexeme: result[2], attribute: "Variable for printing"});
                count += 1;
            }

        // O RLY?
            else if(result = re.STARTIF.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "Start if-statement delimiter"});
                count += 1;
            }

        // YA RLY
            else if(result = re.IFTRUE.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "If-statement true indicator"});
                lines[i] = result[2];
                i -= 1;
                count += 1;
            }

        // MEBBE
            else if(result = re.ELSEIF.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "ELSE-IF-statement indicator"});
                lines[i] = result[2];
                i -= 1;
                count += 1;
            }

        //NO WAI
            else if(result = re.ELSE.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "Else statement indicator"});
                lines[i] = result[2];
                i -= 1;
                count += 1;
            }

        //OIC
            else if(result = re.ENDIF.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "If statement end delimiter"});
                count += 1;
            } 

        // IM IN YR 
            else if(result = re.LOOPSTART.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "Loop start delimiter"});
                count += 1;
                tokens.push({id: count, lexeme: result[2], attribute: "Loop variable"});
                count += 1;
            }
        
        // IM OUTTA YR 
            else if(result = re.LOOPEND.exec(lines[i])){
                tokens.push({id: count, lexeme: result[1], attribute: "Loop end delimiter"});
                count += 1;
                tokens.push({id: count, lexeme: result[2], attribute: "Loop variable"});
                count += 1;
            }

        //Check if commentflag is up
            if(commentflag === 1){
                tokens.push({id: count, lexeme: commentCheck[2], attribute: "Single line comment declaration"});
                count += 1;
                tokens.push({id: count, lexeme: commentCheck[3], attribute: "Comment content"});
                count += 1;
                commentflag = 0;
            }
    }
    return tokens;
}

export default textAnalyzer;