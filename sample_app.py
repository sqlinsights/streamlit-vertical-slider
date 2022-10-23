import streamlit as st
import pandas as pd
import  streamlit_vertical_slider  as svs
st.set_page_config(layout="wide")
st.subheader("Vertical Slider")

groups = [('2021-01-01',100),
            ('2021-01-02',150),
            ('2021-01-03',75),
            ('2021-01-04',25),
            ('2021-01-05',150),
            ('2021-01-06',60),
            ('2021-01-07',86),
            ('2021-01-08',150),
            ('2021-01-09',150),
            ('2021-01-10',25),
            ('2021-01-11',99),
            ('2021-01-12',150),
            ('2021-01-13',150),
            ('2021-01-14',55),
            ('2021-01-15',150)
            ]
boundary = int(50)
adjusted_data = []
sliders = {}
columns = st.columns(len(groups))
for idx, i in enumerate(groups):
    min_value = i[1] - boundary
    max_value = i[1] + boundary
    key = f'member{str(idx)}'
    with columns[idx]:
        sliders[f'slider_group_{key}'] = svs.vertical_slider(key=key, default_value=i[1], step=1, min_value=min_value, max_value=max_value)
        if sliders[f'slider_group_{key}'] == None:
            sliders[f'slider_group_{key}']  = i[1]
        adjusted_data.append((i[0],sliders[f'slider_group_{key}'] ))
df = pd.DataFrame(adjusted_data, columns=['Date','Value'])
st.line_chart(df, x='Date', y='Value')


svs.vertical_slider(key='jkdhdkdhs', default_value=20, step=1, min_value=1, max_value=35, thumb_color="black", slider_color="red", track_color="grey")