import {addBug, getUnresolvedBugs, resolvedBug} from '../bugs';
import configureStore from '../configureStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


describe("bugsSlice",  ()=>{

    let fakeAxios;
    let store;

    beforeEach(()=>{
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    //this is called helper funciton:
    const bugsSlice = () => store.getState().entities.bugs;
    const createState = () => ({
        entities:{
            bugs:{
                list:[]
            }
        }
    });
    
    it("should add the bug to the store if its saved to the server.", async ()=>{
        
        //Arrange
        const bug = { description:'a' };
        const savedBug = {...bug, id:1};
        fakeAxios.onPost('/bugs').reply(200, savedBug);
        
        //Act
        await store.dispatch(addBug(bug));
        
        //Assert
        expect(bugsSlice().list).toContainEqual(savedBug);
        
    });



    it("should return empty Array after failing to connect to server.", async ()=>{
        
        //Arrange
        const bug = { description:'a' };
        const savedBug = {...bug, id:1};

        const errorCodes = [400,401,403,404,500,501,502];


        for(let i=0; i<=errorCodes.length; i++){

            fakeAxios.onPost('/bugs').reply(errorCodes[i], savedBug);
            
            //Act
            await store.dispatch(addBug(bug));
            
            //Assert
            expect(bugsSlice().list).toEqual([]);
          
        }
    });


///////////////////////////////////////////////////////////////////////////////////////////////////7


    describe("selectors", ()=>{
        it("getUnresolvedBugs", () => {
            //Arrange
            const state = createState();
            state.entities.bugs.list.push({ id:1, resolved:true}, {id:2}, {id:3});
            //Act
            const result = getUnresolvedBugs(state);
            //Assert
            expect(result).toHaveLength(2);
            
        });




        it("resolveBug: if bug saved on server", async()=>{
            
            //Arrange
            
            fakeAxios.onPost('/bugs').reply(200, {id:1});
            fakeAxios.onPatch('/bugs/1').reply(200,{id:1, resolved:true});
            //Act
            await store.dispatch(addBug({}));
            await store.dispatch(resolvedBug({id:1}));
            //Assert
            expect(bugsSlice().list[0].resolved).toBe(true);

        
        });

        // it("Not resolveBug: if not saved on server", async()=>{
            
        //     //Arrange
            
        //     fakeAxios.onPost('/bugs').reply(500);
        //     fakeAxios.onPatch('/bugs/1').reply(200,{id:1});
        //     //Act
        //     // try{

        //     await store.dispatch(addBug({}));
        //     await store.dispatch(resolvedBug({id:1}));
        //     //     //Assert
        //     // }catch(error){
        //     //     console.log(error.message);
        //     // }
        //     console.log(bugsSlice());
        //     expect(bugsSlice().list[0].resolved).not.toBe(true);

        
        // });


    });

    // it("Return bug Resolved", async ()=>{
        
    //     //Arrange
    //     const bug = {id:1};
    //     const responseBug = {...bug, resolved: true};

      


    //     fakeAxios.onPatch('/bugs/' + bug.id).reply(200, responseBug);
        
    //     //Act
    //     await store.dispatch(resolvedBug(responseBug));
        
    //     //Assert
    //     //expect(bugsSlice().resolved).toEqual(true);
    //     console.log(bugsSlice());
    // });
    
    



});