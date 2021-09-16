import { defineMessages } from "react-intl";
import { scope } from "../messages";

describe('ManagePlant Messages test cases',() =>{
    it('test case for scope',() => {
       expect(scope).toEqual("app.containers.ManagePlant");
    })
})