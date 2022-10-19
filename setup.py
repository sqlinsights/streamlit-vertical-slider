import setuptools

setuptools.setup(
    name="streamlit_vertical_slider",
    version="1.0",
    author="Carlos D. Serrano",
    author_email="sqlinsights@gmail.com",
    description="Creates a customizable vertical slider",
    long_description="",
    long_description_content_type="text/plain",
    url="https://github.com/sqlinsights/streamlit-vertical-slider",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        "streamlit >= 0.63",
    ],
)
