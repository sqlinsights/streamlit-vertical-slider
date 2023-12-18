import streamlit as st
from streamlit_vertical_slider import vertical_slider


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
