import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { List } from "@material-ui/core";
import axios from "axios";
import FilteredTable from "./FilteredTable";

function TagTable() {
  let { tagId } = useParams();
  const [tag, setTag] = useState({ id: "", name: "", tasks: [] });

  useEffect(() => {
    getTag(tagId);
  }, [tagId]);

  axios.defaults.baseURL = "http://localhost:3000";

  const getTag = (id) => {
    axios
      .get(`/api/v2/tags/${id}`)
      .then((response) => {
        setTag(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <List>
      <FilteredTable selectedTasks={tag.tasks} selectedTag={tag.name} />
    </List>
  );
}

export default TagTable;
