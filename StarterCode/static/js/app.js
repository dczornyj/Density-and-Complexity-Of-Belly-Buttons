// THIS IS WHERE WE BUILD OUR Plot.ly GRAPHS
function CreateGraphs(selected) {
    
    
d3.json("samples.json").then((data) => {
    console.log(data)
     //For Bar Chart
    let results = data.samples.filter(obj => obj.id == selected);
    bar_labels = results[0].otu_ids.slice(0,10).map(obj => "OTU " + obj).reverse();
    bar_hovertext = results[0].otu_labels.slice(0,10).reverse();
    bar_values = results[0].sample_values.slice(0,10).reverse();

    let titlebar = "Top 10 Bacteria Cultures Found in Dataset"
    let trace1 = {
        x: bar_values,
        y: bar_labels,
        text: bar_hovertext,
        orientation: 'h',
        type: 'bar',
        marker: {
            color: ['rgba(44, 250, 56, 1)', 'rgba(45, 112, 250, 1)','rgba(44, 250, 56, 1)','rgba(45, 112, 250, 1)',
            'rgba(44, 250, 56, 1)','rgba(45, 112, 250, 1)','rgba(44, 250, 56, 1)', 'rgba(45, 112, 250, 1)',
            'rgba(44, 250, 56, 1)','rgba(45, 112, 250, 1)']
        }
    };

    let layout = {
        title: titlebar,
    }

    let bar_data = [trace1]

    Plotly.newPlot("bar", bar_data, layout)



    //Variables for Bubble Chart
    //for x values:
    bubble_xcolor = results[0].otu_ids
    bubble_ysize = results[0].sample_values
    bubble_text = results[0].otu_labels


    //for Bubble Chart
    let trace2 = {
        x: bubble_xcolor,
        y: bubble_ysize,
        mode: 'markers',
        marker: {
          color: bubble_xcolor,
          opacity: [1, 0.8, 0.6, 0.4],
          size: bubble_ysize
        }
      };
      
      let data_bubble = [trace2];
      
      let layoutbubble = {
        title: "Frequency of Bacteria Cultures Found in Dataset",
      };
      
      Plotly.newPlot('bubble', data_bubble, layoutbubble);


    

    //for Demographic Chart. All the values are good, after testing. I just need to append into panel
    dem_chart_data = data.metadata.filter(obj => obj.id == selected)[0]
    //   Reference our panel

    panel_info = d3.select("#sample-metadata")
    panel_info.html("");
    // Appench each characteristic to the panel
    panel_info.append("h5").text("Age: " + dem_chart_data.age)
    panel_info.append("h5").text("BB Type: " + dem_chart_data.bbtype)
    panel_info.append("h5").text("Ethnicity: " + dem_chart_data.ethnicity) 
    panel_info.append("h5").text("Gender: " + dem_chart_data.gender) 
    panel_info.append("h5").text("ID #: " + dem_chart_data.id)
    panel_info.append("h5").text("Location: " + dem_chart_data.location)
    panel_info.append("h5").text("wfreq: " + dem_chart_data.wfreq)

})



}







// THIS IS WHAT WILL BE PRESENTED WHEN WE FIRST LOAD UP THE PAGE
d3.json("samples.json").then((data) => {

    

    // console.log(data)
    let dropdown = d3.select("#selDataset")

    data.names.forEach((id) => {
        // console.log(id)
        
        dropdown.append('option').text(id).property("value", id)
    })

    CreateGraphs(data.names[0])
})

function optionChanged(selected) {
   
    CreateGraphs(selected)
}
