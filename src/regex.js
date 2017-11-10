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
    MAX: /(BIGGR OF)\s(.*)\s(AN)\s(.*)/,
    MIN: /(SMALLR OF)\s(.*)\s(AN)\s(.*)/,
    BOTH: /(BOTH OF)\s(.*)\s(AN)\s(.*)/
}

module.exports = Regex;