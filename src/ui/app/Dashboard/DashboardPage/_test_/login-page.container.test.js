import { mapDispatchToProps, mapStateToProps } from '../login-page.container';


import { logar } from "service/actions/login.action";
jest.mock("service/actions/login.action");

describe("# mapStateToProps", () => {

    it("A propriedade 'loading' do retorno, deve ser identica a 'state.login.loading'", () => {

        var state = {
            login: {
                loading: true
            }
        };
        var result = mapStateToProps(state);
        expect(result.loading).toEqual(true);

        state = {
            login: {
                loading: false
            }
        };

        result = mapStateToProps(state);
        expect(result.loading).toEqual(false);


    });

    it("A propriedade 'cpfErro' do retorno, deve ser identica a 'state.login.cpfErro'", () => {

        var state = {
            login: {
                cpfErro: true
            }
        };
        var result = mapStateToProps(state);
        expect(result.cpfErro).toEqual(true);

        state = {
            login: {
                cpfErro: false
            }
        };

        result = mapStateToProps(state);
        expect(result.cpfErro).toEqual(false);


    });


    it("A propriedade 'passwordErro' do retorno, deve ser identica a 'state.login.passwordErro'", () => {

        var state = {
            login: {
                passwordErro: true
            }
        };
        var result = mapStateToProps(state);
        expect(result.passwordErro).toEqual(true);

        state = {
            login: {
                passwordErro: false
            }
        };

        result = mapStateToProps(state);
        expect(result.passwordErro).toEqual(false);


    });


});




describe("# mapDispatchToProps", () => {

    it("A funcao 'setCPF', deve enviar a mensagem certa", () => {

        const dispatch = jest.fn();
        const cpf = "123.456.789-89"
        const props = mapDispatchToProps(dispatch);

        props.setCPF(cpf);

        expect(dispatch.mock.calls.length).toEqual(1);
        expect(dispatch.mock.calls[0][0].type).toEqual("LOGIN_SET_CPF");
        expect(dispatch.mock.calls[0][0].cpf).toEqual(cpf);
    });

    it("A funcao 'entrar', deve chamar a action 'logar'", () => {
        logar.mockImplementation(() => retorno);

        const dispatch = jest.fn();
        var retorno = "retorno";

        const props = mapDispatchToProps(dispatch);

        props.entrar();

        expect(logar.mock.calls.length).toEqual(1);
        expect(dispatch.mock.calls.length).toEqual(1);        
        expect(dispatch.mock.calls[0][0]).toEqual(retorno);
    });

      it("A funcao 'setPassword', deve enviar a mensagem certa", () => {

        const dispatch = jest.fn();
        const password = "123"
        const props = mapDispatchToProps(dispatch);

        props.setPassword(password);

        expect(dispatch.mock.calls.length).toEqual(1);
        expect(dispatch.mock.calls[0][0].type).toEqual("LOGIN_SET_PASSWORD");
        expect(dispatch.mock.calls[0][0].password).toEqual(password);
    });


});