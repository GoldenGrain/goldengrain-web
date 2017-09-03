import React from 'react';
import { shallow, mount, render } from 'enzyme';
import LoginPage from '../login-page.component';

describe("# Render ", () => {

    it('Deve ser renderizado o botão de "Entrar" ', () => {
        const wrapper = mount(<LoginPage />);
        const welcome = <button className="entrar pt-button pt-large pt-intent-warning" type="submit">ENTRAR</button>;
        
        expect(wrapper.contains(welcome)).toEqual(true);
        
    });


})

describe(" # Login Form", () => {

    it('Ao "submitar" deve ser chamado a prop "entrar"', () => {
        const entrarMock = jest.fn();

        const wrapper = mount(<LoginPage entrar={entrarMock} />);

        wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });

        expect(entrarMock.mock.calls.length).toEqual(1);

    });


    it('Ao "submitar" deve ser cancelada a propagação do evento', () => {
        const entrarMock = jest.fn();
        const preventDefaultMock = jest.fn();

        const wrapper = mount(<LoginPage entrar={entrarMock} />);

        wrapper.find("form").simulate("submit", { preventDefault: preventDefaultMock });

        expect(preventDefaultMock.mock.calls.length).toEqual(1);
    });

    
    it('Ao inserir o cpf deve ser chamado a prop de "setCPF" ', () => {
        const setCPFMock = jest.fn();
        const preventDefaultMock = jest.fn();

        const wrapper = mount(<LoginPage setCPF={setCPFMock} />);

        const usuarioInput = wrapper.find(".username") ;//.simulate("onChange", { preventDefault: preventDefaultMock });
        usuarioInput.simulate("change", { target: usuarioInput  });

        expect(setCPFMock.mock.calls.length).toEqual(1);
    });


  
    it('Ao inserir o cpf deve ser chamado a prop de "setPassword" ', () => {
        const setPasswordMock = jest.fn();
        const preventDefaultMock = jest.fn();

        const wrapper = mount(<LoginPage setPassword={setPasswordMock} />);

        const usuarioInput = wrapper.find(".password") ;//.simulate("onChange", { preventDefault: preventDefaultMock });
        usuarioInput.simulate("change", { target: usuarioInput  });

        expect(setPasswordMock.mock.calls.length).toEqual(1);
    });



});



describe(" # Login Errors", () => {

    it('Quando existir a propriedade de "passwordErro" deve ser adicionado classe "pt-intent-danger"  ', () => {
        const error = "Existe um erro"; 

        const wrapper = mount(<LoginPage passwordErro={error} />);

        const passwordInput = wrapper.find(".password") ;
     

        expect(passwordInput.is(".pt-intent-danger")).toEqual(true);
    });


    
    it('Quando existir a propriedade de "cpfErro" deve ser adicionado classe "pt-intent-danger"  ', () => {
        const error = "Existe um erro"; 

        const wrapper = mount(<LoginPage cpfErro={error} />);

        const usuarioInput = wrapper.find(".username") ;
     

        expect(usuarioInput.is(".pt-intent-danger")).toEqual(true);
    });
})