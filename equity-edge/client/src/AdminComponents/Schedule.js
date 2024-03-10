import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from "@mui/material";

const StyledButton = styled(Button)({
  marginBottom: "16px",
});

const StyledFormControlLabel = styled(FormControlLabel)({
  marginBottom: "8px",
});

const Title = styled(Typography)({
  marginBottom: "24px",
  fontWeight: "bold",
});

function Schedule() {
  const defaultSchedule = {
    openTime: "09:00",
    closeTime: "17:00",
    weekdays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    holidays:
      "Memorial Day, 4th of July, Labor Day, Thanksgiving, Christmas Eve, Christmas Day",
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openTime, setOpenTime] = useState(defaultSchedule.openTime);
  const [closeTime, setCloseTime] = useState(defaultSchedule.closeTime);
  const [weekdays, setWeekdays] = useState(defaultSchedule.weekdays);
  const [holidays, setHolidays] = useState(defaultSchedule.holidays);
  const [currentSchedule, setCurrentSchedule] = useState(defaultSchedule);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedSchedule = {
      openTime,
      closeTime,
      weekdays,
      holidays,
    };
    console.log("Updated Schedule:", updatedSchedule);
    setCurrentSchedule(updatedSchedule);
    setOpenDialog(false);
  };

  function TimeInput({ label, value, onChange }) {
    return (
      <TextField
        type="time"
        label={label}
        value={value}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        style={{ marginBottom: "16px" }}
      />
    );
  }

  return (
    <div>
      <Title variant="h6" gutterBottom>
        Change Market Schedule
      </Title>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Current Market Schedule:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Open Time: {currentSchedule.openTime}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Close Time: {currentSchedule.closeTime}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Open on Weekdays:{" "}
          {Object.entries(currentSchedule.weekdays)
            .filter(([day, checked]) => checked)
            .map(([day]) => day)
            .join(", ")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Holidays: {currentSchedule.holidays}
        </Typography>
      </div>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
      >
        Update Schedule
      </StyledButton>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Market Schedule</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    type="time"
                    label="Open Time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                      style: { marginTop: "5px" },
                    }}
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    type="time"
                    label="Close Time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                      style: { marginTop: "5px" },
                    }}
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Open on Weekdays
                </Typography>
                {Object.entries(weekdays).map(([day, checked]) => (
                  <StyledFormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(e) =>
                          setWeekdays({ ...weekdays, [day]: e.target.checked })
                        }
                      />
                    }
                    label={day.charAt(0).toUpperCase() + day.slice(1)}
                  />
                ))}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Holidays (comma-separated)"
                  variant="outlined"
                  fullWidth
                  value={holidays}
                  onChange={(e) => setHolidays(e.target.value)}
                  style={{ marginBottom: "16px" }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Schedule;
