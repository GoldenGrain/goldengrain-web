import index from '..';
import container from '../login-page.container';

describe("index", () => {
    it("import", () => {
        expect(index).toEqual(container);
    })
})