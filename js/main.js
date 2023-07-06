async function drawForce() {
    // 1. Access data
    const dataset = await d3.json("./data/harry_potter.json")
    console.log(dataset)

    const nodes = dataset.nodes
    const links = dataset.links

    const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(links))
    .force("center", d3.forceCenter());


    
    }
    
    drawForce()