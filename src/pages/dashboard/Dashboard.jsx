import { Box, Container, Typography, Divider, Paper } from "@mui/material";
import UserStats from "../../components/complaints/UserStats";
import WeeklyTopComplaint from "../../components/complaints/WeeklyTopComplaint";

const Dashboard = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "#fdfdfd",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        }}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#3f51b5" }}
        >
          👋 Welcome to Your Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={2}>
          Track flat complaints, resolve issues, and rise up the leaderboard!
        </Typography>


        <Box mt={4}>
          <Typography variant="h6" gutterBottom sx={{ color: "#e53935" }}>
            🏆 Highlight: Problem of the Week
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <WeeklyTopComplaint />
        </Box>


        <Box mt={6}>
          <Typography variant="h6" gutterBottom sx={{ color: "#43a047" }}>
            🎖️ Your Karma & Achievements
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <UserStats />
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
