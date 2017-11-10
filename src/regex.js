const Regex = {
    START: /HAI/,
    END: /KTHXBYE/,
    SINGLECOMMENT: /.*\s(BTW)\s(.*)/,
    MULTICOMMENTSTART: /(OBTW)\s(.*)?/,
    MULTICOMMENTEND: /(.*)?\s?(TLDR)/,
    MULTIMCOMMENTSINGLE: /(OBTW)\s(.*)\s(TLDR)/,
    VARIABLEIDENTIFIER: /((I)\s(HAS)\s(A))\s(.*)/,
    VARIABLEASSIGNVALUE: /(.*)\s(ITZ)\s(.*)/,
    VARIABLEASSIGNTYPE: /(.*)\s(ITZ A)\s(.*)/,
    VARIABLECOPY: /(.*)\s(ITZ LIEK A)\s(.*)/
}
module.exports = Regex;	