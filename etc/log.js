let util = require('util');

let Reset = "\x1b[0m";
let Bright = "\x1b[1m";
let Dim = "\x1b[2m";
let Underscore = "\x1b[4m";
let Blink = "\x1b[5m";
let Reverse = "\x1b[7m";
let Hidden = "\x1b[8m";

let FgBlack = "\x1b[30m";
let FgRed = "\x1b[31m";
let FgGreen = "\x1b[32m";
let FgYellow = "\x1b[33m";
let FgBlue = "\x1b[34m";
let FgMagenta = "\x1b[35m";
let FgCyan = "\x1b[36m";
let FgWhite = "\x1b[37m";

let BgBlack = "\x1b[40m";
let BgRed = "\x1b[41m";
let BgGreen = "\x1b[42m";
let BgYellow = "\x1b[43m";
let BgBlue = "\x1b[44m";
let BgMagenta = "\x1b[45m";
let BgCyan = "\x1b[46m";
let BgWhite = "\x1b[47m";


let log = {
    print:obj=>{
        "use strict";
        console.log(util.inspect());
    },
    error : obj=>{
        "use strict";
        console.log( FgRed, util.inspect(obj));
    },
    warning : obj =>{
        "use strict";
        console.log(FgGreen, util.inspect(obj));
    },
    info: obj =>{
        "use strict";
        console.log(FgCyan, util.inspect(obj));
    }
};


module.exports.log = log;