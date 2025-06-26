import {
  Avatar,
  Box,
  Chip,
  Container,
  LinearProgress,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";

const getBadge = (karmaPoints) => {
  if (karmaPoints >= 100) return { label: "🥇 Gold", color: "warning" };
  if (karmaPoints >= 70) return { label: "🥈 Silver", color: "info" };
  if (karmaPoints >= 40) return { label: "🥉 Bronze", color: "success" };
  return { label: "🟢 Newbie", color: "default" };
};

const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

export default function Leaderboard() {
  const [karmaBoard, setKarmaBoard] = useState([]);
  const [mostComplained, setMostComplained] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const token = useSelector((state) => state?.auth?.token);

  useEffect(() => {
    fetchLeaderboardStats();
  }, []);

  const fetchLeaderboardStats = async () => {
    try {
      const res = await axiosInstance.get("/users/karma-leaderboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          withCredentials: true,
        },
      });

      setKarmaBoard(res.data.karmaBoard || []);
      setMostComplained(res.data.mostComplained || []);
      setTopCategories(res.data.topCategories || []);
    } catch (error) {
      console.error("Failed to fetch leaderboard stats:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={10} mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          📊 Leaderboard & Stats
        </Typography>

        {/* Karma Leaderboard */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            🏅 Karma Leaderboard
          </Typography>

          <List disablePadding>
            {karmaBoard.map((user, index) => {
              const badge = getBadge(user.karmaPoints);
              return (
                <ListItem
                  key={user._id || index}
                  sx={{ alignItems: "flex-start", gap: 2 }}
                  divider
                >
                  <Avatar
                    sx={{
                      mt: 0.5,
                      bgcolor: rankColors[index] || "primary.main",
                      color: "black",
                    }}
                  >
                    {index + 1}
                  </Avatar>

                  <Box sx={{ width: "100%" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {user.name}
                      </Typography>
                      <Chip
                        label={badge.label}
                        color={badge.color}
                        size="small"
                      />
                    </Stack>

                    <Typography variant="caption" color="text.secondary">
                      Karma Points: {user.karmaPoints}
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={Math.min(user.karmaPoints, 100)}
                      sx={{
                        mt: 1,
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: "#f0f0f0",
                      }}
                    />
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Paper>

        {/* Most Complained Users */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            🚫 Most Complained Flatmates
          </Typography>
          {mostComplained.length === 0 ? (
            <Typography color="text.secondary">
              No complaint data available.
            </Typography>
          ) : (
            <List disablePadding>
              {mostComplained.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 0,
                  }}
                  divider
                >
                  <Typography>{item.username}</Typography>
                  <Typography fontWeight="bold">
                    {item.count} complaints
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        {/* Top Complaint Categories */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            🔥 Top Complaint Categories
          </Typography>
          {topCategories?.length === 0 ? (
            <Typography color="text.secondary">
              No category data available.
            </Typography>
          ) : (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {topCategories?.map((cat, i) => (
                <Chip
                  key={i}
                  label={`${cat._id} (${cat.count})`}
                  color="secondary"
                />
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
