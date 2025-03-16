import { Card, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
const PaymentHelper=()=>{
    return(
        <Card style={{ marginTop: "5px", padding: "5px" }}>
        <Typography variant="h6"> Choose payment mode:</Typography>
        <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group">
          <FormControlLabel
            value="UPI"
            control={<Radio />}
            label="UPI Payments"
          />
          <FormControlLabel
            value="credit-card"
            control={<Radio />}
            label="Credit card"
          />
        </RadioGroup>
      </Card>
    )
}
export default PaymentHelper;