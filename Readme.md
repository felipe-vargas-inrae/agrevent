# AgrevenT Prototype

AgrevenT is an open-source prototype that aims at performing Big Data Processing using data from the agriculture domain.
Agriculture data is generated from different sources, for instance,
Weather Data, Soil Data, Crop Data. This information is gathered with different scales, including time-series, summary, greenhouse or field levels. Some predictions models can be approached with Big Data Tools, such as Crop Yield or Biomass estimation.

Develop a Big Data Product requires the implementation and configuration of numerous technologies for handling the data science cycle (data gathering, data integration, data pre-processing, data exploration, and data analytics). 

Broadly, this project presents three developments:



| Project       | Description     |
| :------------- | :----------: |
| agrevent_processing  | A Python Flask API that enables Apache Spark methods and user-defined process. The main goal is to retrieve data and in-memory distribute processing | 
| agrevent_storage | A NodeJS project that connects with a MongoDB Database and creates Kafka Producers and consumers. The main goal is to insert data and apply ETLs | 
| agrevent_web  | A React front-end application that creates graphical components to interact with the Big Data Environment  | 


## Videos

* [Introduction](https://vimeo.com/410733754)
* [Tutorial](https://vimeo.com/411019366)

## Survey Results

* [Survey](https://github.com/felipe-vargas-inrae/agrevent/blob/master/agrevent_processing/api/documents/agrevent_survey.pdf)