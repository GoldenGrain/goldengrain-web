import index from '..';
import container from '../header.container';

describe("index", () => {
    it("import", () => {
        expect(index).toEqual(container);
    })
})