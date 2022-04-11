// retrieve and displays a list of tuits posted by the currently logged in user

import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]); // state variable holding my tuits
    const findMyTuits = () => // function to retrieve my tuits
        service.findTuitByUser("me")
            .then(tuits => setTuits(tuits));
    useEffect(findMyTuits, []);
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(findMyTuits); // retrieve again after deletion
    return(
        <Tuits tuits={tuits}
               deleteTuit={deleteTuit}/>
    );
};

export default MyTuits;