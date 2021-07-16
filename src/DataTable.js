import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function DataTable() {
  const [userData, setUserData] = useState([]);
  const [clickOnEdit, setClickOnEdit] = useState(false);
  const [index, setIndex] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [addingRow, setAddingRow] = useState(false);
  // const [idie, setIdie] = useState(10);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUserData(res.data);
    });
  }, []);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontFamily:"Segoe UI Symbol"
    },
    body: {
      fontSize: 10,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 500,
      fontFamily:"Segoe UI Symbol"
    },
  });

  const classes = useStyles();

  // const handleAddRow = () => {
  //   var value = idie + 1;
  //   setIdie(value);
  //   setAddingRow(false);
  //   axios
  //     .post("https://jsonplaceholder.typicode.com/users", {
  //       id: idie,
  //       name: name,
  //       username: username,
  //       email: email,
  //       phone: phone,
  //       website: website
  //     })
  //     .then((res) => {
  //       setUserData([...userData, res.data]);
  //       console.log(res.data);
  //       console.log(userData);
  //     });
  // };

  const handleAddRow = () => {
    setAddingRow(false)
    setUserData([
      ...userData,
      {
        id: uuidv4(),
        name: name,
        username: username,
        email: email,
        phone: phone,
        website: website
      }
    ]);
  };

  const handleDelete = (item) => {
    const id = item;
    setUserData(userData.filter((individualItem) => individualItem.id !== id));
  };

  const handleEdit = (item) => {
    const id = item - 1;
    setIndex(id);
    setClickOnEdit(true);
  };

  const handleSave = (item) => {
    setClickOnEdit(false);
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${item}`, {
        name: name,
        username: username,
        email: email,
        phone: phone,
        website: website
      })
      .then((res) => {
        setUserData(
          userData.map((user) =>
            user.id === res.data.id ? res.data : user
          )
        );
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table"  >
      <Table>
        <TableHead>
          <TableRow >
            <StyledTableCell align="left" >Name</StyledTableCell>
            <StyledTableCell align="left" ><span style={{ marginLeft: "-17%" }} >Username</span></StyledTableCell>
            <StyledTableCell align="left" ><span style={{ marginLeft:"-73%" }}>Email</span></StyledTableCell>
            <StyledTableCell align="left" ><span style={{ marginLeft:"-50%" }} >Phone</span></StyledTableCell>
            <StyledTableCell align="left" ><span style={{ marginLeft:"-55%" }} >Website</span></StyledTableCell>
          </TableRow>
        </TableHead>
      </Table>
      <br />
      <Button variant="contained" color="primary" disableElevation onClick={() => setAddingRow(!addingRow)}>{addingRow ? "Cancel" : "Add Row"}</Button><br />
      {addingRow ? 
            <div>
                <form noValidate autoComplete="off" >
                  <Table className={classes.table} aria-label="customized table" >
                  <TableRow>
                    <TableCell>
                      <TextField 
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        id="outlined-basic" 
                        label="Enter Name..." 
                        variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right" >
                          <TextField 
                          value={username}
                          name="username"
                          onChange={(e) => setUsername(e.target.value)}
                          id="outlined-basic" 
                          label="Enter Username..." 
                          variant="outlined"
                          />
                      </TableCell>
                      <TableCell align="right">
                          <TextField 
                          value={email}
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          id="outlined-basic" 
                          label="Enter Email..." 
                          variant="outlined"
                          />
                      </TableCell>
                      <TableCell align="right" >
                          <TextField 
                          value={phone}
                          name="phone"
                          onChange={(e) => setPhone(e.target.value)}
                          id="outlined-basic" 
                          label="Enter Phone No..." 
                          variant="outlined"
                          />
                      </TableCell>
                      <TableCell align="right" >
                          <TextField 
                          value={website}
                          name="website"
                          onChange={(e) => setWebsite(e.target.value)}
                          id="outlined-basic" 
                          label="Enter Website..." 
                          variant="outlined"
                          />
                      </TableCell>
                  </TableRow>    
                  </Table>
                </form>
                <Button variant="contained" color="primary" disableElevation onClick={(e) => handleAddRow(e)} >Commit Changes</Button>
            </div>
            :
            ""
        }
        <br />
        {userData.map((items, id) => (
          <div key={id} >
                {clickOnEdit ? (
                  <div>
                    {index === id ? (
                      <div>
                        <form noValidate autoComplete="off" >
                          <TableCell>
                            <TextField
                              value={name}
                              name="name"
                              onChange={(e) => setName(e.target.value)}
                              id="outlined-basic" 
                              label="Enter Name..." 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right" >
                            <TextField
                              value={username}
                              name="username"
                              onChange={(e) => setUsername(e.target.value)}
                              id="outlined-basic" 
                              label="Enter Username..." 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right" >
                            <TextField
                              value={email}
                              name="email"
                              onChange={(e) => setEmail(e.target.value)}
                              id="outlined-basic" 
                              label="Enter Email..." 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right" >
                            <TextField
                              value={phone}
                              name="phone"
                              onChange={(e) => setPhone(e.target.value)}
                              id="outlined-basic" 
                              label="Enter Phone No..." 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right" >
                            <TextField
                              value={website}
                              name="website"
                              onChange={(e) => setWebsite(e.target.value)}
                              id="outlined-basic" 
                              label="Enter Website..." 
                              variant="outlined"
                            />
                          </TableCell>
                        </form>
                        <TableCell align="right" >
                        <Button variant="contained" color="primary" disableElevation  onClick={() => handleSave(items.id)}>
                          Save Changes
                        </Button>
                        <TableCell>
                          <Button variant="contained" color="primary" disableElevation onClick={() => setClickOnEdit(false)}>Cancel</Button>
                        </TableCell>
                        </TableCell>
                      </div>
                      ) : (
                      <div>
                        <Table className={classes.table} >
                          <StyledTableRow key={items.name} >
                            <StyledTableCell component="th" scope="row" >{items.name}</StyledTableCell>
                            <StyledTableCell align="right">{items.username}</StyledTableCell>
                            <StyledTableCell align="right">{items.email} </StyledTableCell>
                            <StyledTableCell align="right">{items.phone}</StyledTableCell>
                            <StyledTableCell align="right"><a href="#" >{items.website}</a></StyledTableCell>
                            <StyledTableCell align="right"><Button variant="contained" color="primary" disableElevation onClick={() => handleEdit(items.id)}>Edit</Button></StyledTableCell>
                            <StyledTableCell align="right"><Button variant="contained" color="primary" disableElevation onClick={() => handleDelete(items.id)}>Delete</Button></StyledTableCell>
                          </StyledTableRow>
                        </Table>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Table className={classes.table} >
                        <StyledTableRow key={items.name} >
                          <StyledTableCell component="th" scope="row" >{items.name}</StyledTableCell>
                          <StyledTableCell align="justify">{items.username}</StyledTableCell>
                          <StyledTableCell align="right">{items.email} </StyledTableCell>
                          <StyledTableCell align="right">{items.phone}</StyledTableCell>
                          <StyledTableCell align="right"><a href="#" >{items.website}</a></StyledTableCell><br />
                          <StyledTableCell align="right"><Button variant="contained" color="primary" disableElevation onClick={() => handleEdit(items.id)}>Edit</Button></StyledTableCell>
                          <StyledTableCell align="right"><Button variant="contained" color="primary" disableElevation onClick={() => handleDelete(items.id)}>Delete</Button></StyledTableCell>
                        </StyledTableRow>
                    </Table>
                  </div>
                )}
          </div>
        ))}
      </Table>
    </TableContainer>
  );
}

export default DataTable;
