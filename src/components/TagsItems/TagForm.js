import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

function TagForm({ createTag }) {
  const [tag, setTag] = useState({
    id: "",
    name: "",
    tasks: [],
  });

  function handleTagInputChange(e) {
    setTag({ ...tag, name: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (tag.name !== "") {
      createTag(tag.name);
      setTag({ ...tag, name: "" });
    }
  }

  return (
    <form className="tagform" onSubmit={handleSubmit}>
      <TextField
        label="Add Tag"
        className="taskform-input"
        name="tag"
        type="text"
        value={tag.name || ""}
        onChange={handleTagInputChange}
      />
      <Button style={{ padding: 16 }} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default TagForm;
