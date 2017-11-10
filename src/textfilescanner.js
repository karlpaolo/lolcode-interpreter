var re = require("./regex")
fs = require("fs"),
path = require("path"),
util = require("util");

var commentContent= "";
var lines;
var result;
var result2;
var tokens = [];
var content = fs.readFileSync("bmi.lol").toString();

// Reads from text file and assigns the content of the text file to variable content
fs.readFile(path.join(__dirname,"bmi.lol"), 'utf8', function (err,data) {
    if (err) process.exit(1);
});


// Lines contains the array of lines from the text file
lines = content.split(/\r?\n/); //Instead of reading from the text file, the "content" variable that will be split should be the string inside the text field of the UI

for(var i = 0; i < lines.length; i++){
    
    if (result = re.START.exec(lines[i])){
        tokens.push({lexeme: result[0], attribute: "Delimiter"});
    }
    
    else if(result = re.END.exec(lines[i])){
        tokens.push({lexeme: result[0], attribute: "Delimiter"});
    }
    
    else if(result = re.SINGLECOMMENT.exec(lines[i])){
        tokens.push({lexeme: result[1], attribute: "Single line comment declaration"});
        tokens.push({lexeme: result[2], attribute: "Comment content"});
    }
    
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
    
    else if(result = re.VARIABLEIDENTIFIER.exec(lines[i])){
        tokens.push({lexeme: result[1], attribute: "Variable Declaration"});
        if(result2 = re.VARIABLECOPY.exec(result[5])){
            tokens.push({lexeme: result2[2], attribute: "Copy variable keyword"});
            tokens.push({lexeme: result2[3], attribute: "Variable to copy"});
        }else if(result2 = re.VARIABLEASSIGNTYPE.exec(result[5])){
            tokens.push({lexeme: result2[2], attribute: "Assign type keyword"});
            tokens.push({lexeme: result2[3], attribute: "Variable type"});
        }else if(result2 = re.VARIABLEASSIGNVALUE.exec(result[5])){
            tokens.push({lexeme: result2[2], attribute: "Assignment keyword"});
            tokens.push({lexeme: result2[3], attribute: "Variable"});
        }else{
            tokens.push({lexeme: result[5], attribute: "Variable name"});
        }
    }
}

for(i = 0; i < tokens.length; i++){
    console.log(tokens[i]);
}