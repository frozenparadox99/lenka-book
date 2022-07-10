"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log("serving traffic on port " + port);
    console.log("filename " + filename);
    console.log("path to file " + dir);
};
exports.serve = serve;
