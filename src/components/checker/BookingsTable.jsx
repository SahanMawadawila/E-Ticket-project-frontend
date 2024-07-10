import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Thead from "@mui/material/TableHead";

const columns = [
  { id: "seats", label: "Seats", minWidth: 100 },
  { id: "id", label: "Customer ID", minWidth: 100 },
  {
    id: "from",
    label: "From/Date/Time",
    minWidth: 100,
  },
  {
    id: "to",
    label: "To/Date/Time",
    minWidth: 100,
  },
  {
    id: "isChecked",
    label: "Checked",
    minWidth: 100,
  },
];

export default function BookingsTable({ bookings }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <Thead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                    backgroundColor: "rgb(8 145 178)",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </Thead>

          <TableBody>
            {bookings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      let value = "";
                      if (column.id === "seats") {
                        value = row.seats.join(", ");
                      } else if (column.id === "from") {
                        value = `${row.from} / ${row.date} / ${row.departureTime}`;
                      } else if (column.id === "to") {
                        value = `${row.to} / ${row.arrivalDate} / ${row.arrivalTime}`;
                      } else if (column.id === "isChecked") {
                        value = row.isChecked ? "Yes" : "No";
                      } else {
                        value = row[column.id];
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={bookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
