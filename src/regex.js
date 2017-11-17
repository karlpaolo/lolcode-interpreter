const Regex = {
    START: /HAI/,
    END: /KTHXBYE/,
    SINGLECOMMENT: /(.*)?\s?(BTW)\s(.*)/,
    MULTICOMMENTSTART: /(OBTW)\s(.*)?/,
    MULTICOMMENTEND: /(.*)?\s?(TLDR)/,
    MULTIMCOMMENTSINGLE: /(OBTW)\s(.*)\s(TLDR)/,
    VARIABLEIDENTIFIER: /((I)\s(HAS)\s(A))\s(.*)/,
    VARIABLEASSIGNVALUE: /(.*)\s(ITZ)\s(.*)/,
    VARIABLEASSIGNTYPE: /(.*)\s(ITZ A)\s(.*)/,
    VARIABLECOPY: /(.*)\s(ITZ LIEK A)\s(.*)/,
    ASSIGNMENTOPERATOR: /(.*)\s(R)\s(.*)/,
    ADDITION: /(SUM OF)\s(.*)\s(AN)\s(.*)/,
    SUBTRACTION: /(DIFF OF)\s(.*)\s(AN)\s(.*)/,
    MULTIPLICATION: /(PRODUKT OF)\s(.*)\s(AN)\s(.*)/,
    DIVISION: /(QUOSHUNT OF)\s(.*)\s(AN)\s(.*)/,
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
    //UPPIN     UPPIN: /(.*)(UPPIN)\s(.*))/, 
    //NERFIN    NERFIN: /(.*)(NERFIN)\s(.*))/,
    //YR
    //TIL
    //WILE
    LOOPEND: /(IM OUTTA YR)\s(.*)/
}

module.exports = Regex;