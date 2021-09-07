import {isEven} from './math';

describe("isEven", () => {

    it("even Input should return true", ()=>{
    
        //Function under Test
        const result = isEven(2);
        expect(result).toEqual(true);
       
    
    });
    
    it("odd Input should return false", ()=>{
        const result = isEven(3);
        expect(result).toEqual(false);
    });


});

