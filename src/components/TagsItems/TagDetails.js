import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { List } from "@material-ui/core";
import axios from "axios";


function TagDetails() {
  let { tagId } = useParams();
  const [tag, setTag] = useState({ id: "", name: "", tasks: [] });

  // useEffect(() => {
  //   getTag(tagId);
  // }, []);

  useEffect(() => {
    getTag(tagId);
  }, [tagId]);

  // useEffect(() => {
  //   getTag(tagId);
  // }, [tagId]);
  axios.defaults.baseURL = "http://localhost:3000";
  const getTag = (id) => {
    axios
      .get(`/api/v2/tags/${id}`)
      .then((response) => {
        setTag(response.data);
      })
      .catch((error) => console.log(error));
  };

  console.log(tag.tasks);
  return (
    <div>
      <h3>TAG ID: {tagId}</h3>
      <p>Task: {tag.name}</p>
      <List>
        {tag.tasks.map((task) => (
          <Typography key={task.id}>{task.title}</Typography>
        ))}
      </List>
      {/* <Route path="/tags/:tagId">
        <Button>{tag}</Button>
      </Route> */}
    </div>
  );
}

export default TagDetails;
