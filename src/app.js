function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

function unpackSamples(sample){
    return sample.values
}
  
d3.json('src/samples.json').then((data)=>{
    var allSamples = data.samples;


    var data1 = [{
        x: allSamples[0].otu_ids,
        y: allSamples[0].sample_values,
        type: 'bar'
        }]

        Plotly.newPlot('myDiv',data1);
    // console.log(data.samples);
    allSamples.forEach((sample)=>{
        // console.log(sample)
        // console.log(sample.sample_values)
    })
    console.log(allSamples[0])
});