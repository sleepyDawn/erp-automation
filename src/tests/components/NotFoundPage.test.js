import React from "react";
import { shallow } from "enzyme";

import NotFoundPage from "../../components/NotFoundPage";

test("should render notFound page correctly", () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find("h1").text()).toBe("Expense tracker");
});
