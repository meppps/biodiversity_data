
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

        // Bar chart
        var id = d3.select('#selector').property('value'); 
        var result = data.samples.filter(data => data.id == id)[0];
        var otu_ids = result.otu_ids;
        var sampleValues = result.sample_values;
        var labels = result.otu_labels;

        console.log(result.sample_values);

        // Define trace
        var trace1 = {
            labels: otu_ids,
            x:  sampleValues.slice(0,10).sort((x,y)=> x-y), // Find out how to sort and maintain data accuracy
            text: labels,
            type:'bar'
        
        }

        // Plot 
        var bars = [trace1];
        Plotly.newPlot('barChart',bars);



        // Bubble Chart

            var trace2 = {
                x: otu_ids,
                y: sampleValues,
                text: labels,
                mode: 'markers',
                marker:{
                    size: sampleValues,
                    color: otu_ids
                },
                
            }
        
        var bubbles = [trace2];

        console.log(otu_ids)

        Plotly.newPlot('bubbleChart',bubbles);
    }
  
        //   console.log(data.names)
        var dropdown = d3.select('#selector');
          data.names.forEach((id)=>{
            
            dropdown.append('option').text(id).property('value',id);
          });

          dropdown.on('change',()=>{
              initChart();
          });
    
          
          initChart();


});