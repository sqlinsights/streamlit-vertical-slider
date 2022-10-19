import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { useEffect } from "react"
import Box from '@material-ui/core/Box'
import { createTheme } from '@material-ui/core/styles';
import { Slider } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';



const VerticalSlider = (props: ComponentProps) => {

  const { min_value, max_value, default_value, step, track_color, slider_color, thumb_color } = props.args;
  useEffect(() => Streamlit.setFrameHeight());
  const handleChange = (event: any, newValue: number | number[]) => {
    Streamlit.setComponentValue(newValue);
  };


  const snowflakeTheme = createTheme({
    overrides: {
      MuiSlider: {
        root: {
          height: 200,
          fontSize: 10,
          marginBottom: 0
        },
        markLabel: {
          color: "black",
          paddingLeft: 15
        },
        thumb: {
          color: thumb_color,
          marginLeft: "4px !important"
        },
        track: {
          color: slider_color,
          width: "10px !important",
          marginLeft: "5px !important",
          borderRadius: 2,
          marginBottom: 0,
          borderWidth: 1
        },
        rail: {
          color: track_color,
          width: "10px !important",
          marginLeft: "5px !important",
          borderRadius: 2,
          marginBottom: 0
        }
      }
    }
  });

  return (
    <Box sx={{ height: 200, marginRight: 10, marginLeft: 10, paddingTop: 50 }}>
      <ThemeProvider theme={snowflakeTheme}>
        <Slider
          min={min_value}
          step={step}
          max={max_value}
          defaultValue={default_value}
          onChange={handleChange}
          valueLabelDisplay="on"
          orientation="vertical"
          aria-labelledby="continuous-slider"
          ThumbComponent="span"
          marks={[{ value: Number(min_value), label: String(min_value) }, { value: Number(max_value), label: String(max_value) }]}
        />
      </ThemeProvider>
    </Box>

  );
}

export default withStreamlitConnection(VerticalSlider);
