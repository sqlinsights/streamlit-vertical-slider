# streamlit-vertical-slider

Creates a constinuous vertical slider with color customizations. 

![filtering](https://github.com/sqlinsights/streamlit-vertical-slider/blob/main/sample.gif?raw=true)

## Installation
```shell
pip install streamlit-vertical-slider
```
## Usage

```python
import streamlit as st
import  streamlit_vertical_slider  as svs

svs.vertical_slider(key=key, 
                    default_value=i[1], 
                    step=1,
                    min_value=min_value, 
                    max_value=max_value,
                    track_color="gray",
                    thumb_color="black",
                    slider_color="red"
                    )
```