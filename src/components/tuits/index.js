import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as service from "../../services/tuits-service";
const Tuits = ({tuits = [], refreshTuits}) => { // render list of tuits,
    // callbacks to remove tuit and refresh screen
    const likeTuit = (tuit) =>
        likesService.userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    // code below is not in the instruction
    const deleteTuit = (tid) =>
       service.deleteTuit(tid)
           .then(refreshTuits);

    return (
        <div>
          <ul className="ttr-tuits list-group">
            {
              tuits.map && tuits.map(tuit =>
                  <Tuit className="the-tuit"
                        key={tuit._id}
                        deleteTuit={deleteTuit}
                        likeTuit={likeTuit}
                        tuit={tuit}/>)
            }
          </ul>
        </div>
      );
}

export default Tuits;