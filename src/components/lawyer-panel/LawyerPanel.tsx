/* eslint-disable react-hooks/set-state-in-effect */
import {  useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import LawyerForm from "./LawyerForm";
import LawyerList from "./LawyerList";
import { listLawyers, createLawyer, updateLawyer, deleteLawyer } from "./lawyerService"

export default function LawyerPanel() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    listLawyers()
      .then((data) => setLawyers(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (loading) {
        load();
    }
  }, []);

  const handleSave = async (formData, id) => {
    if (id) await updateLawyer(formData);
    else await createLawyer(formData);

    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    await deleteLawyer(id);
    load();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        <Typography variant="h4" fontWeight="600" mb={4}>
          Админ Адвокатҳо
        </Typography>

        <Grid container spacing={3}>
          {/* Left: Form */}
          <Grid >
            <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  {editing ? "Иваз кардани маълумоти Адвокат" : "Илова кардани Адвокат"}
                </Typography>

                <LawyerForm
                  initial={editing}
                  onSave={handleSave}
                  onCancel={() => setEditing(null)}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Right: List */}
          <Grid >
            <LawyerList
              lawyers={lawyers}
              loading={loading}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          </Grid>
        </Grid>

      </div>
    </div>
  );
}
