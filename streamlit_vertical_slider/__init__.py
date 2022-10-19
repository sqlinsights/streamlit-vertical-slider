import os
import streamlit.components.v1 as components


_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "vertical_slider",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_vertical_slider", path=build_dir)

def vertical_slider(key=None, step=None, default_value=0, min_value=None, max_value=None, track_color="#D3D3D3", slider_color="#29B5E8", thumb_color="#11567f"):
    if default_value < min_value:
        default_value = min_value
    vertical_slider_value = _component_func(key=key, default_value=default_value, step=step, min_value=min_value, max_value=max_value, track_color=track_color, thumb_color=thumb_color, slider_color=slider_color)
    return vertical_slider_value
