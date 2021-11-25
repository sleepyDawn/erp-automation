import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "../../components/LoginPage";
import { Header } from "../../components/Header";

let wrapper, logOutWrapper, startLogin, startLogout;
// lifecycle method of enzyme
beforeEach(() => {
  startLogin = jest.fn();
  startLogout = jest.fn();
  wrapper = shallow(<LoginPage startLogin={startLogin}></LoginPage>);
  logOutWrapper = shallow(<Header startLogout={startLogout}></Header>);
});

test("should render LoginPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should call startLogout on button click", () => {
  logOutWrapper.find("button").simulate("click");
  expect(startLogout).toHaveBeenCalled();
});

test("should call startLogin on button click", () => {
  wrapper.find("button").simulate("click");
  expect(startLogin).toHaveBeenCalled();
});
