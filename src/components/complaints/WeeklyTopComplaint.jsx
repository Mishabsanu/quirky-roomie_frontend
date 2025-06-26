import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "../../utils/axios";

const WeeklyTopComplaint = () => {
  const [topComplaint, setTopComplaint] = useState(null);
  const token = useSelector((state) => state?.auth?.token);

  useEffect(() => {
    fetchTopComplaint();
  }, []);

  const fetchTopComplaint = async () => {
    try {
      const res = await axiosInstance.get("/complaints/top-weekly", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTopComplaint(res.data.result);
    } catch (error) {
      toast.error("Failed to fetch top complaint of the week.");
    }
  };

  if (!topComplaint || !topComplaint.title) {
    return (
      <Card
        sx={{
          mb: 3,
          mt: 5,
          borderLeft: "6px solid #9e9e9e",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardContent>
          <Typography variant="body2" mt={1}>
            No standout complaint this week. Be the first to raise or vote!
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        mb: 3,
        mt: 5,
        borderLeft: "6px solid #f44336",
        backgroundColor: "#fff7f7",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip label={topComplaint?.type} color="error" />
        </Box>

        <Typography variant="subtitle1" mt={1} fontWeight="bold">
          {topComplaint?.title}
        </Typography>
        <Typography variant="body2" mt={0.5}>
          {topComplaint?.description}
        </Typography>

        <Box mt={1}>
          <Chip
            label={`Severity: ${topComplaint.severity}`}
            color="warning"
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip
            label={`Upvotes: ${topComplaint.upvotes?.length || 0}`}
            color="success"
            size="small"
          />
        </Box>

        <Typography
          variant="caption"
          color="textSecondary"
          mt={1}
          display="block"
        >
          Reported by: {topComplaint.createdBy?.username}
        </Typography>
      </CardContent>

      <Box mt={2}>
        <Typography variant="body2" color="error">
          💥 Punishment Assigned:
        </Typography>
        {topComplaint?.punishment ? (
          <Typography variant="body1" fontWeight="bold">
            {topComplaint.punishment}
          </Typography>
        ) : (
          <Typography variant="body1" color="textSecondary" fontStyle="italic">
            No punishment assigned yet.
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default WeeklyTopComplaint;
