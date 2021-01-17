import React from "react";

import { List } from "@material-ui/core";
import TagItem from "./TagItem";

function TagsList({ tags, updateTag, deleteTag }) {
  function handleClick(id) {
    this.props.history.push("/tags/" + id);
    window.location.reload(false);
  }
  const displayTags = (tags) => {
    if (tags.length > 0) {
      return (
        <>
          <List>
            {tags.map((tag, index) => (
              <TagItem
                key={index}
                tag={tag}
                deleteTag={deleteTag}
                onClick={handleClick}
              />
            ))}
          </List>
        </>
      );
    } else {
      return <h3>Currently no tags😃</h3>;
    }
  };

  return <>{displayTags(tags)}</>;
}

export default TagsList;

//list out each tag item
