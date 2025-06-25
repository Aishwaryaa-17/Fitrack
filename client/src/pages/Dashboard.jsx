import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";
import { showSuccess, showError } from "../utils/alert";

// Styled Components
const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  padding: 0px 16px;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const ChartCardWrapper = styled.div`
  flex: 1;
  min-width: 280px;
`;
const WideChartCardWrapper = styled(ChartCardWrapper)`
  flex: 1.7;
`;
const FormWrapper = styled.div`
  flex: 1;
  min-width: 320px;
  display: flex;
  justify-content: flex-start;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 360px;
  padding: 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.cardBackground || "#f9f9f9"};
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.1);
`;
const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.8px solid #ccc;
  font-size: 16px;
  background-color: white;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
  }
`;
const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.8px solid #ccc;
  font-size: 16px;
  background-color: white;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
  }
`;
const Button = styled.button`
  padding: 12px;
  border-radius: 10px;
  border: none;
  background-color: #4a90e2;
  color: white;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover:not(:disabled) {
    background-color: #357abd;
  }
  &:disabled {
    background-color: #a3c0f9;
    cursor: not-allowed;
  }
`;
const ClearButton = styled(Button)`
  background-color: #ccc;
  color: #333;
  &:hover:not(:disabled) {
    background-color: #999;
  }
`;

const Dashboard = () => {
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);

  const [formData, setFormData] = useState({
    category: "",
    customCategory: "",
    exercise: "",
    customExercise: "",
    sets: "",
    reps: "",
    weight: "",
    time: "",
  });

  const categoryOptions = {
    Back: ["Lat Pulldown", "Pull-Ups", "Barbell Rows", "Dumbbell Rows", "T-Bar Rows", "Deadlifts"],
    Chest: ["Bench Press", "Incline Bench Press", "Chest Flyes", "Push-Ups", "Cable Crossovers"],
    Shoulders: ["Shoulder Press", "Lateral Raises", "Front Raises", "Arnold Press", "Rear Delt Flyes"],
    Biceps: ["Barbell Curl", "Dumbbell Curl", "Hammer Curl", "Concentration Curl", "Preacher Curl"],
    Triceps: ["Tricep Dips", "Tricep Pushdown", "Overhead Tricep Extension", "Skull Crushers", "Kickbacks"],
    "Legs (Quads/Glutes)": ["Squats", "Leg Press", "Lunges", "Bulgarian Split Squats", "Step-Ups", "Glute Bridges", "Leg Curls", "Leg Extension"],
    Hamstrings: ["Romanian Deadlifts", "Leg Curls", "Hip Thrusts", "Good Mornings"],
    Calves: ["Standing Calf Raises", "Seated Calf Raises", "Donkey Calf Raises"],
    "Core/Abs": ["Crunches", "Leg Raises", "Planks", "Russian Twists", "Hanging Leg Raises", "Bicycle Crunches"],
    "Full Body": ["Deadlifts", "Clean and Press", "Snatch", "Burpees", "Kettlebell Swings", "Thrusters"],
    Cardio: ["Running", "Jump Rope", "Cycling", "Rowing", "Stair Climber", "HIIT Workouts"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      category: "",
      customCategory: "",
      exercise: "",
      customExercise: "",
      sets: "",
      reps: "",
      weight: "",
      time: "",
    });
  };

  const getExerciseOptions = () => {
    if (!formData.category || formData.category === "Other") return [];
    return categoryOptions[formData.category] || [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = formData.category === "Other" ? formData.customCategory : formData.category;
    const exercise = formData.exercise === "Other" ? formData.customExercise : formData.exercise;

    if (!category || !exercise || !formData.sets || !formData.reps || !formData.weight || !formData.time) {
      showError("Please fill all the fields!");
      return;
    }

    const formatted = `#${category}\n-${exercise}\n-${formData.sets} setsX${formData.reps} reps\n-${formData.weight} kg\n-${formData.time} min`;

    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");

    try {
      await addWorkout(token, { workoutString: formatted });
      await dashboardData();
      await getTodaysWorkout();
      handleClear();
      showSuccess("Workout added successfully!");
    } catch (err) {
      showError(err?.message || "Failed to add workout");
    }

    setButtonLoading(false);
  };

  const dashboardData = async () => {
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getDashboardDetails(token);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getTodaysWorkout = async () => {
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getWorkouts(token, "");
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard key={item.id} item={item} data={data} />
          ))}
        </FlexWrap>
        <FlexRow>
          <ChartCardWrapper>
            <WeeklyStatCard data={data} />
          </ChartCardWrapper>
          <WideChartCardWrapper>
            <CategoryChart data={data} />
          </WideChartCardWrapper>
          <FormWrapper>
            <Form onSubmit={handleSubmit}>
              <label>Category</label>
              <Select name="category" value={formData.category} onChange={handleChange} required>
                <option value="" disabled hidden>Select Category</option>
                {Object.keys(categoryOptions).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="Other">Other</option>
              </Select>
              {formData.category === "Other" && (
                <>
                  <label>Custom Category</label>
                  <Input name="customCategory" value={formData.customCategory} onChange={handleChange} required />
                </>
              )}
              <label>Exercise</label>
              <Select name="exercise" value={formData.exercise} onChange={handleChange} required disabled={!formData.category}>
                <option value="" disabled hidden>Select Exercise</option>
                {getExerciseOptions().map((ex) => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
                <option value="Other">Other</option>
              </Select>
              {formData.exercise === "Other" && (
                <>
                  <label>Custom Exercise</label>
                  <Input name="customExercise" value={formData.customExercise} onChange={handleChange} required />
                </>
              )}
              <label>Sets</label>
              <Input type="number" name="sets" value={formData.sets} onChange={handleChange} required min={1} />
              <label>Reps</label>
              <Input type="number" name="reps" value={formData.reps} onChange={handleChange} required min={1} />
              <label>Weight (kg)</label>
              <Input type="number" name="weight" value={formData.weight} onChange={handleChange} required min={1} step="0.1" />
              <label>Time (min)</label>
              <Input type="number" name="time" value={formData.time} onChange={handleChange} required min={1} step="0.1" />
              <div style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
                <Button type="submit" disabled={buttonLoading}>
                  {buttonLoading ? "Adding..." : "Add Workout"}
                </Button>
                <ClearButton type="button" onClick={handleClear}>Clear</ClearButton>
              </div>
            </Form>
          </FormWrapper>
        </FlexRow>
        <Section>
          <Title>Today's Workouts</Title>
          <CardWrapper>
            {todaysWorkouts.length > 0 ? (
              todaysWorkouts.map((workout) => (
                <WorkoutCard key={workout._id} workout={workout} />
              ))
            ) : (
              <p>No workouts for today.</p>
            )}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
