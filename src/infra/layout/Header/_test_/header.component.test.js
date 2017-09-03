import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Header from '../header.component';

describe("# logoff  ", () => {
    it('ao clicar no botão logoff, o mesmo deve chamar a function de logoff', () => {
        const logoffMock = jest.fn();

        const wrapper = mount(<Header logoff={logoffMock} />);

        const logoffButton = wrapper.find(".pt-button .pt-minimal .fa .fa-power-off");
        logoffButton.simulate("click", { target: logoffButton  });

        expect(logoffMock.mock.calls.length).toEqual(1);
    });


})