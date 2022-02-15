"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
it('expect myfunc() to equal hello', function () {
    expect((0, index_1.myfunc)()).toEqual('hello');
});
