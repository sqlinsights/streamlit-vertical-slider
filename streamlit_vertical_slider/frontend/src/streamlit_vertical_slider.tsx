import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { useEffect } from "react"
import { Slider, Stack, createTheme, SliderValueLabelProps, Tooltip } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';


const VerticalSlider = (props: ComponentProps) => {
  const { label, thumb_height, thumb_style, thumb_color, height, min_value, max_value, default_value, step, track_color, slider_color, opacity, value_always_visible } = props.args;
  let slots_custom = null

  function ValueLabelComponentOpen(props: SliderValueLabelProps) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value} open={true}>
        {children}
      </Tooltip>
    )
  }
  function ValueLabelComponentAuto(props: SliderValueLabelProps) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  if (value_always_visible === true) {
    slots_custom = { valueLabel: ValueLabelComponentOpen }
  }
  else {
    slots_custom = { valueLabel: ValueLabelComponentAuto }
  }

  const [value, setValue] = React.useState(
    default_value,
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
            width: "0.75rem !important",
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
            background: slider_color,
            opacity: opacity,
            width: "5px !important",
            borderRadius: 2,
            marginBottom: 0,
            borderWidth: 0
          },
          rail: {
            background: track_color,
            opacity: 100,
            width: "5px !important",
            borderRadius: 1,
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
      <Stack component="div" direction="column" alignItems="center" justifyContent="center" sx={{ maxWidth: 200 }}>
        <label>{max_value}</label>
        <Slider
          min={min_value}
          step={step}
          max={max_value}
          defaultValue={default_value}
          onChangeCommitted={handleChange}
          slots={slots_custom}
          aria-label="custom thumb label"
          orientation="vertical"
          valueLabelDisplay={value_always_visible}
        />
        <label>{min_value}</label>
        <label>{label}</label>
      </Stack>
    </ThemeProvider >
  );
}

export default withStreamlitConnection(VerticalSlider);


