async function drawForce() {
    // read data
    const dataset = await d3.json("./data/harry_potter.json")
    console.log(dataset)

    const nodes = dataset.nodes
    const links = dataset.links

    console.log(dataset.nodes)
    console.log(dataset.links)

    }
    
    drawForce()