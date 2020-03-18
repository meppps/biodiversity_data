
// App.js
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

function unpackSamples(sample){
    return sample.values
}
  
d3.json('src/samples.json').then((data)=>{
     
        
    // Initialize
     function initChart(){

        // Parse data
        var id = d3.select('#selector').property('value'); 
        var result = data.samples.filter(data => data.id == id)[0];
        var otu_ids = result.otu_ids;
        var sampleValues = result.sample_values;
        var labels = result.otu_labels;

        // Metadata
        var metadata = data.metadata.filter(data => data.id == id)[0];
        var ethn = metadata.ethnicity;
        var gender = metadata.gender;
        var age = metadata.age;
        var location = metadata.location;
        var bbtype = metadata.bbtype;
        var wfreq = metadata.wfreq;

        // OTU [ID]
        var ids = []
        otu_ids.forEach((id)=>{
            // console.log();
            id = `OTU ${id.toString()}`;
            ids.push(id)
        });
        console.log(ids);
    
        // Barchart trace
        var trace1 = {
            y: ids,
            x: sampleValues.slice(0,10),

            // labels: otu_ids,
            // x:  sampleValues, // Find out how to sort and maintain data accuracy .sort((x,y)=> x-y)
            text: labels,
            type:'bar',
            orientation: 'h'
        
        };
        var layout = {
            width: 500,
            height: 600
        }

        // Bubble chart trace
        var trace2 = {
            x: otu_ids,
            y: sampleValues,
            text: labels,
            mode: 'markers',
            marker:{
                size: sampleValues,
                color: otu_ids
            }
        }

        // Plot 
        var bars = [trace1];
        Plotly.newPlot('barChart',bars,layout);
        
        var bubbles = [trace2];
        Plotly.newPlot('bubbleChart',bubbles);


        // Demographic info
        var demInfo = `
        Ethnicity: ${ethn}
        Gender: ${gender}
        Age: ${age}
        Location: ${location}
        BB-Type: ${bbtype}
        Wfreq: ${wfreq}
        `;

        d3.select('.card-text').text(demInfo);

    }
  
        // Initialize dropdown, Add event listener
        var dropdown = d3.select('#selector');
          data.names.forEach((id)=>{
            dropdown.append('option').text(id).property('value',id);
          });

          dropdown.on('change',()=>{
              initChart();
          });
          
        
          
        
        
          initChart();

});