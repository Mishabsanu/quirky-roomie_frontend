import ReportIcon from "@mui/icons-material/Report";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const complaintTypes = ["Noise", "Cleanliness", "Bills", "Pets"];
const severityLevels = ["Mild", "Annoying", "Major", "Nuclear"];
// Validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  type: Yup.string().required("Type is required"),
  severity: Yup.string().required("Severity is required"),
});

export default function AddComplaints() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    type: "",
    severity: "",
  };
  const token = useSelector((state) => state?.auth?.token);
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axiosInstance.post("/complaints/add", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          withCredentials: true,
        },
      });
      if (response.data) {
        navigate("/complaints");
      }
      toast.success("Complaint submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 3, mt: 4 }}>
      {/* Header */}

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "error.main",
          mt: 5,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: "2px solid",
          borderColor: "error.main",
          pb: 1,
        }}
      >
        <ReportIcon />
        File a Complaint
      </Typography>

      {/* Formik Form */}
      <Paper sx={{ p: 3, backgroundColor: "#fff" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <TextField
                label="Title"
                name="title"
                fullWidth
                margin="normal"
                value={values.title}
                onChange={handleChange}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
              <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={values.description}
                onChange={handleChange}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Type"
                    name="type"
                    fullWidth
                    value={values.type}
                    onChange={handleChange}
                    error={Boolean(touched.type && errors.type)}
                    helperText={touched.type && errors.type}
                  >
                    {complaintTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Severity"
                    name="severity"
                    fullWidth
                    value={values.severity}
                    onChange={handleChange}
                    error={Boolean(touched.severity && errors.severity)}
                    helperText={touched.severity && errors.severity}
                  >
                    {severityLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "#c62828" },
                }}
              >
                Submit Complaint
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
