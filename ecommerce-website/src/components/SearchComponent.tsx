
import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Search} from "../styledComponents/StyledComponent";
interface SearchComponentProps {
searchQuery?:string,
changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const SearchComponent:React.FC<SearchComponentProps> = ({
 searchQuery,
 changeHandler
}) => {
  return (
            <Search>
    <TextField
      value={searchQuery}
      onChange={changeHandler}
      placeholder="Search product"
      variant="outlined"
      fullWidth
      size="small"
      sx={{
        "& input": {
          color: "white",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: "#ffffff" }} />
          </InputAdornment>
        ),
      }}
    />
  </Search>
  );
};

export default SearchComponent;
