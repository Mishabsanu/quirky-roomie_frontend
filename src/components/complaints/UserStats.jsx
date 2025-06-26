import { Avatar, Box, Chip, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const UserStats = () => {
  const user = useSelector((state) => state.auth.current_user);

  if (!user) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar>{user?.username?.[0]?.toUpperCase()}</Avatar>
        <Typography variant="h6" fontWeight="bold">
          {user?.username}
        </Typography>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        🧠 Karma Points:{" "}
        <span style={{ fontWeight: "bold", color: "#3f51b5" }}>
          {user?.karmaPoints | 0}
        </span>
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        🎖️ Badges:
      </Typography>
      {user?.badges?.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap={1}>
          {user?.badges.map((badge, idx) => (
            <Chip key={idx} label={badge} color="success" />
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No badges yet. Keep contributing!
        </Typography>
      )}
    </Paper>
  );
};

export default UserStats;
