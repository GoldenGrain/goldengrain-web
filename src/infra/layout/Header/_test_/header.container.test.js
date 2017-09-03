import { mapDispatchToProps } from '../header.container';
import { logoff } from 'service/actions/login.action';
jest.mock("service/actions/login.action");

describe("# mapDispatchToProps", () => {
    it("A funcao 'logoff', deve chamar a action 'logoff'", () => {
        logoff.mockImplementation(() => retorno);

        const dispatch = jest.fn();
        var retorno = "retorno";

        const props = mapDispatchToProps(dispatch);

        props.deslogar();

        expect(logoff.mock.calls.length).toEqual(1);
        expect(dispatch.mock.calls.length).toEqual(0);        
        expect(dispatch.mock.calls[0][0]).toEqual(retorno);
    });


});