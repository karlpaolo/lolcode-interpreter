const Regex = {
    MULTIPLESTATEMENTS: /(.*),\s(.*)/,
    START: /HAI/,
    END: /KTHXBYE/,
    SINGLECOMMENT: /(.*)?\s?(!O)(BTW)\s(.*)/,
    MULTICOMMENTSTART: /(OBTW)\s?(.*)?/,
    MULTICOMMENTEND: /(.*)?\s?(TLDR)/,
    VARIABLEIDENTIFIER: /((I)\s(HAS)\s(A))\s(.*)/, //I HAS A var, I HAS A var2
    VARIABLEASSIGNVALUE: /(.*)\s(ITZ)\s(.*)/,
    VARIABLEASSIGNTYPE: /(.*)\s(ITZ A)\s(.*)/,
    VARIABLECOPY: /(.*)\s(ITZ LIEK A)\s(.*)/,
    ASSIGNMENTOPERATOR: /(.*)\s(R)\s(.*)/,
    ADDITION: /(SUM OF)\s(.*)\s(AN)\s(.*)/,
    SUBTRACTION: /(DIFF OF)\s(.*)\s(AN)\s(.*)/,
    MULTIPLICATION: /(PRODUKT OF)\s(.*)\s(AN)\s(.*)/,
    DIVISION: /(QUOSHUNT OF)\s(.*)\s(AN)\s(.*)/,
<<<<<<< HEAD
    REMAINDER: /(MOD OF)\s(.*)\s(AN)\s(.*)/,
    // MAX: /(BIGGR OF)\s(.*)\s(AN)\s(.*)/,
    // MIN: /(SMALLR OF)\s(.*)\s(AN)\s(.*)/,
    // BOTH: /(BOTH OF)\s(.*)\s(AN)\s(.*)/,
    // EITHER: /(EITHER OF)\s(.*)\s(AN)\s(.*)/,
    // WON: /(WON OF)\s(.*)\s(AN)\s(.*)/,
    // NOT: /(NOT)\s(.*)/,
    // ANY: /(ANY OF)\s(.*)\s(AN)\s(.*)/,
    // ALL: /(ALL OF)\s(.*)\s(AN)\s(.*)/,
    // BOTHSAME: /(BOTH SAEM)\s(.*)\s(AN)\s(.*)/,
    // DIFFRINT: /(DIFFRINT)\s(.*)\s(AN)\s(.*)/,
    // SMOOSH
    // MAEK
    // A
    // IS NOW A
    PRINT: /(VISIBLE)\s(")?(.*)(")?/,
    GETINPUT: /(GIMMEH)\s(.*)/,
    IF: /(O RLY?)/,
    ELSE: /(YA RLY)/,
    //MEBBE
    //NO WAI
    //OIC
    //WTF? WTF: /(WTF?)/,
    //OMG  OMG: /(OMG)/,
    //OMGWTF OMGWTF: /(OMGWTF)/,
    //IM IN YR  LOOPSTART: /(IM IN YR)\s(.*)/,
=======
    MODULO: /(MOD OF)\s(.*)\s(AN)\s(.*)/,
    MAX: /(BIGGR OF)\s(.*)\s(AN)\s(.*)/,
    MIN: /(SMALLR OF)\s(.*)\s(AN)\s(.*)/,
    // TROOFS
    AND: /(BOTH OF)(\s(.*)\s(AN)\s(.*))?/,
    OR: /(EITHER OF)(\s(.*)\s(AN)\s(.*))?/,
    XOR: /(WON OF)(\s(.*)\s(AN)\s(.*))?/,
    NOT: /(NOT)\s(.*)?/,
    MULTIPLEOR: /(ANY OF)\s(.*)?/,
    MULTIPLEAND: /(ALL OF)\s(.*)?/,
    IFEQUAL: /(BOTH SAEM)\s(.*)\s(AN)\s(.*)/, //Returns win if equal
    IFNOTEQUAL: /(DIFFRINT)\s(.*)\s(AN)\s(.*)/, //Reuturns win if not equal
    
    CONCAT: /(SMOOSH)\s(.*)/, //Separated by AN
    TYPECASTEXPRESSION:/(MAEK)\s(.*)\s(A)\s(NUMBR|NUMBAR|YARN|TROOF|TYPE)/, // A is type assignment operand 
    TYPECASTVARIABLE: (/(.*)\s(IS NOW A)\s(NUMBR|NUMBAR|YARN|TROOF|TYPE)/),
    PRINT: /(VISIBLE)\s("?.*"?)/,
    GETINPUT: /(GIMMEH)\s(.*)/,
    STARTIF: /(O RLY?)/,
    IFTRUE: /(YA RLY)(.*)/,
    ELSEIF: /(MEBBE)(.*)/,
    ELSE: /(NO WAI)(.*)/,
    ENDIF: /(OIC)/,
    //WTF? WTF: /(WTF?)/,
    //OMG  OMG: /(OMG)/,
    //OMGWTF OMGWTF: /(OMGWTF)/,
    LOOPSTART: /(IM IN YR)\s(.*)/,
>>>>>>> c14f41274b9ae9c51e3dbf3a405b3c2697531bb7
    //UPPIN     UPPIN: /(.*)(UPPIN)\s(.*))/, 
    //NERFIN    NERFIN: /(.*)(NERFIN)\s(.*))/,
    //YR
    //TIL
<<<<<<< HEAD
    //WILE
    LOOPEND: /(IM OUTTA YR)\s(.*)/
=======
    //W ILE
    LOOPEND: /(IM OUTTA YR)\s(.*)/,

    //ERRORS
    MULTIMCOMMENTSINGLE: /(OBTW)\s(.*)\s(TLDR)/,
    MULTILINECOMMENTBETWEEN: /(.*)OBTW/
>>>>>>> c14f41274b9ae9c51e3dbf3a405b3c2697531bb7
}

module.exports = Regex;