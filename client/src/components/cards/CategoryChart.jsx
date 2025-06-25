import React from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";

const Card = styled.div`
  flex: 2;
  min-width: 280px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.text_primary + "20"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + "15"};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 20px;
  row-gap: 10px;
  margin-top: 16px;
  padding: 0 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  min-width: 100px;

`;

const LegendColor = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ color }) => color || "#000"};
`;

const CategoryChart = ({ data }) => {
  if (!data?.pieChartData) return null;

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
    "#ffc0cb",
    "#f7cac9", // light pastel pink
    "#cbaacb", // pastel lavender
    "#f5e6cc", // light pastel peach
    "#b5ead7", // soft mint green
    "#ffdfba", // light apricot
    "#dcd3ff", // lavender mist
    "#e0bbe4", // orchid pink
    "#bae1ff"  // baby blue
  ];

  const dataWithColors = data.pieChartData.map((entry, index) => ({
    ...entry,
    color: colors[index % colors.length],
  }));

  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      <ChartWrapper>
        <PieChart
          series={[
            {
              data: dataWithColors,
              innerRadius: 30,
              outerRadius: 120,
              paddingAngle: 3,
              cornerRadius: 3,
              colors: dataWithColors.map((d) => d.color),
            },
          ]}
          height={320}
          // ✅ Disable the default legend completely
          slotProps={{ legend: { hidden: true } }}
        />
        {/* ✅ Custom legend below the chart */}
        <LegendContainer>
          {dataWithColors.map(({ label, color }) => (
            <LegendItem key={label}>
              <LegendColor color={color} />
              {label}
            </LegendItem>
          ))}
        </LegendContainer>
      </ChartWrapper>
    </Card>
  );
};

export default CategoryChart;
