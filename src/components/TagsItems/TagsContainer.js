import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import TagForm from "./TagForm";
import TagsList from "./TagsList";

function TagsContainer() {
  const [tags, setTags] = useState([]);

  axios.defaults.baseURL = "https://taskinate-api.herokuapp.com";

  useEffect(() => {
    getAllTags();
  }, []);

  const getAllTags = () => {
    console.log("refreshed");
    axios
      .get("api/v2/tags", { withCredentials: true })
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => console.log(error));
  };

  const createTag = (e) => {
    axios
      .post("/api/v2/tags", { name: e }, { withCredentials: true })
      .then((response) => {
        // setTags([...tags, response]);
        getAllTags();
      })
      .catch((error) => console.log(error.toJSON()));
  };

  function updateTag(e, id) {
    console.log(e);
    axios
      .put(
        `/api/v2/tags/${id}`,
        { tasks: e.target.value },
        { withCredentials: true }
      )
      .then((response) => {
        setTags(
          tags.map((tag) => {
            if (tag.id === id) {
              console.log(tag);
              return { ...tag, tasks: e.target.value };
            }
            return tag;
          })
        );
      })
      .catch((error) => console.log(error));
  }

  function deleteTag(id) {
    axios
      .delete(`/api/v2/tags/${id}`, { withCredentials: true })
      .then((response) => {
        console.log("deleted");
      })
      .catch((error) => console.log(error));
    setTags(tags.filter((tag) => tag.id !== id));
  }

  return (
    <>
      <Grid container direction="column" justify="center" alignContent="center">
        <TagsList tags={tags} updateTag={updateTag} deleteTag={deleteTag} />
        <TagForm createTag={createTag} />
      </Grid>
    </>
  );
}

export default TagsContainer;
