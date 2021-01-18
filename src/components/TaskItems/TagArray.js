// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Chip from "@material-ui/core/Chip";
// // import Paper from "@material-ui/core/Paper";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // display: "flex",
//     // justifyContent: "center",
//     // flexWrap: "wrap",
//     // listStyle: "none",
//     // padding: theme.spacing(0.5),
//     // margin: 0,
//     display: "flex",
//     justifyContent: "left",
//     flexWrap: "wrap",
//     listStyle: "none",
//     "& > *": {
//       margin: theme.spacing(0.5),
//     },
//   },
//   // chip: {
//   //   margin: theme.spacing(0.5),
//   // },
// }));

// export default function TagArray() {
//   const classes = useStyles();
//   const [chipData, setChipData] = React.useState([
//     { key: 0, label: "Angular" },
//     { key: 1, label: "jQuery" },
//     { key: 2, label: "Polymer" },
//     { key: 3, label: "React" },
//   ]);

//   const handleDelete = (chipToDelete) => () => {
//     setChipData((chips) =>
//       chips.filter((chip) => chip.key !== chipToDelete.key)
//     );
//   };

//   return (
//     // <Paper component="ul" className={classes.root}>    </Paper>
//     <div className={classes.root}>
//       {chipData.map((data) => {
//         return (
//           <li key={data.key}>
//             <Chip
//               variant="outlined"
//               color="primary"
//               size="small"
//               label={data.label}
//               onDelete={data.label === "React" ? undefined : handleDelete(data)}
//               // className={classes.chip}
//             />
//           </li>
//         );
//       })}
//     </div>
//   );
// }
