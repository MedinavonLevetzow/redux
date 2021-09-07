import configureStore from "./store/configureStore";
import {projectAdd, projectRemove} from "./store/projects";
import { loadBugs, addBug, assignBugToUser, resolvedBug } from "./store/bugs";
import {addUser} from "./store/users";



const store = configureStore();


store.dispatch(loadBugs());

//setTimeout(()=> store.dispatch(assignBugToUser(1,4)),2000);

store.dispatch(addBug({description:"hihii"}));

//store.dispatch(assignBugToUser({id:1625058757434, userId:201}));


// store.dispatch(projectAdd({description:"Project 1"}));
store.dispatch(addBug({description:"Bug 2"}));
store.dispatch(bugAssigned({id:1, userId:2}));
// store.dispatch(projectRemove({id:1}));
// store.dispatch(projectAdd({description:"Project 2"}));

// store.dispatch(bugAdded({description:"Bug 40"}));

// store.dispatch(addUser({name:"Pedro Picapiedra"}));
// store.dispatch(bugAssigned({id:2, userId: 1}));

// store.dispatch(bugResolved({id:1 }));


// const x = getUnresolvedBugs(store.getState());
// const y = getUnresolvedBugs(store.getState());

//store.dispatch(bugAssigned({id:2, userId: 2}));





// console.log(x === y);
// console.log(getBugsByUser(2)(store.getState()));