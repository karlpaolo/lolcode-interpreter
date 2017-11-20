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
    //UPPIN     UPPIN: /(.*)(UPPIN)\s(.*))/, 
    //NERFIN    NERFIN: /(.*)(NERFIN)\s(.*))/,
    //YR
    //TIL
    //W ILE
    LOOPEND: /(IM OUTTA YR)\s(.*)/,

    //ERRORS
    MULTIMCOMMENTSINGLE: /(OBTW)\s(.*)\s(TLDR)/,
    MULTILINECOMMENTBETWEEN: /(.*)OBTW/
}

module.exports = Regex;