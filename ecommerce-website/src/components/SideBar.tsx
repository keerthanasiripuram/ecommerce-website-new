import { Typography, Box, Slider, Rating } from "@mui/material";
import React from "react";

type SideBarState = {
  priceRange: number[];
  rating: number | null;
  handlePriceChange: (e: Event, newValue: number | number[]) => void;
  handleRatingChange: (
    e: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => void;
};

const SideBar = (props: SideBarState) => {
  return (
    <Box>
      <Typography variant="h5"> Filters</Typography>
      <Typography variant="subtitle1">Price Range</Typography>
      <Slider
        value={props.priceRange}
        onChange={props.handlePriceChange}
        min={0}
        max={1000}
        step={10}
        marks={[
          { value: 0, label: "$0" },
          { value: 500, label: "$500" },
          { value: 1000, label: "$1000" },
        ]}
      />
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Minimum Rating
      </Typography>
      <Rating
        name="rating-filter"
        value={props.rating}
        onChange={props.handleRatingChange}
      />
    </Box>
  );
};

export default React.memo(SideBar);
