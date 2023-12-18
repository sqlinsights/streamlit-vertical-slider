import os
from idna import valid_contextj
import streamlit.components.v1 as components
import streamlit as st
import altair as alt
import streamlit_toggle as sts
from typing import Literal


_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "vertical_slider",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component(
        "streamlit_vertical_slider", path=build_dir
    )

shape_types = Literal["circle", "square", "pill"]


def vertical_slider(
    label: str = None,
    key: str = None,
    height: int = 200,
    thumb_shape: shape_types = "circle",
    step: int = 1,
    default_value: int = 0,
    min_value: int = 0,
    max_value: int = 10,
    track_color: str = "#D3D3D3",
    slider_color: str = "#29B5E8",
    thumb_color: str = "#11567f",
    value_always_visible: bool = True,
):
    assert thumb_shape in ["circle", "square", "pill"]
    if default_value < min_value:
        default_value = min_value

    if thumb_shape == "circle":
        thumb_height = ("none",)
        thumb_style = ("inherit",)
        thumb_color = thumb_color
    if thumb_shape == "square":
        thumb_height = ("none",)
        thumb_style = ("1px",)
        thumb_color = thumb_color
    if thumb_shape == "pill":
        thumb_height = ("10px",)
        thumb_style = ("5px",)
        thumb_color = thumb_color

    label_display = "auto" if not value_always_visible else "on"

    vertical_slider_value = _component_func(
        label=label,
        key=key,
        height=height,
        default_value=default_value,
        thumb_shape=thumb_shape,
        step=step,
        min_value=min_value,
        max_value=max_value,
        track_color=track_color,
        thumb_color=thumb_color,
        thumb_height=thumb_height,
        thumb_style=thumb_style,
        slider_color=slider_color,
        value_always_visible=label_display,
    )
    return vertical_slider_value


if not _RELEASE:
    import pandas as pd

    st.set_page_config(layout="wide")
    st.subheader("Vertical Slider")

bottom_cols = st.columns(7)
with bottom_cols[0]:
    tst = vertical_slider(
        label="Default Style",
        height=200,
        key="test_0",
        default_value=550,
        step=1,
        min_value=0,
        max_value=1500,
        value_always_visible=False,
    )

with bottom_cols[1]:
    tst = vertical_slider(
        label="Default Style + Always Visible",
        height=200,
        key="test_1",
        default_value=550,
        thumb_shape="circle",
        step=1,
        min_value=0,
        max_value=1500,
        value_always_visible=True,
    )

with bottom_cols[2]:
    tst = vertical_slider(
        label="Pill Shaped",
        height=200,
        key="test_2",
        default_value=550,
        thumb_shape="pill",
        step=1,
        min_value=0,
        max_value=1500,
        value_always_visible=False,
    )

with bottom_cols[3]:
    tst = vertical_slider(
        label="Square Shaped",
        height=200,
        key="test_3",
        default_value=550,
        thumb_shape="square",
        step=1,
        min_value=0,
        max_value=1500,
        value_always_visible=False,
    )

with bottom_cols[4]:
    tst = vertical_slider(
        label="Custom Colors",
        thumb_color="Red",
        track_color="gray",
        slider_color="orange",
        height=200,
        key="test_4",
        default_value=550,
        step=1,
        min_value=0,
        max_value=1500,
        value_always_visible=False,
    )

with bottom_cols[5]:
    tst = vertical_slider(
        label="Height Control",
        height=400,
        key="test_5",
        default_value=550,
        step=1,
        min_value=0,
        max_value=1500,
        value_always_visible=False,
    )

with bottom_cols[6]:
    tst = vertical_slider(
        height=400,
        key="test_6",
        default_value=550,
        step=1,
        min_value=0,
        max_value=1500,
        value_always_visible=False,
    )
