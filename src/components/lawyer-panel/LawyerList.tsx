import {
  Card, CardContent, Typography, Button, Avatar, Stack, CircularProgress
} from "@mui/material";
import type { Lawyer } from "./lawyerService";

export default function LawyerList({ lawyers, loading, onEdit, onDelete }: { lawyers: Lawyer[], loading: boolean, onEdit: (lawyer: Lawyer) => void, onDelete: (id: number) => void}) {
  if (loading) {
    return (
      <Stack alignItems="center" py={6}>
        <CircularProgress />
        <Typography mt={2}>Загрузка адвокатов...</Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      {lawyers.map((l) => (
        <Card
          key={l.id}
          sx={{
            borderRadius: 3,
            padding: 1.5,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Avatar
              src={l.photo_url ? `http://localhost:8080/${l.photo_url}` : ''}
              variant="rounded"
              sx={{ width: 70, height: 70 }}
            />

            <div style={{ flex: 1 }}>
              <Typography variant="h6">{l.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {l.email} • {l.phone} • {l.year_experience ?? 0} yrs
              </Typography>
              <Typography variant="body2" mt={1}>
                {l.description?.slice(0, 40)}...
              </Typography>
            </div>

            <Stack spacing={1}>
              <Button variant="outlined" color="warning" onClick={() => onEdit(l)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => onDelete(l.id)}>
                Delete
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
