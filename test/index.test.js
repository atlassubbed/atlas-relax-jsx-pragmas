const { describe, it } = require("mocha")
const { expect } = require("chai")
const { t, f } = require("../src");

describe("t", function(){
  it("should return a void template if given no args", function(){
    expect(t()).to.be.undefined
  })
  it("should return a void template if given falsy name and no other args", function(){
    ["", false, 0, null, undefined].forEach(n => expect(t(n)).to.be.undefined)
  })
  it("should be able to take a single name arg", function(){
    expect(t("bob")).to.deep.equal({name:"bob"})
  })
  it("should be able to take data object (props) as a second arg", function(){
    expect(t("bob", {some:123,info:"here"})).
    to.deep.equal({name:"bob",data:{some:123,info:"here"}})
  })
  it("should be able to take primitive data as a second arg", function(){
    expect(t("bob","data")).
    to.deep.equal({name:"bob", data:"data"})
  })
  it("should be able to take an array of next temps as a second arg", function(){
    expect(t("bob",[t("alice"),t("carl")])).
    to.deep.equal({name:"bob", next:[{name:"alice"},{name:"carl"}]})
  })
  it("should be able to take an array of primitives as a second arg", function(){
    expect(t("bob",["primitive","children"])).
    to.deep.equal({name:"bob",next:["primitive","children"]})
  })
  it("should be able to take a mixed-type array as a second arg", function(){
    expect(t("bob",["primitive",t("bob")])).
    to.deep.equal({name:"bob",next:["primitive",{name:'bob'}]})
  })
  it("should not flatten passed in children", function(){
    expect(t(1,[[1,2,3],[4,5,6]])).
    to.deep.equal({name:1, next:[[1,2,3],[4,5,6]]})
  })
  it("should be able to take a singleton child as a third arg", function(){
    expect(t("bob",{some:'thing'},t("child"))).
    to.deep.equal({name:'bob',data:{some:"thing"},next:{name:"child"}})
  })
  it("should be able to take a singleton primitive as a third arg", function(){
    expect(t("bob",{some:'thing'},"child")).
    to.deep.equal({name:'bob',data:{some:"thing"},next:"child"})
  })
  it("should properly build a temp with all args", function(){
    expect(t("bob",{some:"data"},["some","literal",true,"children",12345])).
    to.deep.equal({name:"bob", data:{some:"data"},next:["some","literal",true,"children",12345]})
  })
  it("should properly group all subsequent args as an array of children", function(){
    expect(t("bob",{some:"data"},"some","is",t('here',{ok:1}))).
    to.deep.equal({name:"bob", data:{some:"data"},next:["some","is",{name:"here",data:{ok:1}}]})
  })
  it("should properly move special 'key' data fields to the top level of the temp", function(){
    expect(t("bob",{some:"data",key:1234567})).
    to.deep.equal({name:"bob", key:1234567, data:{some:"data"}})
  })
  it("should properly create fragments", function(){
    expect(t(f, null, ["some", "children"])).to.eql(["some", "children"])
  })
})