'use strict';

var Curry = require("rescript/lib/js/curry.js");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi2 = require("../tool/MainTool.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");

var feature = JestCucumber.loadFeature("./test/features/skin.feature");

JestCucumber.defineFeature(feature, (function (test) {
        return test("register skin", (function (param) {
                      var state = {
                        contents: 1
                      };
                      var skinName = "s1";
                      Curry._2(param.when, "register a skin", (function (param) {
                              state.contents = MainTool$Meta3dUi2.registerSkin(skinName, 5, undefined, undefined);
                              
                            }));
                      return Curry._2(param.then, "get skin should return it", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi2.getSkin(state.contents, skinName)), NullableSt$Meta3dCommonlib.$$return(MainTool$Meta3dUi2.buildSkinContribute(skinName, 5)));
                                  }));
                    }));
      }));

exports.feature = feature;
/* feature Not a pure module */
