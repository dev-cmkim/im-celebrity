import React from "react";
import { strings } from "../../configs";

const CommonModal = (props) => {
  const { open, close, userCnt, content } = props;
  return (
    <div className={open ? "open_modal modal" : "modal"}>
      {open ? (
        <div className="content_wrap_common">
          <div className="text_wrap">
            {content == "select" ? (
              <div>
                <p>
                  {userCnt}
                  {strings.popup.selectTitle}
                </p>
                <p>
                  {strings.list.selectedList}<span className="point_text">{strings.user.selected}</span>
                  {strings.popup.commonText}
                </p>
              </div>
            ) : (
              <div>
                <p>
                  {userCnt}
                  {strings.popup.deleteTitle}
                </p>
                <p>
                  {strings.list.canceldList} <span className="point_text">{strings.user.applied}</span>
                  {strings.popup.commonText}
                </p>
              </div>
            )}
          </div>
          <button onClick={close}>{strings.button.confrim}</button>
        </div>
      ) : null}
    </div>
  );
};

export { CommonModal };
