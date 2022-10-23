# streamlit-vertical-slider

Creates a constinuous vertical slider with color customizations. 

![filtering](https://github.com/sqlinsights/streamlit-vertical-slider/blob/main/sample.gif?raw=true)

---
## Update ⚠️
Version 1.0.2 fixes an issue where frontend/build folder was excluded from wheel. 
Please update by:
```shell
pip install streamlit-vertical-slider==1.0.2
```
or 

```shell
pip install --upgrade streamlit-vertical-slider
```

---
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