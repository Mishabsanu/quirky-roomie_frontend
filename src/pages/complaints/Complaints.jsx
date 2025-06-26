// Complaints.jsx
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../utils/axios";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const token = useSelector((state) => state?.auth?.token);
  const user = useSelector((state) => state?.auth?.current_user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axiosInstance.get("/complaints", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      let data = res.data.result || [];
      setComplaints(data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleVote = async (complaintId, voteType) => {
    try {
      const res = await axiosInstance.post(
        `/complaints/${complaintId}/vote`,
        { voteType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true,
          },
        }
      );
      fetchComplaints();
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Vote failed");
    }
  };

  const handleResolve = async (id) => {
    try {
      await axiosInstance.patch(
        `/complaints/${id}/resolve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Complaint marked as resolved");
      fetchComplaints();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handlePageChange = (e, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const paginated = complaints.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={3} mt={10}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Complaints
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "red" }}
          onClick={() => navigate("/add-complaints")}
        >
          Add Complaint
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>By</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Votes</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((complaint) => (
                <TableRow key={complaint._id}>
                  <TableCell>{complaint.title}</TableCell>
                  <TableCell>{complaint.type}</TableCell>
                  <TableCell>{complaint.severity}</TableCell>
                  <TableCell>{complaint.createdBy?.username}</TableCell>
                  <TableCell>
                    {new Date(complaint.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {complaint.isResolved ? (
                      <Chip label="Resolved" color="success" />
                    ) : (
                      <Chip label="Pending" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleVote(complaint._id, "upvote")}
                        disabled={
                          complaint.upvotes.includes(user?._id) ||
                          complaint.isResolved
                        }
                      >
                        👍 {complaint.upvotes.length}
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleVote(complaint?._id, "downvote")}
                        disabled={
                          complaint?.downvotes.includes(user?._id) ||
                          complaint?.isResolved
                        }
                      >
                        👎 {complaint?.downvotes?.length}
                      </Button>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {!complaint?.isResolved &&
                    complaint?.createdBy?._id === user?._id ? (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleResolve(complaint._id)}
                      >
                        Resolve
                      </Button>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No Action
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No complaints found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={complaints.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </Box>
  );
};

export default Complaints;
