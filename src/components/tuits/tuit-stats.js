
import React from "react";
const TuitStats = ({tuit, likeTuit, dislikeTuit = () => {}}) => { // render stats row at bottom of tuit
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats &&
          <span className="ttr-stats-replies">{tuit.stats.replies}</span>
          }
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats &&
          <span className="ttr-stats-retuits">{tuit.stats.retuits}</span>
          }
        </div>
        <div className="col">
          <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
              {
                  // callback toggle like tuit on click and force screen refresh
                  // if likes count is greater than 0 then render solid heart colored red
                  tuit.stats && tuit.stats.likes > 0 &&
                  <i className="fa-solid fa-thumbs-up me-1" ></i>
              }
              { // if likes count is less than or equal to 0, then render empty heart
                  tuit.stats && tuit.stats.likes <= 0 &&
                  <i className="fa-regular fa-thumbs-up me-1"></i>
              }
            <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>
          </span>
        </div>
          <div className="col">
            <span className="ttr-dislike-tuit-click" onClick={() => dislikeTuit(tuit)}>
              {
                  tuit.stats && tuit.stats.dislikes > 0 &&
                  <i className="fa-solid fa-thumbs-down me-1"></i>
              }
                {
                    tuit.stats &&
                    tuit.stats.dislikes <= 0 &&
                    <i className="fa-regular fa-thumbs-down me-1"></i>
                }
                <span className="ttr-stats-dislikes">{tuit.stats && tuit.stats.dislikes}</span>
            </span>
          </div>

        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;
