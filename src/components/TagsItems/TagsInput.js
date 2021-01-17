// import React, { useState, useEffect } from "react";
// import { Button, TextField, Chip } from "@material-ui/core";

// const TagsInput = ({ rowData, selectedTags, removeTag, addTag }) => {
//   const [tags, setTags] = useState([]);

//   useEffect(() => {
//     setTags(rowData.tags);
//   }, []);

//   const handleAddTag = (event) => {
//     if (event.target.value !== "") {
//       addTag(event.target.value, rowData);
//       //   addTag([...tags, { name: event.target.value }]);
//       setTags([...tags]);
//       event.target.value = "";
//     }
//   };
//   return (
//     <div>
//       {tags.map((tag) => {
//         return (
//           <ul key={tag.id}>
//             <Chip
//               variant="outlined"
//               color="primary"
//               size="small"
//               label={tag.name}
//               onDelete={(e) => removeTag(e, rowData, tag.id)}
//             />
//           </ul>
//         );
//       })}

//       <input
//         type="text"
//         onKeyUp={(event) =>
//           event.key === "Enter" ? handleAddTag(event) : null
//         }
//         placeholder="Press enter to add tags"
//       />
//     </div>
//   );
// };
// export default TagsInput;
