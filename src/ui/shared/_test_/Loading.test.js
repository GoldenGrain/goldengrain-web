import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Loading from '../Loading';
import {Spinner} from '@blueprintjs/core';

describe("# Render ", () => {

    it('Não deve existir indicador de loading, quando loading está false ', () => {
        const wrapper = mount(<Loading loading={false} />);       
        
        expect(wrapper.find(Spinner)).toHaveLength(0);
        
    });

       it('Deve existir indicador de loading, quando loading está true ', () => {
        const wrapper = mount(<Loading loading />);       
        
        expect(wrapper.find(Spinner)).toHaveLength(1);
        
    });
 

})   



describe("# inDialog ", () => {

    it('Quando está com a prop  "inDialog", deve ser exibida com a class "with-dialog" ', () => {
        const wrapper = shallow(<Loading loading inDialog />);       
        
        expect(wrapper.find("div").some(".with-dialog")).toEqual(true);
        
    });

     
    it('Quando não está com a prop  "inDialog", não deve ser exibida com a class "with-dialog"', () => {
        const wrapper = shallow(<Loading loading  />);       
        
        expect(wrapper.find("div").some(".with-dialog")).toEqual(false);
        
    });


})   


describe("# container ", () => {

    it('Quando está com a prop  "container", deve ser exibida com a class "with-dialog" ', () => {
        const wrapper = shallow(<Loading loading container />);       
        
        expect(wrapper.find("div").some(".loading-container")).toEqual(true);
        
    });

     
    it('Quando não está com a prop  "container", não deve ser exibida com a class "with-dialog"', () => {
        const wrapper = shallow(<Loading loading  />);       
        
        expect(wrapper.find("div").some(".loading-container")).toEqual(false);
        
    });


})   