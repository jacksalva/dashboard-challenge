function createDropdownValues(data) {
    dropdownValues = []
    
    for (var i = 0; i < data.samples.length; i++) {
        dropdownValues.push(data.samples[i].id);
    };
    
    for (var i = 0; i < dropdownValues.length; i++) {
        d3.select("#selDataset")
            .selectAll("option")
            .data(dropdownValues)
            .enter()
            .append("option")
            .html((x) => {
                return `<option value="${x}">${x}</option>`
        })
        .exit();
    }
}

function optionChanged(data){
    var dropdownMenu = d3.select("#selDataset");
    var selection = dropdownMenu.property("value");

    dropdownValues = []
    
    for (var i = 0; i < data.samples.length; i++) {
        dropdownValues.push(data.samples[i].id);
    };
    for (var i = 0; i < dropdownValues.length; i++) {
        if (selection == dropdownValues[i]) {
            var table = d3.select("#sample-metadata")
                table.html("")
                table.append("p").text(`ID: ${data.metadata[i].id}`);
                table.append("p").text(`Ethnicity: ${data.metadata[i].ethnicity}`);
                table.append("p").text(`Gender: ${data.metadata[i].gender}`);
                table.append("p").text(`Age: ${data.metadata[i].age}`);
                table.append("p").text(`Location: ${data.metadata[i].location}`);
                table.append("p").text(`BBType: ${data.metadata[i].bbtype}`);
                table.append("p").text(`wFreq: ${data.metadata[i].wFreq}`);

            var topTen = data.samples[i].sample_values
                    .slice(0,10);
            var IDs = data.samples[i].otu_ids
                    .slice(0, 10);
            IDs = JSON.stringify(IDs)
            var topTenLabels = data.samples[i].otu_labels
                    .slice(0, 10);

            var trace1 = {
                x: topTen,
                y: IDs,
                type: "bar",
                orientation: "h",
                text: topTenLabels
            };
        
            var hPlot = [trace1];
            
            Plotly.newPlot("bar", hPlot);

            var trace2 = {
                x: data.samples[i].otu_ids,
                y: data.samples[i].sample_values,
                mode: "markers",
                marker: {
                    color: data.samples[i].otu_ids,
                    size: data.samples[i].sample_values
                }
            };
        
            var bubblePlot = [trace2];
        
            var layout = {
                height: 700,
                width: 1200
            };
        
            Plotly.newPlot('bubble', bubblePlot, layout);
        }
    }
}
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

d3.json("samples.json").then((data) => {
    console.log(data.metadata)

    //Fill Dropdown Menu
    createDropdownValues(data);

    //Update Page
    d3.selectAll("#selDataset").on("change", optionChanged(data));

    //     //left side bar chart
    //     var top = samples[bellyBtn].otu_ids.slice(0,10);
    //     var labels = [];
    //     for(i = 0; i < 10; i++){
    //         labels.push("OTU {i}".replace("{i}",top[i]));
    //     }
    //     var barDrp = {
    //         x: samples[bellyBtn].sample_values,
    //         transforms: [{
    //             type: 'sort',
    //             target: 'x',
    //             order: 'ascending'}],
    //         y: labels,
    //         text: samples[bellyBtn].otu_labels,
    //         type: "bar",
    //         orientation:"h"
    //     };
    //     var layout = {
    //         width: 500
    //     }
    //     var data = [barDrp];
    //     Plotly.newPlot("left_bar", data,layout);
            
    //     //Bubble chart
    //     var bub = {
    //         x: samples[bellyBtn].otu_ids,
    //         y: samples[bellyBtn].sample_values,
    //         text: samples[bellyBtn].otu_labels,
    //         mode:'markers',
    //         marker:{size:samples[bellyBtn].sample_values, color:samples[bellyBtn].otu_ids}
    //     };
    //     var bubData = [bub];
    //     Plotly.newPlot("bubbles", bubData);

    //     //empty the previous pannel
    //     var empPan = d3.selectAll("h4");
    //     empPan.text("");

    //     //metadata and demographic information
    //     var pan = d3.select("#sample-metadata");
    //     keys = ["id","ethnicity","gender","age","location","Beaufort/NC","bbtype","wfreq"];
    //     for(i=0; i < 8;i++){
    //         row = pan.append('h4');
    //         var tex = "{key}: {value}".replace("{key}", keys[i])
    //         var texf = tex.replace("{value}", metadata[bellyBtn][keys[i]])
    //         row.text(texf);
    //     }
});
