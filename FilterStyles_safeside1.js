import { useDispatch, useSelector } from "react-redux";
import { setUsersList } from "./xpensefrontend/src/features/core/coreSlice";

const sortObjects = (obj, setStack, stack, userslist) => {
  console.log(userslist, stack, 'FILTERS', obj);

  setStack(obj)
  // const dispatch = useDispatch();
  // const userslist = useSelector((state) => state.expense.userslist);
  console.log(userslist, stack, 'FILTERS');
  const templist = [...userslist];
  stack.map((filter) => {
    templist.sort((a, b) => {
      const fullnameA = a[filter].toLowerCase();
      const fullnameB = b[filter].toLowerCase();
      if (fullnameA < fullnameB) {
        return -1;
      }
      if (fullnameA > fullnameB) {
        return 1;
      }
      return 0;
    });
    console.log(templist, 'AFTEER FILTERS')
    // dispatch(setUsersList(templist));
  });

}

const ascendingOrder = (key, list) => {
    console.log("INSIDE ASC", list)
    console.log(list[0], key);
    const sortedList = [...list].sort((a, b) => a[key].localeCompare(b[key])); // use spread operator to convert it to mutable
    return sortedList;
}
const descendingOrder = (key, list) => {
    console.log("INSIDE DESC", list)
    const sortedList = [...list].sort((b, a) => a[key].localeCompare(b[key])); // use spread operator to convert it to mutable
    return sortedList;
}

const startsWith = (key, list) => {
    return list;
}

function FilterFactory(obj){
    console.log(obj, "INSIDE FACTORY");
    const [key, type, list, value] = [...obj];
    console.log(key, type, list, "INSIDE FACTORY 2");
    let res = [];
    if (type === 'asc'){
        console.log('ASC', key);
        res = ascendingOrder(key, list);
    }else if (type === 'desc'){
        console.log('DESC', key);
        res = descendingOrder(key, list);
    }else if(type === 'startswith'){
        res = startsWith(key, value, list);
    }
    // dispatch(setUsersList(result));
    console.log(res, 'AFTER');
    return res;
}

export default FilterFactory;