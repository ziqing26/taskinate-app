import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import TagBox from "./TagsItems/TagBox";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { Checkbox } from "@material-ui/core";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function OverviewTable() {
  axios.defaults.baseURL = "https://taskinate-api.herokuapp.com";
  var columns = [
    { title: "id", field: "id", hidden: true },
    {
      title: "Status",
      editComponent: (rowData) => (
        <Checkbox
          checked={rowData.done}
          onClick={(e) => handleClick(e, rowData)}
        />
      ),
      render: (rowData) => (
        <Checkbox
          checked={rowData.done}
          onClick={(e) => handleClick(e, rowData)}
        />
      ),
    },
    { title: "Title", field: "title" },
    { title: "Description", field: "description" },
    {
      title: "Tags",
      render: (rowData) => (
        <TagBox taglist={taglist} rowData={rowData} updateTags={updateTags} />
      ),
    },
  ];

  const [data, setData] = useState([]); //table data
  const [taglist, setTaglist] = useState([]);

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    getAllData();
    getAllTags();
  }, []);

  const getAllData = () => {
    axios
      .get("api/v1/tasks")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error when getting all tasks");
        console.log(error);
      });
  };

  const getAllTags = () => {
    axios
      .get("api/v2/tags")
      .then((response) => {
        setTaglist(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleClick = (e, rowData) => {
    axios
      .put(`/api/v1/tasks/${rowData.id}`, { done: e.target.checked })
      .then((response) => {
        setData(
          data.map((task) => {
            if (task.id === rowData.id) {
              return { ...task, done: !task.done };
            }
            return task;
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const updateTags = (event, value, rowData) => {
    console.log("updateTags");
    const newdata = value.map((s) => s.id);
    axios
      .put(`/api/v1/tasks/${rowData.id}`, { tag_ids: newdata })
      .then((response) => {
        getAllData();
      })
      .catch((error) => console.log(error));
  };
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.title === "") {
      errorList.push("Please enter title");
    }

    if (errorList.length < 1) {
      axios
        .put("api/v1/tasks/" + newData.id, newData)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.title === undefined) {
      errorList.push("Please enter title");
    }

    if (errorList.length < 1) {
      //no error
      axios
        .post("api/v1/tasks/", newData)
        .then((res) => {
          // let dataToAdd = [...data];
          // dataToAdd.push(newData);
          // setData(dataToAdd);
          getAllData();
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    axios
      .delete("/api/v1/tasks/" + oldData.id)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div className="App">
      <Grid container direction="column" justify="center" alignContent="center">
        <Grid item xs={3}></Grid>
        <Grid item xs={10}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>
          <MaterialTable
            title="Tasks overview"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default OverviewTable;
