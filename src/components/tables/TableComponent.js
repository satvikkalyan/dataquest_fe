import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { columns } from "../../constants";

export default function BasicTable({ rows, length, searchFlag = false }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(length ? length : 5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label==="Skills To Learn"?
                  (searchFlag?column.label:"Required Skills"):column.label}

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row.jobId} hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      var value = "";
                      if (column.id === "company")
                        value = row[column.id]["companyName"];
                      else if (column.id === "skills") {
                        const skillsArray = row[column.id];
                        value = skillsArray
                          .map((item) => item.skill)
                          .join(", ");
                      } else if (column.id === "avgSalary") {
                        console.log();
                        value =
                          row[column.id] + (row["hourly"] ? " $ /hr" : " $/an");
                      } else {
                        value = row[column.id];
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "navigate" ? (
                            <NavigateNextIcon
                              onClick={() =>
                                navigate(`/jobs/${row.jobId}`, { state: row })
                              }
                            />
                          ) : typeof value === "object" ? (
                            JSON.stringify(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 8, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
