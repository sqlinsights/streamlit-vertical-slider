import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { useEffect } from "react"
import { Slider, Stack, createTheme } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';



const VerticalSlider = (props: ComponentProps) => {
  const { label, thumb_height, thumb_style, thumb_color, height, min_value, max_value, default_value, step, track_color, slider_color, value_always_visible } = props.args;
  const [value, setValue] = React.useState(
    default_value
  )
  useEffect(() => Streamlit.setFrameHeight());
  const handleChange = (event: any, newValue: number | number[]) => {
    Streamlit.setComponentValue(newValue);
    setValue(newValue);
  };


  const snowflakeTheme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          root: {
            height: height,
            color: "inherit",
            overflow: "visible",
            width: 'fit-content !important',
            fontSize: 8,
            marginBottom: 0,
          },

          thumb: {
            color: thumb_color,
            borderRadius: thumb_style,
            height: thumb_height,
          },
          valueLabel: {
            backgroundColor: thumb_color,
            borderRadius: "10px",
            fontSize: 10,
            // width: "fit-content"

          },
          track: {
            color: slider_color,
            width: "10px !important",
            borderRadius: 2,
            marginBottom: 0,
            borderWidth: 1
          },
          rail: {
            color: track_color,
            width: "10px !important",
            borderRadius: 2,
            marginBottom: 0
          }
        }
      },
      MuiStack: {
        styleOverrides: {
          root: {
            fontSize: 12,
            fontFamily: ["Source Sans Pro", "sans-serif"],
            // color: "rgb(49, 51, 63)",
            alignItems: "center",
            justifyContent: "center",
            textWrap: "wrap",
            margin: 0,
          }
        }
      }
    }
  }
  );

  return (

    <ThemeProvider theme={snowflakeTheme}>
      <Stack component="div" direction="column" alignItems="center" justifyContent="center" sx={{ maxWidth: 300 }}>
        <label>{max_value}</label>
        <Slider
          min={min_value}
          step={step}
          max={max_value}
          defaultValue={default_value}
          onChangeCommitted={handleChange}
          valueLabelDisplay={value_always_visible}
          orientation="vertical"
        />
        <label>{min_value}</label>
        <b>{label}</b>
      </Stack>
    </ThemeProvider >
  );
}
export default withStreamlitConnection(VerticalSlider);


