/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { Stack, TextField, Button, Typography, Avatar } from "@mui/material";

export default function LawyerForm({ initial, onSave, onCancel }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    year_experience: 0,
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initial) {
      setValues({
        name: initial.name,
        email: initial.email,
        phone: initial.phone,
        description: initial.description || "",
        year_experience: initial.year_experience || 0,
        photo: null,
      });
      setPreview(initial.photo_url ? `http://localhost:8080/${initial.photo_url}` : null);
    } else {
      setValues({
        name: "",
        email: "",
        phone: "",
        description: "",
        year_experience: 0,
        photo: null,
      });
      setPreview(null);
    }
  }, [initial]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues({ ...values, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (val !== null) fd.append(key, val);
    });

    onSave(fd, initial?.id);
  };

  return (
    <form onSubmit={submit}>
      <Stack spacing={2}>

        <TextField
          label="Номи Пурра"
          value={values.name}
          required
          onChange={e => setValues({ ...values, name: e.target.value })}
          fullWidth
        />

        <TextField
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={e => setValues({ ...values, email: e.target.value })}
          fullWidth
        />

        <TextField
          label="Телефон"
          value={values.phone}
          required
          onChange={e => setValues({ ...values, phone: e.target.value })}
          fullWidth
        />

        <TextField
          label="Тачрибаи кори (сол)"
          type="number"
          value={values.year_experience}
          onChange={e => setValues({ ...values, year_experience: Number(e.target.value) })}
          fullWidth
        />

        <TextField
          label="Информация"
          value={values.description}
          multiline
          minRows={3}
          onChange={e => setValues({ ...values, description: e.target.value })}
          fullWidth
        />

        {/* Photo preview */}
        <div>
          <Typography variant="body2" mb={1}>Сурат</Typography>

          {preview && (
            <Avatar
              src={preview}
              sx={{ width: 90, height: 90, mb: 1, borderRadius: 2 }}
              variant="rounded"
            />
          )}

          <label>
            <Button variant="outlined" component="span">
              Загрузить фото
            </Button>
            <input type="file" hidden accept="image/*" onChange={handleFile} />
          </label>
        </div>

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">Сохранить</Button>
          {initial && (
            <Button variant="outlined" color="secondary" onClick={onCancel}>Отменить</Button>
          )}
        </Stack>

      </Stack>
    </form>
  );
}
