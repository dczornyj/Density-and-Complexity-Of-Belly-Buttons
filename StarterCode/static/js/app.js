// THIS IS WHERE WE BUILD OUR Plot.ly GRAPHS
function CreateGraphs(selected) {
    
    
d3.json("samples.json").then((data) => {
     //For Bar Chart
    let results = data.samples.filter(obj => obj.id == selected);
    bar_labels = results[0].otu_ids;
    bar_hovertext = results[0].otu_labels;
    bar_values = results[0].sample_values;

    let trace1 = {
        x: bar_values,
        y: bar_labels,
        text: bar_hovertext,
        orientation: 'h',
        type: 'bar'
    };

    let bar_data = [trace1]

    Plotly.newPlot("bar", bar_data)



    

















    //for Demographic Chart. All the values are good, after testing. I just need to append into panel

    dem_chart_data = data.metadata.filter(obj => obj.id == selected)
    selec_age = dem_chart_data[0].age
    selec_bbtype = dem_chart_data[0].bbtype
    selec_ethnic = dem_chart_data[0].ethnicity
    selec_gender = dem_chart_data[0].gender
    selec_id = dem_chart_data[0].id
    selec_location = dem_chart_data[0].location
    selec_wfreq = dem_chart_data[0].wfreq
 
    console.log(selec_gender)


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
